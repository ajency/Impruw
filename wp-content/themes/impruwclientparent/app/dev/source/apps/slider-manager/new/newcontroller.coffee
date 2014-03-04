define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.NewSlider', (NewSlider, App, Backbone, Marionette, $, _)->

				class NewSliderController extends AppController

					initialize:(opt)->

						# create an empty collection which will hold the selected images
						@selectedMediaCollection = App.request "get:empty:media:collection"

						layout = new NewSliderLayout

						@listenTo layout, "cancel:create:slider", =>
							Marionette.triggerMethod.call @region,"cancel:create:slider"
							layout.close()

						@listenTo layout.gridRegion, "media:element:selected",(mediaModel)->
								@selectedMediaCollection.add mediaModel

						@listenTo layout.gridRegion, "media:element:unselected",(mediaModel)->
								@selectedMediaCollection.remove mediaModel

						@listenTo layout, "create:new:slider",(sliderData)=>
								data.slider_images 	= @selectedMediaCollection.toJSON()
								sliderModel = App.request "create:new:slider:model", sliderData
								sliderModel.save wait: true

						# start apps on show event of layout
						@listenTo layout, 'show', =>
							App.execute "start:media:upload:app", region : layout.uploadRegion
							App.execute "start:media:grid:app", region : layout.gridRegion
							App.execute "start:media:selected:app", 
											region : layout.selectedRegion
											collection : @selectedMediaCollection

						@show layout

					# clean up code
					onClose:->
						delete @selectedMediaCollection
						App.navigate 'slider-manager'

					onShow:->
						App.navigate 'slider-manager/new'


				class NewSliderLayout extends Marionette.Layout

					template : '<div class="form-horizontal">
									<div class="form-group">
										<label class="control-label col-md-2">Slider Name:</label>
										<div class="col-md-10">
											<input type="text" class="form-control" name="slider-name"/>
										</div>
									</div>
								</div>
								<ul class="nav nav-tabs">
								  <li><a href="#upload-media-region" data-toggle="tab">Upload</a></li>
								  <li class="active"><a href="#selected-media" data-toggle="tab">All Media</a></li>
								</ul>
								<div class="tab-content">
									<div id="upload-media-region" class="tab-pane"></div>
									<div id="selected-media" class="tab-pane active">
										<div class="row">
											<div class="col-md-9"><div id="grid-media-region"></div></div>
											<div class="col-md-3">
												<h5 class="selected-header">Selected Images:</h5>
												<div id="selected-media-region"></div>
											</div>
										</div>
									</div>
								</div>
								<button class="btn btn-primary create-new-slider"> Create New Slider </button>
								<button class="btn cancel-new-slider"> Cancel </button>'

					regions : 
						uploadRegion 	: '#upload-media-region'
						gridRegion 	 	: '#grid-media-region' 
						selectedRegion 	: '#selected-media-region' 

					events: 
						'click button.create-new-slider' : ->
								data = {}
								data.slider_name 	= @$el.find('input[name="slider-name"]').val()
						'click button.cancel-new-slider': -> @trigger "cancel:create:slider"

								

				App.commands.setHandler 'start:create:new:slider', (opts = {})->
					new NewSliderController
							region : opts.region