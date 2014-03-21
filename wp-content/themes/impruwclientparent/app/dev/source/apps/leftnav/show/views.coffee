define ['app'
		'text!apps/leftnav/show/templates/leftNav.html'
		'text!apps/leftnav/show/templates/menuitem.html'],
		(App, leftNavTpl, menuitemTpl)->


			App.module 'LeftNav.Show.View', (View, App, Backbone, Marionette, $, _)->

				class MenuItem extends Marionette.ItemView

					template : menuitemTpl

					serializeData:()->

						data = @model.toJSON()

						data.slug = ->
							_.slugify @title

						data


				class View.LeftNav extends Marionette.CompositeView

					template : leftNavTpl
					
					itemViewContainer: '#aj-imp-dash-menu'

					itemView : MenuItem

					onShow: ->
						# set the initial active menu depending on current hash
						hash = location.hash
						hash = hash.replace '#',''
						@onSetActiveMenu hash

					onSetActiveMenu:(link)=>
						@$el.find "li"
							.removeClass 'active'

						link = '#' + link

						@$el.find "a[data-route='#{link}']" 
							.parent()
							.addClass 'active'