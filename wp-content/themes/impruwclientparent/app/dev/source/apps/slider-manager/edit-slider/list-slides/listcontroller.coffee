define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.EditSlider.SlidesList', (SlidesList, App, Backbone, Marionette, $, _)->

				class SlidesListController extends AppController

					initialize:(opt)->

						{@sliderId} = opt

						slidesCollection = App.request "get:slides:for:slide" , @sliderId

						@layout = layout = @_getSlidesListLayout()

						@listView = listView = @_getSlidesListView slidesCollection

						@listenTo listView, "itemview:slide:updated:with:data",(iv, data)->
							slide = iv.model
							slide.set data
							slide.save null,
									wait: true
									success : @slideModelUpdated

							
						@listenTo listView, "itemview:remove:slide",(iv, slide)->
							slide.destroy wait : true

						@listenTo layout, "show:add:new:slide",->
							App.execute "show:add:new:slide", 
												region : layout.addSlideRegion
												sliderId : @sliderId

						@listenTo layout.addSlideRegion, "region:closed new:slide:created",(slide) =>
							slidesCollection.add(slide) if _.isObject slide
							layout.triggerMethod "show:add:slide"

						@listenTo layout, "show",->
							layout.slidesListRegion.show listView

						@show layout, loading :true


					# edit layout
					_getSlidesListView:(slidesCollection)->
							new SlidesListView
										collection : slidesCollection

					_getSlidesListLayout:->
							new SlidesListLayout

					slideModelUpdated:->




				# views 
				class SlideView extends Marionette.ItemView

					tagName : 'div'

					className : 'panel panel-default'

					template : '<div class="panel-heading">
								  <a class="accordion-toggle" data-toggle="collapse" data-parent="#slides-accordion" href="#slide-{{id}}">
									<div class="aj-imp-image-item row">
										<div class="imgthumb col-sm-1">
											<img src="{{thumb_url}}" class="img-responsive">
										</div>
										<div class="imgname col-sm-7">{{file_name}}</div>
										<div class="imgactions col-sm-2">
											<button class="btn" title="Edit Image"><span class="glyphicon glyphicon-edit"></span> Edit Image</button>
											<button class="btn remove-slide" title="Delete Image"><span class="glyphicon glyphicon-remove-sign"></span></button>
										</div>
									</div>
								  </a>
							  	</div>
							  	<div id="slide-{{id}}" class="panel-collapse collapse">
							  		<div class="panel-body">
									  	<div class="aj-imp-edit-image well">
											<div class="row">
												<div class="aj-imp-crop-link col-sm-4">
													<img src="{{thumb_url}}" class="img-responsive">
												</div>
												<div class="aj-imp-img-form col-sm-8">
													<div class="row">
														<div class="col-sm-6">
															<input type="text" required name="title" value="{{title}}" class="form-control" placeholder="Title">
														</div>
														<div class="col-sm-6">
															<input type="url" type="link" value="{{link}}" class="form-control" placeholder="Link">
														</div>
													</div>
													<div class="row">
														<div class="col-sm-12">
															<textarea name="description" class="form-control" placeholder="Description"></textarea>
														</div>
													</div>
												</div>
											</div>
											<div class="aj-imp-img-save">
												<button class="btn update-slide">Update</button>
											</div>
									  	</div>
									</div>
								 </div>'

					events:
						'click .update-slide' 	: -> 
								data = Backbone.Syphon.serialize @
								@trigger "slide:updated:with:data", data

						'click .remove-slide' 	:(e)-> 
								e.preventDefault()
								if confirm('Are you sure?')
									@trigger "remove:slide", @model

				# colllection view
				class SlidesListView extends Marionette.CompositeView

					template : '<div class="aj-imp-image-header row">
									<div class="col-sm-1">
										&nbsp;
									</div>
									<div class="col-sm-7">
										File Name
									</div>
									<div class="col-sm-2 align-center">
										Actions
									</div>
								</div>
								<div class="panel-group" id="slides-accordion"></div>'

					itemView : SlideView

					itemViewContainer : '#slides-accordion'

					onBeforeRender:->
						@collection.sort()

					# make them sortable
					onShow:->
						@$el.sortable()

					onClose:->
						@$el.sortable 'destroy'


				class SlidesListLayout extends Marionette.Layout

					template : '<div id="slides-list-region"></div>
								<div class="aj-imp-block-button add-new-slide">
									<button class="btn btn-default btn-hg btn-block"><span class="icon-uniF10C"></span>&nbsp;&nbsp;Add Slide</button>
								</div>
								<div id="add-slide-region"></div>'

					events:
						'click .add-new-slide' : -> 
							@$el.find('.add-new-slide').hide()
							@trigger "show:add:new:slide"

					onShowAddSlide : ->
						@$el.find('.add-new-slide').show()


					regions:
						slidesListRegion 	: '#slides-list-region'
						addSlideRegion 		: '#add-slide-region'
					


				App.commands.setHandler 'show:slides:list', (opts = {})->
					new SlidesListController opts