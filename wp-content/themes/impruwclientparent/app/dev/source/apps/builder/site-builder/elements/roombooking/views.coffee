define ['app'
		'text!apps/builder/site-builder/elements/roombooking/template/mainTpl.html'],(App, mainTpl)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomBooking.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomBookingView extends Marionette.ItemView

			className : 'roombooking'

			template : mainTpl