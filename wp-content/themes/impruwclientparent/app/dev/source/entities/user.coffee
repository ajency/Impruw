define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Users", (Users, App, Backbone, Marionette, $, _)->

			# User model
			class Users.UserModel extends Backbone.Model

				name : 'user'

			
			user =  new Users.UserModel
			user.fetch()

			#PUBLIC API
			API = 
				getUserProfile:()->
					user


			#REQUEST HANDLERS
			App.reqres.setHandler "get:user:model",(options = {}) ->
				API.getUserProfile()