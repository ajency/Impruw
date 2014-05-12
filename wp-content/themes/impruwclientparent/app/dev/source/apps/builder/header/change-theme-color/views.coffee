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
						
						'click #aj-imp-color-sel' :->
							@trigger "show:theme:color:clicked"
							#@$el.find('#theme-color-pop').modal()
							


					onShow:->
						# Collapse accordion every time dropdown is shown
						#@$el.find('.dropdown-accordion').on 'show.bs.dropdown',(event)=>
							#accordion = $(@).find($(@).data('accordion'))
							#accordion.find('.panel-collapse.in').collapse('hide')
							#@trigger "get:theme:set:colors"

						# Prevent dropdown to be closed when we click on an accordion link
						#@$el.find('.dropdown-accordion').on 'click', 'a[data-toggle="collapse"]',(event)->
							#event.preventDefault()
							#event.stopPropagation()
							#$($(@).data('parent')).find('.panel-collapse.in').collapse('hide')
							#$($(@).attr('href')).collapse('show')

						#$('.drilldown').drilldown()

						# Prevent dropdown to be closed when we click on a drilldown link
						#@$el.find('.dropdown-accordion').on 'click', '.drilldown a',(event)->
							#event.preventDefault()
							#event.stopPropagation()

						# Flippant Code
						front = document.getElementById("flipthis")
						# Generate or Pull Back Content
						back_content = "<div class='edit-colors'>
											<h5>Color Set 1</h5>
											<div class='color-sets'>
												<div class='color row'>
													<div class='col-sm-2'>
														<span class='color-picker-box' style='background: #FF5F5F;'>Click to Edit</span>
													</div>
													<div class='col-sm-10'>
														<h6>Primary Color</h6>
														<p>Used in Headings, Links, Menu, Buttons and Accents</p>
													</div>
												</div>
												<div class='color row'>
													<div class='col-sm-2'>
														<span class='color-picker-box' style='background: #2A3B66;'>Click to Edit</span>
													</div>
													<div class='col-sm-10'>
														<h6>Secondary Color</h6>
														<p>Used in Headings, Links, Menu, Buttons and Accents</p>
													</div>
												</div>
												<div class='color row'>
													<div class='col-sm-2'>
														<span class='color-picker-box' style='background: #16A2F5;'>Click to Edit</span>
													</div>
													<div class='col-sm-10'>
														<h6>Tertiary Color</h6>
														<p>Used in Headings, Links, Menu, Buttons and Accents</p>
													</div>
												</div>
												<div class='color row'>
													<div class='col-sm-2'>
														<span class='color-picker-box' style='background:#CCCCCC;'>Click to Edit</span>
													</div>
													<div class='col-sm-10'>
														<h6>Background Color</h6>
														<p>Used in Headings, Links, Menu, Buttons and Accents</p>
													</div>
												</div>
												<div class='color row'>
													<div class='col-sm-2'>
														<span class='color-picker-box' style='background: #333333;'>Click to Edit</span>
													</div>
													<div class='col-sm-10'>
														<h6>Text Color</h6>
														<p>Used in Headings, Links, Menu, Buttons and Accents</p>
													</div>
												</div>
											</div>
											<div class='actions'>
												<button id='closeCard' class='btn btn-xs'>Cancel</button>
												<button id='applyCard' class='btn btn-xs btn-primary'>Apply</button>
											</div>
										</div>"
						back = undefined
						document.getElementById("flipCard").addEventListener "click", (e) ->
						  back = flippant.flip(front, back_content, "modal")
						  #$("#theme-color-pop").modal "hide"
						  document.getElementById("closeCard").addEventListener "click", (e) ->
						    back = back.close()
						    return

						  return


					onAddThemeColorSets :(themeColorCollection)->

							themeColorView = new ThemeColorSetView
													collection: themeColorCollection
													#region	: App.dialogRegion
							themeColorView.render()

							@$el.find('.dropdown-accordion').append themeColorView.$el

							@listenTo themeColorView,"itemview:change:theme:color:clicked", @changeThemeColorClick

					onShowThemeColorSet :(themeColorCollection)->

							themeColorView = new ThemeColorSetView
													collection: themeColorCollection
													region	: App.dialogRegion
													
							themeColorView.render()

							@$el.find('#aj-imp-color-sel').append themeColorView.$el

							@$el.find('#theme-color-pop').modal()

							
							


					changeThemeColorClick :(iv,model)->
						@trigger "change:theme:color", model


				class SingleSetView extends Marionette.ItemView

					tagName: 'li'

					template : '<div class="thumbnail" id="flipthis">
		                          <div class="colors">
		                            <span style="background: #FF5F5F;" data-toggle="tooltip" title="Primary Color for Theme">&nbsp;</span>
		                            <span style="background: #2A3B66;">&nbsp;</span>
		                            <span style="background: #16A2F5;">&nbsp;</span>
		                            <span style="background: #CCCCCC;">&nbsp;</span>
		                            <span style="background: #333333;">&nbsp;</span>
		                          </div> 
		                          <div class="caption">
		                            <h3>Color Set 1</h3>
		                            <p>
		                                <a href="#" class="btn btn-xs btn-primary" role="button"><span class="glyphicon glyphicon-check"></span> Apply</a> 
		                                <a href="#" class="btn btn-xs btn-default" id="flipCard" role="button"><span class="glyphicon glyphicon-edit"></span> Edit</a>
		                            </p>
		                          </div>
		                        </div>'
				
				class EmptyView extends Marionette.ItemView

					tagName: 'li'

					template: 'Nothing found'
				
				class ThemeColorSetView extends Marionette.CompositeView

						template : ' <div class="modal medium-modal fade" id="theme-color-pop" tabindex="-1" role="dialog">
							          <div class="modal-dialog">
							            <div class="modal-content">
							              <div class="modal-header">
							                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							                <h4 class="modal-title">Choose Colors for Your Theme</h4>
							              </div>
							              <div class="modal-body">
							                <ul class="color-set-list">
							                    
							                </ul>
							              </div>
							              <div class="modal-footer">
							                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
							              </div>
							            </div>
							          </div>
							        </div>'

						itemView: SingleSetView

						emptyView : EmptyView

						itemViewContainer: '.color-set-list'
				



