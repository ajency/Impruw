define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.EditSlider.Settings', (Settings, App, Backbone, Marionette, $, _)->

				class SettingsController extends AppController

					initialize:(opt = {})->

						{ @model } = opt

						@view = view = @_getUpdateSettingsView @model

						@listenTo view, "update:slider:with:data",(sliderData)=>
							@model.set sliderData
							@model.save 
								wait: true
								success : @sliderSettingsUpdated

						@show view

					_getUpdateSettingsView:(slider)->
						new CreateSliderView model : slider


					sliderSettingsUpdated:=>
						@view.triggerMethod "settings:updated"


				class CreateSliderView extends Marionette.ItemView

					tagName : 'form'

					className : 'form-horizontal'

					template : '<div class="form-group">
									<label class="col-md-2 control-label">Slider Name</label>
									<div class="col-md-10">
										<input required type="text" value="{{title}}" name="title" class="form-control" placeholder="Name Your Slider" />
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-10 col-md-offset-2">
										<button type="button" class="btn btn-primary update-slider">Update</button>
									</div>
								</div>'

					events : 
						'click button.cancel-new-slider': -> @trigger "cancel:create:slider"
						'click button.update-slider': (e)->
								if @$el.valid()
									data = Backbone.Syphon.serialize @
									data['alias'] 	= _.slugify data['title']
									data['shortcode'] = "[rev_slider #{data['alias']}]"
									@trigger "update:slider:with:data", data

					onSettingsUpdated:->
						@$el.prepend '<div class="alert alert-success">Updated successfully</div>'


				App.commands.setHandler 'show:slider:edit:settings', (opts = {})->
					new SettingsController opts