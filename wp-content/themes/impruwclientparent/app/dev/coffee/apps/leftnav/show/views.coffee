define ['dashboard-app'
		'tpl!apps/leftnav/show/templates/leftNav.tpl'
		'tpl!apps/leftnav/show/templates/menuitem.tpl'],
		(App, leftNavTpl, menuitemTpl)->


			App.module 'LeftNav.Show.View', (View, App, Backbone, Marionette, $, _)->

				#
				#
				#
				class View.LeftNav extends Marionette.CompositeView

					template : leftNavTpl
					
					itemViewContainer: '#aj-imp-dash-menu'


				#
				#
				#
				class View.MenuItem extends Marionette.ItemView

					template : menuitemTpl


			return App.LeftNav.Show.View