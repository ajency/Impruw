define ['app', 'controllers/base-controller', 'apps/menu-manager/show/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.Show", (Show, App)->

		#Show Controller 
		class Show.Controller extends AppController

			# initialize
			initialize:()->

				menuCollection = App.request "get:site:menus"

				view = @getView menuCollection

				@listenTo view, 'itemview:menu:order:changed',(iv, order)->
					newOrder = _.idOrder order
					iv.model.get('menu_items').updateOrder newOrder, iv.model.get 'id'

				@listenTo view, "itemview:new:menu:item:added", (iv, data)->
												menu = menuCollection.get parseInt data['menu_id']
												items = menu.get 'menu_items'
												data.ID= _.uniqueId()
												items.add data
					
				@show view, loading : true
				App.getRegion('elementsBoxRegion').hide()
				
			onClose: ->
				App.navigate ''
				App.getRegion('elementsBoxRegion').unhide()

			# gets the main login view
			getView :(menuCollection)->
				new Show.Views.MenuManagerView
								collection : menuCollection