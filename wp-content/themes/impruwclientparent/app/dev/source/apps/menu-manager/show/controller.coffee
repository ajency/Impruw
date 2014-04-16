define ['app', 'controllers/base-controller'], (App, AppController)->

	#Login App module
	App.module "MenuManager.Show", (Show, App)->

		#Show Controller 
		class Show.Controller extends AppController

			# initialize
			initialize:(opts)->

				@menu_id = menu_id = opts.menu_id

				if not menu_id
					throw new Error "Menu Id not specified"
				
				#get the menu collection if not exsisting
				
				@menuDetails = menuDetails = App.request "get:menu:by:id", menu_id


				@menuCollection = menuCollection = menuDetails.get 'menu_items'

				
				@layout = layout = @getLayout()

				@listenTo @layout, "show", =>

					App.execute "add:menu:items:app",
									region 	 : @layout.addMenuRegion
									model  	 : @menuDetails

					App.execute "list:menu:items:app",
									region: @layout.listMenuRegion
									collection: @menuCollection
				
					@listenTo @layout.addMenuRegion , "menu:model:to:collection" ,(model) =>
						@menuCollection.add model
					
					
					@listenTo @layout.listMenuRegion , "delete:menu:item:model" ,(model) =>
						model.destroy
								wait : true
				
				@show @layout


			getLayout :(menuCollection)->
				new MediaMangerLayout
						collection: menuCollection
				

		# Rooms tariff layout 				
		class MediaMangerLayout extends Marionette.Layout

			className : 'media-manager-container row'

			template : '
						<div id="add-menu-items" class="col-md-6"></div>
						<div id="list-menu-items" class="col-md-6"></div>'

			dialogOptions : 
					modal_title : 'Menu Manager'

			regions : 
				addMenuRegion : '#add-menu-items'
				listMenuRegion : '#list-menu-items'


		
		App.commands.setHandler "menu-manager",(menuId) ->
			opts = 
				region 	: App.dialogRegion
				menu_id : menuId

			new Show.Controller opts
