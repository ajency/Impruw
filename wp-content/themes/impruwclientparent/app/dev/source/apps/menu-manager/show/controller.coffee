define ['app', 'controllers/base-controller'], (App, AppController)->

	#Login App module
	App.module "MenuManager.Show", (Show, App)->

		#Show Controller 
		class Show.Controller extends AppController

			# initialize
			initialize:(opts)->
				
				@menuId = 0

				if opts.menuId
					@menuId = menuId = opts.menuId

				@menuCollection = menuCollection = opts.menuCollection
				
				if @menuId is 0
					@menuCollection.once "add",(model)=>
						@menuId = model.get 'menu_id'
						App.execute "add:menu:items:app",
										region 	 : @layout.addMenuRegion
										menuId   : @menuId

				@layout = layout = @getLayout()

				@listenTo @layout, "show", =>

					App.execute "add:menu:items:app",
									region 	 : @layout.addMenuRegion
									menuId   : @menuId

					App.execute "list:menu:items:app",
									region: @layout.listMenuRegion
									collection: @menuCollection
				
					@listenTo @layout.addMenuRegion , "menu:model:to:collection" ,(model) =>
						@menuCollection.add model
					
					
					@listenTo @layout.listMenuRegion , "delete:menu:item:model" ,(model) =>
						model.destroy
								wait : true

					#@listenTo view, 'itemview:menu:order:changed',(iv, order)->
							#console.log order
							#newOrder = _.idOrder order
							#console.log newOrder
							#console.log iv
							#iv.model.get('menu_items').updateOrder newOrder, iv.model.get 'id'


				
				@show @layout


			getLayout :(menuCollection)->
				new MediaMangerLayout
						
				

		# Rooms tariff layout 				
		class MediaMangerLayout extends Marionette.Layout

			className : 'menu-manager-container row'

			template : '
						<div id="add-menu-items" class="col-md-6"></div>
						<div id="list-menu-items" class="col-md-6"></div>'

			dialogOptions : 
					modal_title : 'Menu Manager'

			regions : 
				addMenuRegion : '#add-menu-items'
				listMenuRegion : '#list-menu-items'


		
		App.commands.setHandler "menu-manager",(menuCollection,menuId) ->
			opts = 
				region 	: App.dialogRegion
				menuCollection : menuCollection
				menuId : menuId

			new Show.Controller opts
