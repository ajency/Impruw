define ['app', 'controllers/base-controller'
		'apps/my-profile/password/views'], (App, AppController)->

	App.module 'MyProfileApp.Password', (Password, App, Backbone, Marionette, $, _)->

		class Password.Controller extends AppController

			initialize :(opts)->
				{model} = opts
			
				@model = model

				@view =  @getPasswordView @model

				@listenTo @view ,"update:password:clicked", @updatePassword

				@listenTo @view ,"check:password:current", @checkPassword

				@show @view,
					loading: true


			getPasswordView :(model) ->
				new Password.View.PasswordForm
						model : model
			
			checkPassword :(data) ->
				options = 
					url:AJAXURL,
					method:'POST',
					data :
						action : 'check-password'
						json : data

				$.ajax( options ).done (response)=>
					@ajaxPasswordCheck response
					 
				.fail (resp)->
					console.log 'error'

			ajaxPasswordCheck :(response)=>
				@view.triggerMethod "password:check:response",response

			updatePassword :(data) ->
				options = 
					url:AJAXURL,
					method:'POST',
					data :
						action : 'update-password'
						json : data

				$.ajax( options ).done (response)->
					console.log response
				.fail (resp)->
					console.log 'error'
		



		App.commands.setHandler "show:password:form",(opts) ->
			new Password.Controller opts


		

			
	