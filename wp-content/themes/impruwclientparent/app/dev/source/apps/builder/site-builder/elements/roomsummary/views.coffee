define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomSummary.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomSummaryView extends Marionette.ItemView

			className : 'roomsummary'

			template : '<div class="room-img">
							<img src="{{thumb_url}}" class="img-responsive">
						</div>
						<div class="room-title">Room Title</div>
						<div class="room-excerpt">Lorem Ipsum Dolor Sit Amet</div>
						<div class="room-actions">
							<div class="price">$999<small>/night</small></div>
							<button class="btn btn-room">View Details</button>
						</div>'