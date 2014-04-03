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

			singleRoomTemplate : '<h3>Add dummy template here to show room summary element on single room</h3>'

			onBeforeRender:->
				isSingle = Marionette.getOption @, 'isSingleRoom'

				if not _.isUndefined isSingle
					@template = @singleRoomTemplate

				roomNotSet = Marionette.getOption @, 'roomNotSet'

				if not _.isUndefined roomNotSet
					@template = @roomNotSetTemplate