define ['app', 'controllers/base-controller', 'apps/menu-manager/list/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.List", (List, App)->

		#Show Controller 
		class List.Controller extends AppController

			# initialize
			initialize:(opts)->
				#console.log opts

				#@menucollection = menucollection = opts.collection

				#@view = view = @getView menucollection


				#@show @view

			getView:(menucollection) ->
				new  List.Views.MenuItemView
							collection : menucollection



		App.commands.setHandler "list:menu:items:app", (opts)->
				new List.Controller opts

			