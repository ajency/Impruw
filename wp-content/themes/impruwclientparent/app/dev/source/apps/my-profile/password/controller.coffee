define ['app', 'controllers/base-controller'
		'apps/my-profile/password/views'], (App, AppController)->

	App.module 'MyProfileApp.Password', (Password, App, Backbone, Marionette, $, _)->

		class Password.Controller extends AppController

			initialize :(opts)->
				{model} = opts
			
				@model = model

				@view =  @getPasswordView @model

				@listenTo @view ,"update:password:clicked", @updatePassword

				@show @view,
					loading: true


			getPasswordView :(model) ->
				new Password.View.PasswordForm
						model : model
			

			ajaxPassword :(response)=>
				@view.triggerMethod "password:ajax:response",response

			updatePassword :(data) ->
				options = 
					url:AJAXURL,
					method:'POST',
					data :
						action : 'update-password'
						json : data

				$.ajax( options ).done (response)->
					@ajaxPassword response
				.fail (resp)->
					console.log 'error'
		



		App.commands.setHandler "show:password:form",(opts) ->
			new Password.Controller opts


		

			
	