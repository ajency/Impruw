define ['app', 'controllers/base-controller', 'apps/menu-manager/show/views'], (App, AppController)->

	#Login App module
	App.module "MenuManager.Show", (Show, App)->

		#Show Controller 
		class Show.Controller extends AppController

			# initialize
			initialize:(opts)->

				{@menu} = opts
				
				#get the menu collection if not exsisting
				if not @menu
					@menu = menu = App.request "get:menu:menuitems",2
				

				@layout = layout = @getLayout menu

				@listenTo @layout, "show", =>
					App.execute "add:menu:items:app",
									region: @layout.addMenuRegion

									collection: @menu

					#App.execute "list:menu:items:app",
									#region: @layout.listMenuRegion
									#collection: @menu

				@show @layout


			getLayout :(menuCollection)->
				new MediaMangerLayout
						collection: menuCollection
				

				# Rooms tariff layout 				
		class MediaMangerLayout extends Marionette.Layout

			className : 'media-manager-container'

			template : '<div id="add-menu-items"></div>
						<div id="list-menu-items"></div>'

			dialogOptions : 
						modal_title : 'Menu Manager'

			regions : 
				addMenuRegion : '#add-menu-items'
				listMenuRegion : '#list-menu-items'  
