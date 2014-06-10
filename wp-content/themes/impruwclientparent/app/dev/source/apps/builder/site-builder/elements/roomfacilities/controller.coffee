define ['app'
        'apps/builder/site-builder/elements/roomfacilities/views'
    #'apps/builder/site-builder/elements/roomfacilities/settings/controller'
],
(App)->
    App.module 'SiteBuilderApp.Element.RoomFacilities', (RoomFacilities, App, Backbone, Marionette, $, _)->

        # menu controller
        class RoomFacilities.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'RoomFacilities'


                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:style", @renderElement
                super()

            _getRoomFacilitiesView: (collection)->
                new RoomFacilities.Views.RoomFacilitiesView
                    collection: collection



            # setup templates for the element
            renderElement: ()=>
                collection = App.request 'get:all:facilities'

                App.execute "when:fetched", collection, =>
                    @removeSpinner()
                    view = @_getRoomFacilitiesView collection
                    @layout.elementRegion.show view