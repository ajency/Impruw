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

					template : '<img src={{thumb_url}} alt=""/>
								<button class="btn btn-link edit-slide">Edit</button>
								<button class="btn btn-link remove-slide">Remove</button>'

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