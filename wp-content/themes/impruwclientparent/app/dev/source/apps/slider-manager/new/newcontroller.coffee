define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.NewSlider', (NewSlider, App, Backbone, Marionette, $, _)->

				class NewSliderController extends AppController

					initialize:(opt)->

						view = @_getCreateSliderFormView()

						@listenTo view, "cancel:create:slider", =>
							Marionette.triggerMethod.call @region,"cancel:create:slider"
							view.close()

						@listenTo view, "create:new:slider:with:data",(sliderData)=>
								sliderModel = App.request "create:new:slider:model", sliderData
								sliderModel.save 
											wait: true
											success : @newSliderCreated
								
						@show view


					newSliderCreated:(model, response, options)=>
						# get sliders collection and add new slider
						sliderCollection = App.request "get:collection", 'slidercollection'
						sliderCollection.add model
						Marionette.triggerMethod.call @region,"cancel:create:slider"

					_getCreateSliderFormView:->
						new CreateSliderView

					# clean up code
					onClose:->
						delete @selectedMediaCollection
						App.navigate 'slider-manager'

					onShow:->
						App.navigate 'slider-manager/new'


				# slider form
				class CreateSliderView extends Marionette.ItemView

					tagName : 'form'

					className : 'form-horizontal'

					template : '<div class="form-group">
									<label class="col-md-2 control-label">Slider Name</label>
									<div class="col-md-10">
										<input required type="text" name="title" class="form-control" placeholder="Name Your Slider" />
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-10 col-md-offset-2">
										<button type="button" class="btn btn-primary create-new-slider">Create Slider</button>
										<button type="btutton" class="btn cancel-new-slider">Cancel</button>
									</div>
								</div>'

					events : 
						'click button.cancel-new-slider': -> @trigger "cancel:create:slider"
						'click button.create-new-slider': (e)->
								if @$el.valid()
									data = Backbone.Syphon.serialize @
									data['alias'] 	= _.slugify data['title']
									data['shortcode'] = "[rev_slider #{data['alias']}]"
									@trigger "create:new:slider:with:data", data

				
				
				App.commands.setHandler 'show:create:new:slider', (opts = {})->
					new NewSliderController opts