define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Rooms", (Rooms, App, Backbone, Marionette, $, _)->

			# Room Model
			class Rooms.RoomModel extends Backbone.AssociatedModel

				idAttribute : 'ID'

				defaults : ()->
					post_title      : ''
					post_content    : ''
					post_status 	: 'auto-draft'
					facilities      : []
					slider_id       : 0
					thumbnail_url   : 'http://localhost/impruw/childsite/wp-content/uploads/sites/81/2014/03/5-yama-zbrush-model-by-jemark-150x150.jpg'
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
					room.save()
					room

				getRoomModel :(room_id) ->
					
					# check if model exists in collection
					room = rooms.get parseInt room_id

					if not room 
						room = new Rooms.RoomModel ID : parseInt room_id	
						room.fetch()
						rooms.add room
						#console.log room
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



