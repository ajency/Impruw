define ['app'
		'controllers/base-controller'
		'text!apps/slider-manager/grid/templates/sliderview.html'], (App, AppController, sliderTpl)->

			App.module 'SliderManager.GridView', (GridView, App, Backbone, Marionette, $, _)->

				class GridViewController extends AppController

					initialize:(opt)->

						# get the slider collection
						collection = App.request "get:sliders"
						
						# pass the collection to composite view
						view = @_getSliderGridView collection

						# listen to create slider event from the view
						@listenTo view, "create:new:slider",() ->
							# bubble up the same event from a region
							Marionette.triggerMethod.call @region, "create:new:slider"

						# show the view with loading indicator 
						@show view, loading : true

					_getSliderGridView:(collection)->
						new SliderGridView
									collection : collection


				class SliderView extends Marionette.ItemView

					template : sliderTpl

					className : 'col-sm-2'


				class SliderGridView extends Marionette.CompositeView

					template : ''

					className : 'row sliders'

					itemView : SliderView

					events:
						'click a.create-slider' :(e) -> 
								e.preventDefault()
								@trigger "create:new:slider"

					onCollectionRendered : ->
						@$el.prepend '<div class="col-sm-2">
										<a href="#" class="thumbnail create-slider"><span class="glyphicon glyphicon-plus-sign"></span><br>Add New Slider</a>
									</div>'



				App.commands.setHandler 'start:show:all:sliders', (opts = {})->

					App.navigate 'slider-manager'

					new GridViewController
							region : opts.region