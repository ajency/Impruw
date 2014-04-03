define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomSummary.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomSummaryView extends Marionette.ItemView

			className : 'roomsummary'

			template : '<div class="room-img">
							<img src="{{thumbnail_url}}" class="img-responsive">
						</div>
						<div class="room-title">Title</div>
						<div class="room-excerpt">Lrem Ipsum Gipsum</div>
						<div class="room-actions">
							<div class="price">$99<small>/night</small></div>
							<button class="btn btn-room">View Details</button>
						</div>'

			singleRoomTemplate : '<div class="room-summary-container">
			                        <div class="room-summary-title">
			                            <h4>Room Summary</h4>
			                        </div>
			                        <div class="room-summary">
			                            <div class="room-summary-item">
			                                <span class="key">No. of Rooms</span>
			                                <span class="value">3</span>
			                            </div>
			                            <div class="room-summary-item">
			                                <span class="key">Guests</span>
			                                <span class="value">2</span>
			                            </div>
			                            <div class="room-summary-item">
			                                <span class="key">Room Type</span>
			                                <span class="value">Double Deluxe Room</span>
			                            </div>
			                            <div class="room-summary-item">
			                                <span class="key">Check-in</span>
			                                <span class="value">10.00 AM</span>
			                            </div>
			                            <div class="room-summary-item">
			                                <span class="key">Check-out</span>
			                                <span class="value">1.00 PM</span>
			                            </div>
			                            <div class="room-summary-desc">
			                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.
			                                <button class="btn btn-sm btn-book">Booking &amp; Availability</button>
			                            </div>
			                        </div>
			                    </div>'

			onBeforeRender:->
				isSingle = Marionette.getOption @, 'isSingleRoom'

				if not _.isUndefined isSingle
					@template = @singleRoomTemplate