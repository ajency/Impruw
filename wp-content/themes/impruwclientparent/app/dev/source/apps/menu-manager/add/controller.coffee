define ['app', 'controllers/base-controller', 'apps/menu-manager/add/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.Add", (Add, App)->

		#Show Controller 
		class Add.Controller extends AppController

			# initialize
			initialize:(opts)->

				@menucollection = menucollection = opts

				@view = view = @_getView()

				@show @view

			_getView : ->

				new Add.Views.MenuManagerView
							

		App.commands.setHandler "add:menu:items:app", (opts)->
				new Add.Controller opts

			