define ['app'
		'controllers/base-controller'
		'apps/login/show/views'], (App, AppController)->

	#Login App module
	App.module "LoginApp.Show", (Show, App)->

		#Show Controller 
		class Show.Controller extends AppController

			#initialize
			initialize:()->

				loginView = @getLoginView()

				@show loginView


			#gets the main login view
			getLoginView :()->
				new Show.View.LoginView