define [ 'app', 'controllers/base-controller'
         'apps/rooms/edit/views'
         'apps/rooms/facilities/facilitiesapp'
         'apps/rooms/gallery/galleryapp'
         'apps/rooms/booking/bookingcontroller' ], ( App, AppController )->
   App.module 'RoomsApp.Edit', ( Edit, App, Backbone, Marionette, $, _ )->
      class Edit.Controller extends AppController

         initialize : ( options )->
            {roomId} = options

            @roomModel = App.request "get:room:model", roomId

            #get the currency for the site
            sitemodel = App.request "get:site:model"
            App.execute "when:fetched", sitemodel, =>
                @currentCurrency = sitemodel.get 'currency'

                @layout = layout = @getEditRoomLayout @roomModel , @currentCurrency

                @listenTo layout, "show", =>
                   @slidesCollection = App.request "get:slides:for:slide", @roomModel.get 'slider_id'

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

                   # listen to Edit event of collection. when a new model is Edited to
                   # collection pick the slider id and hold it for future slides
                   @slidesCollection.on "add remove", ( model )=>
                      @layout.triggerMethod "set:slider:id", model.get 'slider_id'
                      App.execute "show:gallery:images",
                         region : layout.galleryRegion
                         collection : @slidesCollection

                @listenTo @layout, "show:edit:slider", =>
                   App.execute "show:slides:list",
                      region : App.dialogRegion
                      collection : @slidesCollection

                @listenTo @layout, "save:edit:room", ( data )=>
                   @_saveNewRoom data

                @show layout,
                   loading : true


         _saveNewRoom : ( data )=>
            data['post_status'] = 'publish'
            @roomModel.set data
            @roomModel.save null,
               wait : true
               success : @showSaveMessage

         showSaveMessage : ( model ) =>
            App.execute "add:room:model", model
            @layout.triggerMethod "show:success:message"

         getEditRoomLayout : ( model, currentCurrency )->
            new Edit.View.EditRoomLayout
               model : model
               currency : currentCurrency


      App.commands.setHandler "show:edit:room", ( opts )->
         new Edit.Controller opts
								