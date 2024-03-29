define [ 'app', 'controllers/base-controller'
         'apps/rooms/add/views'
         'apps/rooms/facilities/facilitiesapp'
         'apps/rooms/gallery/galleryapp'
         'apps/rooms/booking/bookingcontroller' ], ( App, AppController )->
    App.module 'RoomsApp.Add', ( Add, App, Backbone, Marionette, $, _ )->
        class Add.Controller extends AppController

            initialize : ( options )->
                @roomModel = App.request "create:new:room:model", {}

                #get the currency for the site
                sitemodel = App.request "get:site:model"
                App.execute "when:fetched", sitemodel, =>
                    @currentCurrency = sitemodel.get 'currency'

                    @layout = layout = @getAddRoomLayout @roomModel, @currentCurrency

                    @slidesCollection = App.request "get:slides:collection"

                    @listenTo layout, "show", =>
                        App.execute "show:facilities",
                            region : layout.facilitiesRegion
                            facilities : @roomModel.get 'facilities'

                        App.execute "show:gallery:images",
                            region : layout.galleryRegion
                            collection : @slidesCollection

                        App.execute "show:rooms:tariffs:app",
                            region : layout.roomTariffRegion
                            roomId : @roomModel.get 'ID'

                        App.execute "show:booking:app",
                            region : layout.roomBookingRegion
                            roomId : @roomModel.get 'ID'

                    @listenTo @layout, "show:edit:slider", =>
                        App.execute "show:slides:list",
                            region : App.dialogRegion
                            collection : @slidesCollection
                            element : 'Room'

                    # listen to add event of collection. when a new model is added to
                    # collection pick the slider id and hold it for future slides
                    @slidesCollection.on "add remove", ( model )=>
                        @layout.triggerMethod "set:slider:id", model.get 'slider_id'
                        App.execute "show:gallery:images",
                            region : layout.galleryRegion
                            collection : @slidesCollection

                    #trigger media manager popup and start listening to "media:manager:choosed:media" event
                    @listenTo @layout, "show:media:manager", =>
                        App.navigate "media-manager", trigger : true
                        @listenTo App.vent, "media:manager:choosed:media", ( media )=>
                            @layout.triggerMethod "set:feature:image", media
                            @stopListening App.vent, "media:manager:choosed:media"

                        @listenTo App.vent, "stop:listening:to:media:manager", =>
                            @stopListening App.vent, "media:manager:choosed:media"

                    @listenTo @layout, "save:new:room", ( data )=>
                        @_saveNewRoom data

                    @show layout,
                        loading : true

                    App.navigate "rooms/add"


            _saveNewRoom : ( data )=>
                data['post_status'] = 'publish'
                @roomModel.set data
                @roomModel.save null,
                    wait : true
                    success : @showSaveMessage

            showSaveMessage : ( model ) =>
                App.execute "add:room:model", model
                @layout.triggerMethod "show:success:message"

            getAddRoomLayout : ( model, currentCurrency )->
                new Add.View.AddRoomLayout
                    model : model
                    currency : currentCurrency


        App.commands.setHandler "show:add:room", ( opts )->
            new Add.Controller
								