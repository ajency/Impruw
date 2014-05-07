define ['app'
		'text!apps/builder/header/show/templates/mainview.html'],
		(App, mainviewTpl)->

			# Headerapp views
			App.module 'HeaderApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->
				
				class emptyitemview extends Marionette.ItemView
				
				# Header main view
				class Views.MainView extends Marionette.CompositeView

					template : mainviewTpl

					className : 'navbar navbar-default'

					itemView :	emptyitemview 

					serializeData:->
						data = super()

						console.log @collection

						data.LOGOUTURL = LOGOUTURL
						data.DASHBOARDURL = DASHBOARDURL

						data

					events:
						'click .add-new-page' : ->
							@trigger "add:new:page:clicked"

						'click .color-set' :->
							console.log 'hi'

					onShow:->
						# Collapse accordion every time dropdown is shown
						@$el.find('.dropdown-accordion').on 'show.bs.dropdown',(event)->
							accordion = $(@).find($(@).data('accordion'))
							accordion.find('.panel-collapse.in').collapse('hide')

						# Prevent dropdown to be closed when we click on an accordion link
						@$el.find('.dropdown-accordion').on 'click', 'a[data-toggle="collapse"]',(event)->
							event.preventDefault()
							event.stopPropagation()
							$($(@).data('parent')).find('.panel-collapse.in').collapse('hide')
							$($(@).attr('href')).collapse('show')

						#$('.drilldown').drilldown()

						# Prevent dropdown to be closed when we click on a drilldown link
						#@$el.find('.dropdown-accordion').on 'click', '.drilldown a',(event)->
							#event.preventDefault()
							#event.stopPropagation()
