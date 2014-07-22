define [ 'app'
         'text!apps/rooms/list/templates/mainview2.html'
         'text!apps/rooms/list/templates/singleroom2.html'
         'text!apps/rooms/list/templates/emptyview.html' ],
( App, mainviewTpl, roomsingleTpl, emptyTpl )->
   App.module 'RoomsApp.List.Views', ( Views, App, Backbone, Marionette, $, _ )->
      class RoomSingle extends Marionette.ItemView

         tagName : "li"

         template : roomsingleTpl

         events :
            'click .deleteroom_link' : ( e )->
               e.preventDefault()
               if confirm _.polyglot.t "Delete the room and all its data?"
                  @model.destroy()


      class EmptyView extends Marionette.ItemView

         template : emptyTpl


      class Views.RoomsListView extends Marionette.CompositeView

         template : mainviewTpl

         itemViewContainer : '.new-room-list'

         itemView : RoomSingle

         emptyView : EmptyView


      class Views.RoomListLayout extends Marionette.Layout

         template : '<div id="room-list"></div><div id="editor-region"></div>'

         className : 'rooms-layout '

         regions :
            roomRegion : '#room-list'
            editorRegion : '#editor-region'

         events :
            'click .add-room' : ->
               @trigger "add:new:room:clicked"