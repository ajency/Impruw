define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Users", (Users, App, Backbone, Marionette, $, _)->

			class UserModel extends Backbone.Model

				relations :[(
								type : Backbone.HasMany
								key  : 'rooms'
								relatedModel : 'App.Entities.Rooms.Room'
							)]

			class UserCollection extends Backbone.Collection

				model : UserModel


			#Public API
			API = 
				getUserProfile:(userId)->

					user =  new UserModel
									id : userId

					user.url = AJAXURL + '?action=get-user-profile'

					user.fetch
					
					user

			#REQUEST HANDLERS
			App.reqres.setHandler "get:user:profile",(options = {}) ->

				{ userId } = options

				API.getUserProfile(userId)