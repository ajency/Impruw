define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Logo.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.LogoView extends Marionette.ItemView

			className : 'logo'

			template : '<a href="{{SITEURL}}"><img src="{{url}}" alt="{{title}}"/></a>'

			events:
				'click'		: (e)->
								e.stopPropagation()
								#@trigger "show:media:manager"
				'click a'	: (e)-> e.preventDefault()


