define [ 'app', 'controllers/base-controller'
         'apps/builder/site-builder/show/views' ], ( App, AppController )->
    App.module 'SiteBuilderApp.Show', ( Show, App, Backbone, Marionette, $, _ )->
        siteBuilderController = null

        class Show.BuilderController extends AppController

            initialize : ( opt = {} )->
                @region = App.getRegion 'builderRegion'

                {pageId, revisionId} = opt

                #element json
                elements = App.request "get:page:json", pageId, revisionId

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
                App.execute "when:fetched", [elements] ,=>
                    _.delay =>
                        @startFillingElements()
                        App.execute "autosave-api"
                    , 400

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
            startFillingElements : ()->
                
                section = @view.model.get( 'header' )
                container = @_getContainer 'header'
                _.each section, ( element, i )=>
                    if element.element is 'Row'
                        @addNestedElements container, element
                    else

                        App.request "add:new:element", container, element.element, element

                section = @view.model.get( 'page' )
                container = @_getContainer 'page'
                _.each section, ( element, i )=>
                    return if not _.isObject element
                    if element.element is 'Row'
                        @addNestedElements container, element
                    else
                        App.request "add:new:element", container, element.element, element

                section = @view.model.get( 'footer' )
                container = @_getContainer 'footer'
                _.each section, ( element, i )=>
                    if element.element is 'Row'
                        @addNestedElements container, element
                    else
                        App.request "add:new:element", container, element.element, element


            addNestedElements : ( container, element )->
                controller = App.request "add:new:element", container, element.element, element
                _.each element.elements, ( column, index )=>
                    return if column.elements.length is 0
                    container = controller.layout.elementRegion.currentView.$el.children().eq( index )
                    _.each column.elements, ( ele, i )=>
                        if element.element is 'Row'
                            @addNestedElements $( container ), ele
                        else
                            App.request "add:new:element", container, ele.element, ele


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

                @listenTo layout, "add:page:revisions", @addPageRevisions

                @listenTo @layout, "add:new:page:clicked", ->
                    App.execute "show:add:new:page", region : App.dialogRegion

                App.commands.setHandler "page:published", @triggerPagePublishOnView

                @listenTo App.vent, "revision:link:clicked", ( revisionId )->
                    currentPageId = App.request "get:current:editable:page"
                    App.execute "editable:page:changed", currentPageId, revisionId

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

                @show layout,
                    loading : true


            triggerPagePublishOnView : =>
                @layout.triggerMethod "page:published"


            # show the previous revision
            loadRevision : ( revisionId )=>
                currentPageId = App.request "get:current:editable:page"
                App.execute "editable:page:changed", currentPageId, revisionId

            # add page revisions
            addPageRevisions : ->
                currentPageId = App.request "get:current:editable:page"

                pageRevisions = App.request "get:page:revisions", currentPageId

                App.execute "when:fetched", [ pageRevisions ], =>
                    @layout.triggerMethod "add:page:revision:items", pageRevisions

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
            App.resetElementRegistry()
            siteBuilderController.close() if siteBuilderController isnt null
            siteBuilderController = new Show.BuilderController
                pageId : pageId
                revisionId : revisionId

            App.execute "show:unused:elements",
                region : App.unusedElementsRegion
                revisionId : revisionId
                pageId : pageId