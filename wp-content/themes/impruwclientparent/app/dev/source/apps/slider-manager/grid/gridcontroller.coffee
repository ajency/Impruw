define ['app'
		'controllers/base-controller'
		'text!apps/slider-manager/grid/templates/sliderview.html'], (App, AppController, sliderTpl)->

			App.module 'SliderManager.GridView', (GridView, App, Backbone, Marionette, $, _)->

				class GridViewController extends AppController

					initialize:(opt)->

						{collection} = opt

						# pass the collection to composite view
						view = @_getSliderGridView collection

						# listen to create slider event from the view
						@listenTo view, "create:new:slider",() ->
							Marionette.triggerMethod.call @region, "create:new:slider"

						# listen to create slider event from the view
						@listenTo view, "itemview:edit:slider",(iv, id) ->
							Marionette.triggerMethod.call @region, "edit:slider", id

						# show the view with loading indicator 
						@show view, loading : true

					_getSliderGridView:(collection)->
						new SliderGridView
									collection : collection


				class SliderView extends Marionette.ItemView

					template : sliderTpl

					className : 'col-sm-2'

					events : 
						'click .edit-slider' : -> @trigger "edit:slider", @model.get 'id'


				class SliderGridView extends Marionette.CompositeView

					template : '<div class="col-sm-2">
									<a href="#" class="thumbnail create-slider"><span class="glyphicon glyphicon-plus-sign"></span><br>Add New Slider</a>
								</div>'

					className : 'row sliders'

					itemView : SliderView

					events:
						'click a.create-slider' :(e) -> 
								e.preventDefault()
								@trigger "create:new:slider"


				App.commands.setHandler 'show:sliders:grid', (opts = {})->
					App.navigate 'slider-manager'
					new GridViewController opts
