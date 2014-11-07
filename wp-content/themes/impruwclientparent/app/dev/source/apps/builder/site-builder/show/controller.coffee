define [ 'app'
         'controllers/base-controller' 
         'bootbox'
         'apps/builder/site-builder/show/views' 
], ( App, AppController, bootbox )->
    App.module 'SiteBuilderApp.Show', ( Show, App, Backbone, Marionette, $, _ )->
        siteBuilderController = null

        class Show.BuilderController extends AppController

            initialize : ( opt = {} )->
                @region = App.getRegion 'builderRegion'

                {pageId, revisionId} = opt

                #element json
                elements = App.request "get:page:json", pageId, revisionId



                elementLoaded = false

                # builder view
                @view = new Show.View.Builder
                                    model : elements

                # listen to element dropped event for next action
                @listenTo @view, "add:new:element", ( container, type, metaId = 0 )->
                    modelData = {}
                    if metaId isnt 0
                        model = App.request "get:unused:element:by:metaid", metaId
                        modelData = model.toJSON()
                        currentPageId = App.request "get:current:editable:page"
                        App.execute "unused:element:added", metaId, currentPageId

                    App.request "add:new:element", container, type, modelData

                # triggered when all models are fetched for the page
                # usign this event to start filling up the builder
                # with elements
                elements._fetch.done =>

                        window.ISFRONTPAGE = elements.get 'is_home_page'
                    
                        elementLoaded = true
                        _.delay =>
                            @deferreds = []
                            @startFillingElements()
                            
                            $.when(@deferreds...).done (elements...)=> 
                                    App.autoSaveAPI.local.resume()
                                    App.autoSaveAPI.local.doAutoSave()
                                    App.vent.trigger "page:rendered"
                                    @view.triggerMethod "page:rendered"
                                    # release memory
                                    @deferreds = []
                                .fail =>
                                    App.autoSaveAPI.local.suspend()
                                    App.autoSaveAPI.local.reset()
                                    @view.triggerMethod "page:render:failed"
                                
                        , 200
                        
                    .fail =>
                        @view.triggerMethod "page:rendered:failed"

                @show @view,
                    loading : true


            _getContainer : ( section )->
                switch section
                    when 'header'
                        $( '#site-header-region' )
                    when 'page'
                        $( '#site-page-content-region' )
                    when 'footer'
                        $( '#site-footer-region' )


            # start filling elements
            startFillingElements : ()=>
                
                _.each ['header', 'page' , 'footer'], (key, index)=>
                    section = @view.model.get key
                    container = @_getContainer key
                    _.each section, ( element, i )=>
                        if element.element is 'Row'
                            @addNestedElements container, element
                        else
                            eleController = App.request "add:new:element", container, element.element, element
                            @deferreds.push eleController._promise


            addNestedElements : ( container, element )=>
                eleController = App.request "add:new:element", container, element.element, element
                @deferreds.push eleController._promise
                _.each element.elements, ( column, index )=>
                    return if column.elements.length is 0
                    container = eleController.layout.elementRegion.currentView.$el.children().eq( index )
                    _.each column.elements, ( ele, i )=>
                        if element.element is 'Row'
                            @addNestedElements $( container ), ele
                        else
                            eleController = App.request "add:new:element", container, ele.element, ele
                            @deferreds.push eleController._promise


        # Controller class for showing header resion
        class Show.Controller extends AppController

            # initialize the controller. Get all required entities and show the view
            initialize : ( opt = {} )->
                @region = App.getRegion( 'builderWrapper' )

                # add pages
                @pages = App.request "get:editable:pages"

                @layout = layout = new Show.View.MainView
                                            collection : @pages

                @listenTo layout, 'editable:page:changed', ( pageId )->
                    # set the cookie
                    $.cookie 'current-page-id', pageId
                    App.execute "editable:page:changed", pageId

                @listenTo @layout, "add:new:page:clicked", ->
                    App.execute "show:add:new:page", region : App.dialogRegion

                @listenTo @layout, 'delete:page:clicked',=>
                    page = @pages.get $.cookie 'current-page-id'
                    page.destroy
                        success : (model,res,opt)=>
                            @removePageFromMenu model.get 'original_id'
                            
                            App.builderRegion.currentView.triggerMethod 'show:home:page'


                App.commands.setHandler "page:published", @triggerPagePublishOnView

                @listenTo layout, 'show', ( layout )=>
                    # added delay so that the html is fully rendered
                    _.delay =>
                        # add new region to application
                        App.addRegions
                            builderRegion : '#aj-imp-builder-drag-drop'

                        #siteBuilderController = new Show.BuilderController()
                    , 200

                @listenTo layout, "update:page:name", @updatePageName

                # heartbeat API
                @listenTo App.vent, 'page:took:over', (errorMessage)->
                    layout.triggerMethod 'page:took:over', errorMessage

                @listenTo App.vent, 'page:released', ->
                    layout.triggerMethod 'page:released'

                @listenTo App.vent, 'autosave:page:json:enable:buttons', ->
                    layout.triggerMethod 'autosave:page:json:enable:buttons'                    

                @listenTo App.vent, 'autosave:page:json:disable:buttons', ->
                    layout.triggerMethod 'autosave:page:json:disable:buttons'                    


                @show layout,
                    loading : true

            removePageFromMenu : (pageId)->
                menuCollection = App.request "get:menu:items:by:menuid", window.MENUID
                menuToRemove = menuCollection.find (menuModel)->
                    if parseInt(menuModel.get('page_id')) is pageId
                        return true
                menuCollection.remove menuToRemove


            triggerPagePublishOnView : =>
                @layout.triggerMethod "page:published"

            #update the name of the page
            updatePageName : ( pageData )->
                updatedPageModel = App.request "get:page:model:by:id", pageData.ID
                updatedPageModel.set pageData
                updatedPageModel.save null,
                    wait : true
                    success : @pageNameUpdated

            pageNameUpdated : ( updatedPageModel )=>
                @layout.triggerMethod "page:name:updated", updatedPageModel

        App.commands.setHandler "editable:page:changed", ( pageId, revisionId = 0 )=>
            
            siteBuilderController.close() if siteBuilderController isnt null
            _.each App.elements , (element)->
                element.close()
            App.elements = []
            siteBuilderController = new Show.BuilderController
                                                    pageId : pageId

            App.execute "show:right:block",
                region : App.rightBlockRegion
                pageId : pageId