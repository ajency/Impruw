define ["app", 'backbone'], (App, Backbone) ->

		App.module "Entities.Slider", (Slider, App, Backbone, Marionette, $, _)->

			#Media Model
			class Slider.SliderModel extends Backbone.AssociatedModel
				idAttribute : 'id'


			#Media collection
			class Slider.SliderCollection extends Backbone.Collection

				filters: 
					order           : 'DESC'
					orderby         : 'date'
					paged           : 1
					posts_per_page  : 40
				
				model : Slider.SliderModel

				parse:(resp)->
					return resp.data if resp.code is 'OK'
					resp

				
			##PUBLIC API FOR ENitity
			API =
				# create a empty collection of media and store it in offline store
				createStoreCollection:->
					sliderCollection = new Slider.SliderCollection
					App.request "set:collection", 'slidercollection', sliderCollection
					

				fetchSliders:(reset)->
					App.request "set:collection", 'slidercollection', sliderCollection

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
					slider.collection = sliderCollection
					slider


			#REQUEST HANDLERS
			App.commands.setHandler "create:slider:store", ->
				API.createStoreCollection()

			App.reqres.setHandler "fetch:sliders",(shouldReset = true) ->
				API.fetchSliders shouldReset

			App.reqres.setHandler "get:slider:by:id",(sliderId)->
				API.getSliderById sliderId

			App.reqres.setHandler "create:new:slider:model",(modelData)->
				API.createNewSlider modelData
