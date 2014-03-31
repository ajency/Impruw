define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomTitle.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomTitleView extends Marionette.ItemView

			className : 'roomtitle'

			template : '<div class="room-title-container clearfix">
							<div class="room-title">
								<h1>Room Title</h1>
								<div class="room-title-desc">Lorem ipsum dolor sit amet et odio vehicula, id porttitor quam malesuada a nice room. </div>
							</div>
							<div class="room-title-actions">
								<button class="btn btn-sm btn-book">Booking &amp; Availability</button>
							</div>
						</div>'	