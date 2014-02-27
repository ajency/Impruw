define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Link.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.LinkView extends Marionette.ItemView

			tagName : 'span'

			template : '<a href="{{link}}" target="{{target}}">{{text}}</a>'

			className: 'link'

			onRender:()->
				className = _.slugify @model.get 'style'
				@$el.addClass className

			# avoid and anchor tag click events
			events:
				'click a'	: (e)-> e.preventDefault()
						

