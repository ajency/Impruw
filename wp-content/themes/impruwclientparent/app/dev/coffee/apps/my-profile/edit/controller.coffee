define ['app', 'controllers/base-controller'
		'apps/my-profile/edit/views', 'entities/user'], (App, AppController)->

	App.module 'MyProfileApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			initialize:()->

				@myProfile = App.request "get:my:profile"

				#@layout = @.getLayout()
			
			showMyProfile : ()->	
				
				view = @.getMainView(@myProfile)	

				@show view,(loading : true)


			getMainView : (model)->
				
				new Edit.View.MainView
						model : model

			
	App.MyProfileApp.Edit.Controller		