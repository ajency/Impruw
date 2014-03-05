define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.NewSlider', (NewSlider, App, Backbone, Marionette, $, _)->

				class NewSliderController extends AppController

					initialize:(opt)->

						view = @_getCreateSliderFormView()

						@listenTo view, "cancel:create:slider", =>
							Marionette.triggerMethod.call @region,"cancel:create:slider"
							view.close()

						@listenTo view, "create:new:slider",(sliderData)=>
								sliderModel = App.request "create:new:slider:model", sliderData
								sliderModel.save wait: true
								
						@show view

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

					template : '<form class="form-horizontal">
									<div class="form-group">
										<label class="col-md-2 control-label">Slider Name</label>
										<div class="col-md-10">
											<input type="text" class="form-control" placeholder="Name Your Slider" />
										</div>
									</div>
									<div class="form-group">
										<div class="col-md-10 col-md-offset-2">
											<button class="btn btn-primary">Create Slider</button>
											<button class="btn cancel-new-slider">Cancel</button>
										</div>
									</div>
								</form>'

					events : 
						'click button.cancel-new-slider': -> @trigger "cancel:create:slider"


				# class NewSliderLayout extends Marionette.Layout

				# 	template : '<div class="form-horizontal">
				# 					<div class="form-group">
				# 						<label class="control-label col-md-2">Slider Name:</label>
				# 						<div class="col-md-10">
				# 							<input type="text" class="form-control" name="slider-name"/>
				# 						</div>
				# 					</div>
				# 				</div>
				# 				<ul class="nav nav-tabs">
				# 				  <li><a href="#upload-media-region" data-toggle="tab">Upload</a></li>
				# 				  <li class="active"><a href="#selected-media" data-toggle="tab">All Media</a></li>
				# 				</ul>
				# 				<div class="tab-content">
				# 					<div id="upload-media-region" class="tab-pane"></div>
				# 					<div id="selected-media" class="tab-pane active">
				# 						<div class="row">
				# 							<div class="col-md-9"><div id="grid-media-region"></div></div>
				# 							<div class="col-md-3">
				# 								<h5 class="selected-header">Selected Images:</h5>
				# 								<div id="selected-media-region"></div>
				# 							</div>
				# 						</div>
				# 					</div>
				# 				</div>
				# 				<button class="btn btn-primary create-new-slider"> Create New Slider </button>
				# 				<button class="btn cancel-new-slider"> Cancel </button>'

				# 	regions : 
				# 		messageRegion 	: '#message-region'
				# 		uploadRegion 	: '#upload-media-region'
				# 		gridRegion 	 	: '#grid-media-region' 
				# 		selectedRegion 	: '#selected-media-region' 

				# 	events: 
				# 		'click button.create-new-slider' : ->
				# 				data = {}
				# 				data['title'] 	= @$el.find('input[name="slider-name"]').val()
				# 				data['alias'] 	= _.slugify data['title']
				# 				data['shortcode'] = "[rev_slider #{data['alias']}]"
				# 				@trigger "create:new:slider", data

				# 		'click button.cancel-new-slider': -> @trigger "cancel:create:slider"

				class ErrorView extends Marionette.ItemView

					template : 'Please select atleast 2 images'

					tagName : 'div'

					className: 'alert alert-danger'
								

				App.commands.setHandler 'show:create:new:slider', (opts = {})->
					new NewSliderController opts