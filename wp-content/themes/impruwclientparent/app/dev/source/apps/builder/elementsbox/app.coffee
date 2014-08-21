define ['app', 'apps/builder/elementsbox/show/controller'], (App)->
    App.module 'ElementsBoxApp', (ElementsBoxApp, App, Backbone, Marionette, $, _)->

        #@startWithParent = false

        ElementsBoxApp.ElementsBoxEvtAggr = new Backbone.Wreqr.EventAggregator()

        #PUBLIC API
        API =
            show: ()->
                new ElementsBoxApp.Show.Controller
                    region: App.elementsBoxRegion


        ElementsBoxApp.on 'start', ->

            API.show()