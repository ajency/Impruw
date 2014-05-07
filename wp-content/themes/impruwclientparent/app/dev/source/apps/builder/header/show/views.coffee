define ['app'
		'text!apps/builder/header/show/templates/mainview.html'],
		(App, mainviewTpl)->

			# Headerapp views
			App.module 'HeaderApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->

				# Header main view
				class Views.MainView extends Marionette.Layout

					template : mainviewTpl

					className : 'navbar navbar-default'

					serializeData:->
						data = super()

						data.LOGOUTURL = LOGOUTURL
						data.DASHBOARDURL = DASHBOARDURL

						data

					events:
						'click .add-new-page' : ->
							@trigger "add:new:page:clicked"

					onShow:->
						# Collapse accordion every time dropdown is shown
						@$el.find('.dropdown-accordion').on 'show.bs.dropdown',(event)=>
							accordion = $(@).find($(@).data('accordion'))
							accordion.find('.panel-collapse.in').collapse('hide')
							@trigger "get:theme:set:colors"

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
					onAddThemeColorSets :(themeColorCollection)->

							themeColorView = new ThemeColorSetView
													collection: themeColorCollection
							themeColorView.render()

							@$el.find('.dropdown-accordion').append themeColorView.$el

							@listenTo themeColorView,"itemview:change:theme:color:clicked", @changeThemeColorClick

					changeThemeColorClick :(iv,model)->
						@trigger "change:theme:color", model


				class SingleSetView extends Marionette.ItemView

					tagName: 'li'

					template : '<div class="drilldown">
									<div class="drilldown-container">
										<div class="drilldown-root">
											<div class="color-set clearfix active ">
												<a href="#" class="change-theme-color">{{name}} <span class="bicon icon-uniF176"></span></a> 
											</div>
										</div>
									</div>
								</div>'
					events :
						'click .change-theme-color' :->
							@trigger "change:theme:color:clicked" ,@model
				
				class EmptyView extends Marionette.ItemView

					tagName: 'li'

					template: 'Nothing found'
				
				class ThemeColorSetView extends Marionette.CollectionView

						tagName: 'ul'

						itemView: SingleSetView

						emptyView : EmptyView

						className: 'dropdown-menu pull-right'


