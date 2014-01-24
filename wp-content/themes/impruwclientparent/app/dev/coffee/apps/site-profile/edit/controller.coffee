define ['dashboard-app', 'controllers/base-controller'
		'apps/site-profile/edit/views', 'entities/site'], (App, AppController)->

	App.module 'SiteProfileApp.Edit', (Edit, App, Backbone, Marionette, $, _)->

		class Edit.Controller extends AppController

			initialize:()->

				@siteProfile = App.request "get:site:profile"

				#@layout = @.getLayout()
			
			showSiteProfile : ()->	
				
				view = @.getMainView(@siteProfile)	

				@show view,(loading : true)


			getMainView : (model)->
				
				new Edit.View.MainView
						model : model

			
	App.SiteProfileApp.Edit.Controller		