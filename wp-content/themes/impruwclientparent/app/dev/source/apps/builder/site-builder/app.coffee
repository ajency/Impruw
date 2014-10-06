define ['app'
        'apps/builder/site-builder/show/controller'
        'apps/builder/site-builder/element/controller'
        'apps/builder/site-builder/autosave/controller'
        'apps/builder/site-builder/publish/publish'
        'apps/builder/site-builder/elements-loader'], (App)->
    App.module 'SiteBuilderApp', (SiteBuilderApp, App, Backbone, Marionette, $, _)->

        App.elements = []
        #PUBLIC API
        API =
        # show the site builder
            show: ()->
                @showController = new SiteBuilderApp.Show.Controller

        # add a new element to the builder region
            addNewElement: (container, type, modelData)->
                
                if SiteBuilderApp.Element[type]
                    ele = new SiteBuilderApp.Element[type].Controller
                        container: container
                        modelData: modelData
                    App.elements.push ele
                    ele
                else
                    return false

        # publish function call
            publish: ()->
                publishPage = new SiteBuilderApp.Publish.Controller
                publishPage.publish()


        # listen to "element:dropped" event.
        App.reqres.setHandler "add:new:element", (container, type, modelData = {})->
            API.addNewElement container, type, modelData

        App.reqres.setHandler "publish:page", ->
            API.publish()

        # Show all region on start
        SiteBuilderApp.on 'start', ->
            API.show()
		