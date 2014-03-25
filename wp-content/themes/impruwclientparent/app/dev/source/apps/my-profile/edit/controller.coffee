define ['app', 'controllers/base-controller'
		'apps/my-profile/edit/views', 'entities/user'], (App, AppController)->

	App.module 'MyProfileApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			# initiliaze controller
			initialize:()->

				#user = App.request "get:user:model"

				@layout = @getLayout()

				@listenTo @layout, "show", =>
					# show general form view
					@layout.generalFormRegion.show @getGeneralFormView()
					# show password field view
					@layout.passwordFormRegion.show @getPasswordFormView()
					

				@on "itemview:generalform:submit:clicked", ->
						console.log "general form submitted"

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'my-profile'

				# show main layout
				@show @layout

				
			# get layout
			getLayout : ->
				new Edit.View.Layout


			getGeneralFormView : ->
				new Edit.View.GeneralForm 
							model : @userProfile 


			getPasswordFormView : ->
				new Edit.View.PasswordForm



			
	App.MyProfileApp.Edit.Controller		