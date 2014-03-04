define ['app', 'holder', 'text!apps/builder/site-builder/elements/slider/templates/slider.html'],(App, Holder, sliderTpl)->

	# Row views
	App.module 'SiteBuilderApp.Element.Slider.Views', (Views, App, Backbone, Marionette, $, _)->


		class SliderItem extends Marionette.ItemView

			className: 'item'

			template : '<img src="http://placehold.it/900x400" alt="Slide"/>'

			tagName : 'li'

			events:
				'click' :(e)-> @trigger "show:slider:manager"
 

		# Menu item view
		class Views.SliderView extends Marionette.CompositeView

			className : 'slider'

			template : sliderTpl

			id : _.uniqueId('carousel-')

			itemView : SliderItem

			itemViewContainer: '.carousel-inner'

			templateHelpers :(data = {})->

				data.slider_id = @id
				data.slides = @collection.toJSON()
				data

			onShow:->
				@$el.find('.carousel').carousel()

			


