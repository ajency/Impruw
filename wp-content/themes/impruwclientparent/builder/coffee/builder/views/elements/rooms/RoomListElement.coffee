##
## Map Element
##

define ['builderelement','tpl!builder/templates/elements/BasicElement.tpl','global'], (BuilderElement, template, global)->

	class RoomListElement extends BuilderElement

		className : 'aj-imp-elem-room-list element '

		template : template

		elementType : 'RoomListElement'

		events : 
			'mouseenter'  					: 'elementMouseEnter'
			'mouseleave'  					: 'elementMouseLeave'
			'click > .aj-imp-delete-btn' 	: 'destroyElement'
			'contextmenu'					: 'showContextMenu'

		##
		##
		initialize:(options = {})->

			if _.isUndefined options.config
				@id = @type() + '-' + global.generateRandomId()
				@$el.attr 'id', this.id
			else 
				@setProperties options.config

			@generateMarkup 
				icon : ''
				name : 'Room List Element'

			@setContextMenu()

			return