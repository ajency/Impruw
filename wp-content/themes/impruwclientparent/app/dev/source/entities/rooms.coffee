define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Rooms", (Rooms, App, Backbone, Marionette, $, _)->

			# Room Model
			class Rooms.RoomModel extends Backbone.AssociatedModel

				idAttribute : 'ID'

				defaults : ()->
					post_title      : ''
					post_content    : ''
					facilities      : []
					slider_id       : 0
					thumbnail_id    : 0
					no_of_rooms     : 0
					tariffs         : []

				name : 'room'


			# Rooms Collection
			class Rooms.RoomCollection extends Backbone.Collection

				model : Rooms.RoomModel

				url :->
					"#{AJAXURL}?action=get-rooms"
					#AJAXURL + '?action=get-rooms'


			rooms = new Rooms.RoomCollection
			rooms.fetch()

			# PUBLIC API FOR ENtity
			API =
				getRooms: (param ={})->
					rooms

				createNewRoomModel:(data = {})->
					room = new Rooms.RoomModel data
					room

				getRoomModel :(room_id) ->
					
					# check if model exists in collection
					room = rooms.get parseInt room_id

					if not room 
						room = new Rooms.RoomModel ID : parseInt room_id

					room.fetch()
					rooms.add room
					console.log room
					#console.log rooms
					room




				addRoomModelToCollection :(model)->
					rooms.add model
	

			# REQUEST HANDLERS
			App.reqres.setHandler "get:room:entities", ->
				API.getRooms()

			App.reqres.setHandler "create:new:room:model", (data)->
				API.createNewRoomModel data

			App.reqres.setHandler "get:room:model",(room_id) ->
				API.getRoomModel room_id

			App.commands.setHandler "add:room:model", (model)->
				return false if not _.isObject model
				API.addRoomModelToCollection model



