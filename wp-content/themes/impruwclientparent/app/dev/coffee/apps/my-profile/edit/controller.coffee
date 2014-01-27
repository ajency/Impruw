define ['app', 'controllers/base-controller'
		'apps/my-profile/edit/views', 'entities/user'], (App, AppController)->

	App.module 'MyProfileApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			#initiliaze controller
			initialize:()->

				@myProfile = App.request "get:user:profile"

			
			#show my profile view
			showMyProfile : ()->	
				
				view = @.getMainView(@myProfile)	

				@show view,(loading : true)


			#get main view 
			getMainView : (model)->
				
				new Edit.View.MainView
							model : model

			
	App.MyProfileApp.Edit.Controller		