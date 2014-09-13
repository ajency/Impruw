define ['app'
        'apps/builder/site-builder/elements/roomsummary/views'
        'apps/builder/site-builder/elements/roomsummary/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.RoomSummary', (RoomSummary, App, Backbone, Marionette, $, _)->

        # menu controller
        class RoomSummary.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'RoomSummary'
                    room_id : 0
                    style: 'Room Summary Default'
                    image_id : 0


                super(options)

            bindEvents: ->
                # start listening to model events
                @listenTo @layout.model, "change:style", @renderElement
                @listenTo @layout.model, "change:room_id", @renderElement
                super()

            _getRoomSummaryView: (model, imageModel,  template)->
                opt =
                    model: model
                    imageModel : imageModel

                if @isSingleRoomPage()
                    opt.isSingleRoom = true
                else if model.get('ID') is 0
                    opt.roomNotSet = true
                else
                    opt.template = template

                new RoomSummary.Views.RoomSummaryView opt


            isSingleRoomPage: ->
                pageName = App.request "get:current:editable:page:name"
                pageName is 'Single Room'


            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                roomId = @layout.model.get 'room_id'
                model = App.request "get:room:model", roomId
                if model.has 'feature_image_id'
                    @layout.model.set 'image_id', model.get 'feature_image_id'
                
                imageModel = App.request "get:media:by:id", @layout.model.get 'image_id'

                

                App.execute "when:fetched", [model,imageModel], =>
                    # get the address element template
                    template = @_getElementTemplate @layout.model
                    view = @_getRoomSummaryView model,imageModel, template
                    
                    @listenTo view, "show:media:manager", (ratio = false)=>
                        App.navigate "media-manager", trigger: true
                        App.currentImageRatio = ratio
                        @listenTo App.vent, "media:manager:choosed:media", (media)=>
                            @layout.model.set 'image_id', media.get 'id'
                            model.set 'feature_image_id', media.get 'id'
                            App.currentImageRatio = false
                            @stopListening App.vent, "media:manager:choosed:media"
                            @layout.model.save()
                            @imageModel = media
                            @renderElement()

                        @listenTo App.vent, "stop:listening:to:media:manager", =>
                            App.currentImageRatio = false
                            @stopListening App.vent, "media:manager:choosed:media"

                    @layout.elementRegion.show view


