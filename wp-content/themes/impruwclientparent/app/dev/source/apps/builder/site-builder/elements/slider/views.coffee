define ['app', 'holder', 'text!apps/builder/site-builder/elements/slider/templates/slider.html'],(App, Holder, sliderTpl)->

	# Row views
	App.module 'SiteBuilderApp.Element.Slider.Views', (Views, App, Backbone, Marionette, $, _)->


		class SliderItem extends Marionette.ItemView

			className: 'item'

			template : '<img data-src="http://localhost/impruw/wp-content/themes/impruwclientparent/app/dev/js/plugins/holder.js/100x400/#000:#fff" alt="Slide"/>'

			tagName : 'li'

			onShow:->
				Holder.run()



		# Menu item view
		class Views.SliderView extends Marionette.CompositeView

			className : 'slider'

			template : sliderTpl

			id : _.uniqueId('carousel-')

			itemView : SliderItem

			itemViewContainer: '.carousel-inner'

			templateHelpers :(data = {})->

				data.slider_id = @id
				data.SITEURL = SITEURL
				data.slides = [
								(
									image : ''
									order : 0
								)
								(
									image : ''
									order : 1
								)
							]
				data

			onShow:->
				@$el.find('.carousel').carousel()

			


