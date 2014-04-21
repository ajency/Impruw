define ['app', 'controllers/base-controller', 'apps/menu-manager/list/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.List", (List, App)->

		#Show Controller 
		class List.Controller extends AppController

			# initialize
			initialize:(opts)->

				@menucollection = menucollection = opts.collection

				@view = view = @_getView menucollection

				@listenTo @view, "itemview:update:menu:item:clicked" , (iv,formdata,model) =>
					model.save formdata,
									wait : true
									success : @updatedSuccess
										

				@listenTo @view ,"itemview:delete:menu:item:clicked",(iv,model) =>
					@region.trigger "delete:menu:item:model",model

				@listenTo @view ,"view:menu:order:changed",(order,collection) =>
					@region.trigger "menu:order:changed", order, collection
					#console.log 'finallu'
					#console.log collection
					#console.log order
				

				@show @view



			_getView:(menucollection) ->
				new  List.Views.MenuCollectionView 
							collection : menucollection
						
			
			updatedSuccess :=>				
				@view.triggerMethod "menu:item:updated"			


		App.commands.setHandler "list:menu:items:app", (opts)->
				new List.Controller opts

			