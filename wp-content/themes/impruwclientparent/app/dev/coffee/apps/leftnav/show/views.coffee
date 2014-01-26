define ['app'
		'tpl!apps/leftnav/show/templates/leftNav'
		'tpl!apps/leftnav/show/templates/menuitem'],
		(App, leftNavTpl, menuitemTpl)->


			App.module 'LeftNav.Show.View', (View, App, Backbone, Marionette, $, _)->

				class View.MenuItem extends Marionette.ItemView

					template : menuitemTpl


				class View.LeftNav extends Marionette.CompositeView

					template : leftNavTpl
					
					itemViewContainer: '#aj-imp-dash-menu'

					itemView : View.MenuItem


			return App.LeftNav.Show.View