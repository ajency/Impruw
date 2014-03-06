define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.EditSlider.AddSlide', (AddSlide, App, Backbone, Marionette, $, _)->

				class AddSlideController extends AppController

					initialize:->

						@layout = layout = @_getAddSlideLayout()

						addSlideView = @_getAddSlideView()

						@listenTo layout, "show", =>
							layout.addSlideFormRegion.show addSlideView
							App.execute "start:media:upload:app", region : layout.uploadMediaRegion
							App.execute "start:media:grid:app", region : layout.gridMediaRegion

						@listenTo addSlideView, "create:new:slide",(data)=>
							slide = App.request "create:new:slide:model", data
							slide.save
									wait : true
									success : @newSlideCreated

						@listenTo addSlideView, "cancel:create:new:slide",(data)=>
							Marionette.triggerMethod.call @region, "region:closed"
							layout.close()

						@show layout

					newSlideCreated:(model, response, options)=>
						Marionette.triggerMethod.call @region, "new:slide:created", model
						@layout.close()

					_getAddSlideLayout:->
						new AddSlideLayout

					_getAddSlideView:->
						new AddSlideView


				class AddSlideView extends Marionette.ItemView

					tagName : 'form'

					template : '<div class="aj-imp-edit-image well">
									<div class="row">
										<div class="aj-imp-crop-link col-sm-4">
											<img src="{{thumb_url}}" class="img-responsive add-image-to-slide">
										</div>
										<div class="aj-imp-img-form col-sm-8">
											<div class="row">
												<div class="col-sm-6">
													<input type="text" name="" value="{{slide_title}}" class="form-control" placeholder="Title">
												</div>
												<div class="col-sm-6">
													<input type="url" value="{{link}}" class="form-control" placeholder="Link">
												</div>
											</div>
										</div>
									</div>
									<div class="aj-imp-img-save">
										<button class="btn create-slide">Add</button>
										<button class="btn cancel-create-slide">Cancel</button>
									</div>
							  	</div>'

					events : 
						'click .create-slide' : ->
								data = Backbone.Syphon.serialize @
								@trigger "create:new:slide", data
						'click .add-image-to-slide': ->
								@$el.closest('#add-slide-form-region').next().slideToggle()
						'click .cancel-create-slide' : -> @trigger "cancel:create:new:slide"


				class AddSlideLayout extends Marionette.Layout

					template : '<div id="add-slide-form-region"></div>
								<div id="media-region" style="display:none">
									<ul class="nav nav-tabs">
										<li><a href="#upload-media-region" data-toggle="tab">Upload</a></li>
										<li class="active"><a href="#grid-media-region" data-toggle="tab">All Media</a></li>
									</ul>	
									<div class="tab-content">
										<div class="tab-pane" id="upload-media-region"></div>
										<div class="tab-pane active" id="grid-media-region"></div>
									</div>
								</div>'

					regions: 
						addSlideFormRegion : '#add-slide-form-region'
						uploadMediaRegion  : '#upload-media-region'
						gridMediaRegion	   : '#grid-media-region'


				App.commands.setHandler "show:add:new:slide",(options = {})->
						new AddSlideController options
