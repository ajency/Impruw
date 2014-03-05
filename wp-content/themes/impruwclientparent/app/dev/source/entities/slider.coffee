define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Slider", (Slider, App, Backbone, Marionette, $, _)->

			#Media Model
			class Slider.SliderModel extends Backbone.AssociatedModel
				idAttribute : 'id'

				name : 'slider'

				# override the default sync to make it wirk with wordpress :(
				sync:(method, model, options = {}) ->

					if not @name
						throw new Error "'name' property missing"

					if _.isFunction @name
						name = @name()
					else 
						name = @name

					# creation the action property with method name and name property
					# ex: create-model-name, delete-model-name, update-model-name, read-model-name
					_action = "#{method}-#{name}" 
					
					options.data = model.toJSON()
					Backbone.send _action,options


			class SlideModel extends Slider.SliderModel

				name : 'slide'



			#Media collection
			class Slider.SliderCollection extends Backbone.Collection
				
				model : Slider.SliderModel

				url:->
					"#{AJAXURL}?action=fetch-sliders"

			#Media collection
			class SlideCollection extends Backbone.Collection
				
				model : SlideModel

				comparator : 'order'

			
				
			##PUBLIC API FOR ENitity
			API =
				# create a empty collection of media and store it in offline store
				createStoreCollection:->
					sliderCollection = new Slider.SliderCollection
					App.request "set:collection", 'slidercollection', sliderCollection
					
				# 
				fetchSliders:(reset)->
					sliderCollection = App.request "get:collection", 'slidercollection'
					sliderCollection.fetch 
										reset : reset 
					sliderCollection

				# 
				fetchSlides:(sliderId, reset)->
					slideCollection = new SlideCollection()
					slideCollection.url = "#{AJAXURL}?action=fetch-slides&slider_id=#{sliderId}"
					slideCollection.fetch 
										reset : reset
					slideCollection

				#get a media 
				getSliderById:(sliderId)->
					# check if present
					sliderCollection = App.request "get:collection", 'slidercollection'
					slider = sliderCollection.get parseInt sliderId

					if _.isUndefined slider
						slider = new Slider.SliderModel id : sliderId
						slider.url = "#{AJAXURL}?action=get-slider&id=#{sliderId}" 
						sliderCollection.add slider
						slider.fetch()

					slider

				createNewSlider:(data)->
					slider = new Slider.SliderModel data
					sliderCollection = App.request "get:collection", 'slidercollection'
					sliderCollection.add slider
					slider


			#REQUEST HANDLERS
			App.commands.setHandler "create:slider:store", ->
				API.createStoreCollection()

			App.reqres.setHandler "get:sliders",(shouldReset = true) ->
				API.fetchSliders shouldReset

			App.reqres.setHandler "get:slides",(sliderId, shouldReset = true) ->
				API.fetchSlides shouldReset

			App.reqres.setHandler "get:slider:by:id",(sliderId)->
				API.getSliderById sliderId

			App.reqres.setHandler "get:slides:for:slide", (sliderId, shouldReset = true)->
				API.fetchSlides sliderId, shouldReset

			App.reqres.setHandler "create:new:slider:model",(modelData)->
				API.createNewSlider modelData
