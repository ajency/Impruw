define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomSummary.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomSummaryView extends Marionette.ItemView

			className : 'roomsummary'

			roomNotSetTemplate : '<div class="room-img">
									<div class="image-placeholder"><span class="bicon icon-uniF10E"></span>Room Image</div>
								</div>
								<div class="room-title">Room Title</div>
								<div class="room-excerpt">Lorem Ipsum is simply dummy text of the 
									printing and typesetting industry</div>
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
			                                <span class="value">Deluxe Room</span>
			                            </div>
			                            <div class="room-summary-item">
			                                <span class="key">Check-in</span>
			                                <span class="value">10.00 AM</span>
			                            </div>
			                            <div class="room-summary-item">
			                                <span class="key">Check-out</span>
			                                <span class="value">1.00 PM</span>
			                            </div>
			                        </div>
			                    </div>'

			onBeforeRender:->
				isSingle = Marionette.getOption @, 'isSingleRoom'

				if not _.isUndefined isSingle
					@template = @singleRoomTemplate

				roomNotSet = Marionette.getOption @, 'roomNotSet'

				if not _.isUndefined roomNotSet
					@template = @roomNotSetTemplate
