define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Logo.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.LogoView extends Marionette.CollectionView

			className : 'logo'

			template : '<a href="{{SITEURL}}"><img src="{{image_url}}" alt="{{alt_text}}"/></a>'


