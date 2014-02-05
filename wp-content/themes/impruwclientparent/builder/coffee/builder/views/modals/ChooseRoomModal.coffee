##
## Map Element
##

define ['builder/views/modals/Modal'
		'tpl!builder/templates/modal/chooseroom.tpl'
		'rooms'
		'roomsview'
		'global'], (Modal,template, Rooms, RoomsView, global)->

			class ChooseRoom extends Modal

				id: 'choose-room'

				template : template

				className : 'modal'

				##
				initialize:(options = {})->

					html = @outerTemplate
									title : 'Choose Room'

					@$el.html html

					$('body').append @$el

					@$el.modal()

					markup = this.template()

					@$el.find('.modal-content').append markup

					@rooms = new Rooms.RoomCollection();

					@rooms.fetch(reset : true).done ()->
									global.Holder.run()

					roomsview = new RoomsView
										collection : @rooms

					@$el.find('.modal-body').html roomsview.$el

					this.listenTo getAppInstance().vent,'room-selected', this.hide

