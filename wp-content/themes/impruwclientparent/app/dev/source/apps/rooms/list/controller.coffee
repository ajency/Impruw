define ['app', 'controllers/base-controller', 'apps/rooms/list/views'], ( App, AppController )->
   App.module 'RoomsApp.List', ( List, App, Backbone, Marionette, $, _ )->
      class List.ListController extends AppController

         initialize : ()->

            # get the collection
            @collection = collection = App.request "get:room:entities"

            @layout = @_getLayout collection

            # add the room list to roomRegion
            @listenTo @layout, "show", @showRoomsList

            #listen to the button clicked trigger
            @listenTo @layout, 'add:new:room:clicked', () ->
               App.execute "show:add:room"

            # trigger set:active:menu event
            App.vent.trigger "set:active:menu", 'rooms'

            @show @layout,
                  loading : true


         showRoomsList : ->
            #console.log collection
            @listView = @_getRoomsListView @collection

            @layout.roomRegion.show @listView


         _getLayout : ( collection )->
            new List.Views.RoomListLayout
                        collection : collection

         _getRoomsListView : ( collection )->
            new List.Views.RoomsListView
                        collection : collection


      App.commands.setHandler "show:rooms:list", ( opts )->
         new List.ListController
                  region : opts.region
