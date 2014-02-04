##
## Map Element
##

define ['builderelement','tpl!builder/templates/elements/BasicElement.tpl','global'], (BuilderElement, template, global)->

	class RoomElement extends BuilderElement

		className : 'aj-imp-elem-room element '

		template : template

		elementType : 'RoomListElement'

		dataSource : 0

		events : 
			'mouseenter'  					: 'elementMouseEnter'
			'mouseleave'  					: 'elementMouseLeave'
			'click > .aj-imp-delete-btn' 	: 'destroyElement'
			'contextmenu'					: 'showContextMenu'
			'click a'						: 'void'
			'click'							: 'showChooseRoomModal'

		# Initialize
		initialize:(options = {})->

			if _.isUndefined options.config
				@id = @type() + '-' + global.generateRandomId()
				@$el.attr 'id', this.id
			else 
				@setProperties options.config

			@generateMarkup 
				icon : ''
				name : 'Room Element'

			@setContextMenu()

			return

		# add some extra settings to view
		hasExtraSettings :()->

			if _.isEmpty ROOMS then return ''

			html = "<div class='form-group'><select name='for-room'>"
			html += "<option value='0'>Select</option>"

			_.each ROOMS, (room, index)->
				html += "<option value=#{room.id}>#{room.name}</option>"
				return

			html += '</select></div>'


		# Save extra settings
		updateExtraProperties:( evt = {})->

			pcontent = $(evt.target).closest '.popover'

			@dataSource = parseInt $(pcontent).find('select[name="for-room"]').val()


		# Show Choose room modal
		showChooseRoomModal: ()->

			require ['underscore', 'chooseroom'], _.bind (_, ChooseRoom)-> 

				chooseroom = getAppInstance().ViewManager.findByCustom "choose-room"

				if _.isUndefined chooseroom
					chooseroom = new ChooseRoom();
					getAppInstance().ViewManager.add(chooseroom, "choose-room");

				this.listenTo getAppInstance().vent,'room-selected', this.updateSelf 

				chooseroom.open();

			, this

		updateSelf :(room)->

			log room





