define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.EditSlider', (EditSlider, App, Backbone, Marionette, $, _)->

				class EditSliderController extends AppController

					initialize:(opt)->

						{@sliderId} = opt

						@layout = layout = @_getEditLayout()

						@listenTo layout, "cancel:edit:slider", =>
							Marionette.triggerMethod.call @region,"cancel:edit:slider"
							layout.close()

						@show layout

						App.navigate  "slider-manager/edit/#{@sliderId}"

					# edit layout
					_getEditLayout:->
						new EditSliderLayout

					# clean up code
					onClose:->
						App.navigate 'slider-manager'

					onShow:->
						App.navigate "slider-manager/edit/#{sliderId}"


				# slider form
				class EditSliderLayout extends Marionette.Layout

					template : '<div class="row edit-slider">
									<div class="col-sm-2 slider-left-nav">
										<div class="cancel-slider">
											<button class="btn btn-sm btn-cancel-slider cancel-edit-slider"><span class="glyphicon glyphicon-remove-circle"></span> Cancel</button>
										</div>
										<ul class="nav nav-list">
											<li class="active">
												<a href="#slider-settings-region" data-toggle="tab">Slider Settings</a>
											</li>
											<li>
												<a href="#sliders-list-region" data-toggle="tab">Sliders</a>
											</li>
											<li>
												<a href="#add-edit-slide-region" data-toggle="tab">Add/Edit Slides</a>
											</li>
										</ul>
									</div>
									<div class="col-sm-10 slider-right-region">
										<div class="tab-content">
											<div id="slider-settings-region" class="tab-pane active"></div>
											<div id="sliders-list-region" class="tab-pane"></div>
											<div id="add-edit-slide-region" class="tab-pane"></div>
										</div>
									</div>
								</div>'


					events : 
						'click button.cancel-edit-slider': -> @trigger "cancel:edit:slider"


					regions : 
						sliderSettingsRegion 	: '#slider-settings-region'
						slidesListRegion 		: '#sliders-list-region'
						addEditSlideRegion 		: '#add-edit-slide-region'


				App.commands.setHandler 'show:edit:slider', (opts = {})->
					new EditSliderController opts