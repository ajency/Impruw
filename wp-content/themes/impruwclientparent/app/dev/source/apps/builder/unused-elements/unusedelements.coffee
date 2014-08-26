define ['app', 'controllers/base-controller', 'apps/builder/unused-elements/views'], (App, AppController)->
    
    App.module 'UnusedElement', (UnusedElement, App, Backbone, Marionette, $, _)->

        class UnusedElementController extends AppController

            initialize: (opts)->
                {pageId, revisionId} = opts

                unusedElementCollection = App.request "get:unused:elements", pageId, revisionId

                view = @getUnsedElementView unusedElementCollection

                @listenTo view ,"show:theme:color:clicked",->

                            App.execute "show:theme:color:set", region : App.dialogRegion

                @show view,
                    loading: true

            getUnsedElementView: (unusedElementCollection)->
                new UnusedElement.Views.UnsedElementsViews
                    collection: unusedElementCollection


        App.commands.setHandler "show:unused:elements", (opt)->
            new UnusedElementController opt