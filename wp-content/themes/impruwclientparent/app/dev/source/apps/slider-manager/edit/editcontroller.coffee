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

					template : 'left side pane will go here. may be it wact like tab but on left
								<div id="slider-settings-region"></div>
								<div id="sliders-list-region"></div>
								<div id="add-edit-slide-region"></div>'

					regions : 
						sliderSettingsRegion 	: '#slider-settings-region'
						slidesListRegion 		: '#sliders-list-region'
						addEditSlideRegion 		: '#add-edit-slide-region'


				App.commands.setHandler 'show:edit:slider', (opts = {})->
					new EditSliderController opts