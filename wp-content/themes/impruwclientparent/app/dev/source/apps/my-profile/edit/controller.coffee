define ['app', 'controllers/base-controller'
		'apps/my-profile/edit/views', 'entities/user'], (App, AppController)->

	App.module 'MyProfileApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			# initiliaze controller
			initialize:()->

				userProfile = @userProfile = App.request "get:user:model"

				@layout = @getLayout()

				@listenTo @layout, "show", =>
					# show general form view
					@layout.generalFormRegion.show @getGeneralFormView @userProfile
					# show password field view
					@layout.passwordFormRegion.show @getPasswordFormView()
 
				
					@layout.generalFormRegion.on 'show', =>
						@listenTo @getGeneralFormView , 'update:user:info:click',@test 			

					@listenTo @layout.generalFormRegion ,"itemview:update:user:info:click", (iv,data)->
						console.log "general form"
					

					#@on "itemview:update:user:info:click", ->
						#console.log "general form submitted"
				
				

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'my-profile'

				# show main layout
				@show @layout,
					loading: true
					entities : [@userProfile]

				
			# get layout
			getLayout : ->
				new Edit.View.Layout


			getGeneralFormView :(model) ->
				new Edit.View.GeneralForm 
						model : model 


			getPasswordFormView : ->
				new Edit.View.PasswordForm

			test: ->
				console.log 'hi'  

			
	App.MyProfileApp.Edit.Controller		