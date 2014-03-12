define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomFacilitiesView extends Marionette.ItemView

			className : 'roomfacilities'

			template : '<div style="background:grey;height:30px">This is my room RoomFacilities </div><div class="clearfix"></div>'	