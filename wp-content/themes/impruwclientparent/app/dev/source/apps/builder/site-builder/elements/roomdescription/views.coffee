define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.RoomDescription.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.RoomDescriptionView extends Marionette.ItemView

			className : 'roomdescription'

			template : '<div class="room-description-container clearfix">
							<div class="room-description">
								<h1>Room Description</h1>
								<div class="room-description-desc">Lorem ipsum dolor sit amet</div>
							</div>
						</div>'
   	



		