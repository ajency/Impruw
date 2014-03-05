define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.EditSlider', (EditSlider, App, Backbone, Marionette, $, _)->

				class EditSliderController extends AppController

					initialize:(opt)->

						{@sliderId} = opt

						console.log @sliderId

						@layout = layout = @_getEditLayout()

						@show layout

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

					template : '<div class="row">
									<div class="col-sm-3">
										Left Nav
									</div>
									<div class="col-sm-9">
										<div id="slider-settings-region"></div>
										<div id="sliders-list-region"></div>
										<div id="add-edit-slide-region"></div>
									</div>
								</div>'

					regions : 
						sliderSettingsRegion 	: '#slider-settings-region'
						slidesListRegion 		: '#sliders-list-region'
						addEditSlideRegion 		: '#add-edit-slide-region'


				App.commands.setHandler 'show:edit:slider', (opts = {})->
					new EditSliderController opts