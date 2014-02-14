define [
		'app'
		'apps/login/show/controller'
		], (App)->

			App.module 'LoginApp', (LoginApp, App, Backbone, Marionette, $, _)->

				@startWithParent = false

				class LoginApp.Router extends Marionette.AppRouter

					appRoutes :
						'login' : 'showLogin'

					login : ()=>
						return false if i isnt 0

				#PUBLIC API
				API = 
					showLogin : (opt = {})->

						appState = App.request "get:current:appstate"

						if not appState.isLoggedIn()
							show = new LoginApp.Show.Controller
													region : App.loginRegion
						else
							App.navigate App.rootRoute, {trigger : true}


				LoginApp.on 'start': ->
					
					_.logAppMsg "LoginApp Module started..."
					
					new LoginApp.Router
								controller : API


				App.commands.setHandler 'app:loginstatus:changed', (options)->

					{loginStatus} = options

					API.showLogin() if loginStatus is false