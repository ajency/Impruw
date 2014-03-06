define ['app'
		'controllers/base-controller'], (App, AppController)->

			App.module 'SliderManager.EditSlider.SlidesList', (SlidesList, App, Backbone, Marionette, $, _)->

				class SlidesListController extends AppController

					initialize:(opt)->

						{@sliderId} = opt

						slidesCollection = App.request "get:slides:for:slide" , @sliderId

						@listView = listView = @_getSlidesListView slidesCollection

						@listenTo listView, "itemview:edit:slide",(iv, slide)->
							console.log "Edit slide app"

						@listenTo listView, "itemview:remove:slide",(iv, slide)->
							console.log "Remove slide app"

						@show listView, loading :true


					# edit layout
					_getSlidesListView:(slidesCollection)->
							new SlidesListView
										collection : slidesCollection

					# clean up code
					onClose:->
						App.navigate 'slider-manager'


				# views 
				class SlideView extends Marionette.ItemView

					tagName : 'li'

					template : '<div class="slide">
									<div class="row">
										<div class="col-sm-1 move">
											<div class="move-icon">
												<span class="glyphicon glyphicon-resize-vertical"></span>
											</div>
										</div>
										<div class="col-sm-3 thumb">
											<img src={{thumb_url}} alt=""/>
										</div>
										<div class="col-sm-8 details">
											<div class="slide-actions">
												<button class="btn btn-info btn-xs btn-link edit-slide"><span class="glyphicon glyphicon-pencil"></span> Edit Slide</button>
												<button class="btn btn-danger btn-xs btn-link remove-slide"><span class="glyphicon glyphicon-trash"></span> Delete</button>
											</div>
										</div>
									</div>
								</div>'

					events:
						'click .edit-slide' 	:(e)-> @trigger "edit:slide", @model
						'click .remove-slide' 	:(e)-> @trigger "remove:slide", @model

				# colllection view
				class SlidesListView extends Marionette.CollectionView

					tagName : 'ul'

					itemView : SlideView

					onBeforeRender:->
						@collection.sort()

					# make them sortable
					onShow:->
						@$el.sortable()

					onClose:->
						@$el.sortable 'destroy'


				App.commands.setHandler 'show:slides:list', (opts = {})->
					new SlidesListController opts