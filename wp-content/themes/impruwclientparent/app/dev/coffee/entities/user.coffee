define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Users", (Users, App, Backbone, Marionette, $, _)->

			# User model
			class Users.UserModel extends Backbone.Model

				relations :[(
								type : Backbone.HasMany
								key  : 'rooms'
								relatedModel : 'App.Entities.Rooms.Room'
								collectionType : 'App.Entities.Rooms.RoomCollection'
							)]

				url : ->
					AJAXURL + '?action=get-user-profile'

				defaults : ->
					user_name 		: 'surajair'
					display_name 	: 'Suraj Air'
					user_email 		: 'surajair@gmail.com'
					

			# User collection
			class Users.UserCollection extends Backbone.Collection

				model : Users.UserModel

				

			#PUBLIC API
			API = 
				getUserProfile:(userId)->

					user =  new Users.UserModel
										id : userId

					user.url = AJAXURL + '?action=get-user-profile'

					user.fetch
					
					user


			#REQUEST HANDLERS
			App.reqres.setHandler "get:user:profile",(options = {}) ->

				{ userId } = options

				API.getUserProfile userId