define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Social.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.SocialView extends Marionette.ItemView

			className : 'social' 