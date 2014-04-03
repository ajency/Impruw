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

			singleRoomTemplate : '<h3>Add dummy template here to show room summary element on single room</h3>'

			onBeforeRender:->
				isSingle = Marionette.getOption @, 'isSingleRoom'

				if not _.isUndefined isSingle
					@template = @singleRoomTemplate