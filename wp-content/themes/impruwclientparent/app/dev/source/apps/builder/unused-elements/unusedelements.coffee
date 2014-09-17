define ['app', 'controllers/base-controller', 'apps/builder/unused-elements/views' ], (App, AppController, bootbox)->
    
    App.module 'UnusedElement', (UnusedElement, App, Backbone, Marionette, $, _)->

        class UnusedElementController extends AppController

            initialize: (opts)->
                {@pageId, revisionId} = opts

                # clear current view
                @region.close()

                @unusedElementCollection = App.request "get:unused:elements", @pageId, revisionId

                @unusedElementCollection.xhr.done @showView

            showView : =>
                if @unusedElementCollection.length is 0 
                    return

                @view = view = @getUnsedElementView @unusedElementCollection

                @listenTo view, 'clear:all:elements', @clearAllElements
                @listenTo view, 'itemview:clear:element', @clearElement

                @listenTo App.vent, 'page:took:over', ->
                    view.triggerMethod 'page:took:over'

                @listenTo App.vent, 'page:released', ->
                    view.triggerMethod 'page:released'

                @show view,
                    loading: true

            getUnsedElementView: (unusedElementCollection)->
                new UnusedElement.Views.UnsedElementsViews
                            collection: unusedElementCollection

            clearAllElements : =>
                $.post("#{AJAXURL}?action=clear-all-elements",
                        {
                            page_id : @pageId
                        },
                        ((resp)=>
                            if resp.success is true
                                @view.triggerMethod 'elements:cleared'

                        ),
                        'json')

            clearElement : (iv,id)=>
                $.post("#{AJAXURL}?action=remove-unused-element",
                        {
                            page_id : @pageId
                            element_meta_id : id
                        },
                        ((resp)=>
                            # if resp.success is true
                            @view.triggerMethod 'element:cleared', id

                        ),
                        'json')





        App.commands.setHandler "show:unused:elements", (opt)->
            new UnusedElementController opt