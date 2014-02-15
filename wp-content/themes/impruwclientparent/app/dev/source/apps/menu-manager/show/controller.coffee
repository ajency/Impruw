define ['app', 'controllers/base-controller', 'apps/menu-manager/show/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.Show", (Show, App)->

		#Show Controller 
		class Show.Controller extends AppController

			# initialize
			initialize:()->

				menuCollection = App.request "get:site:menus"

				view = @getView menuCollection

				@listenTo view, 'menu:order:changed',(model, order)->
					newOrder = _.idOrder order
					model.get('menu_items').updateOrder newOrder, model.get 'id'
					
				@show view, loading : true


			# gets the main login view
			getView :(menuCollection)->
				new Show.Views.MenuManagerView
								collection : menuCollection