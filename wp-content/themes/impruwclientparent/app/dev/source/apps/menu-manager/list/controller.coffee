define ['app', 'controllers/base-controller', 'apps/menu-manager/list/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.List", (List, App)->

		#Show Controller 
		class List.Controller extends AppController

			# initialize
			initialize:(opts)->

				@menucollection = menucollection = opts.collection

				@view = view = @_getView menucollection

				@show @view

			_getView:(menucollection) ->
				new  List.Views.MenuCollectionView 
							collection : menucollection



		App.commands.setHandler "list:menu:items:app", (opts)->
				new List.Controller opts

			