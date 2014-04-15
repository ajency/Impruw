define ['app', 'controllers/base-controller', 'apps/menu-manager/add/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.Add", (Add, App)->

		#Show Controller 
		class Add.Controller extends AppController

			# initialize
			initialize:(opts)->

				@menu_id = menu_id = opts.model.get 'id'

				@menumodel = menumodel= opts.model

				@view = view = @_getView @menumodel
				
				@listenTo @view ,"add:menu:item:clicked" :(data)=>
					@saveMenu data,@menu_id

				@show @view

			saveMenu :(data,menuid) =>
				menumodel = App.request "create:new:menu:item",data,menuid

				@view.triggerMethod "new:menu:created"
				
				@region.trigger "menu:model:to:collection", menumodel

			_getView :(menumodel) ->
				new Add.Views.MenuItemView
						model : menumodel
							

		App.commands.setHandler "add:menu:items:app", (opts)->
				new Add.Controller opts

			