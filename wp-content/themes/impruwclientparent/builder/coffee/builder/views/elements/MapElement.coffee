##
## Contact Form Element
##

define ['builderelement','tpl!builder/templates/elements/BasicElement.tpl','global'], (BuilderElement, template, global)->

	class MapElement extends BuilderElement

		className : 'aj-imp-elem-map element '

		template : template

		elementType : 'MapElement'

		events : 
			'mouseenter'  					: 'elementMouseEnter'
			'mouseleave'  					: 'elementMouseLeave'
			'click > .aj-imp-delete-btn' 	: 'destroyElement'
			'contextmenu'					: 'showContextMenu'

		initialize:(options = {})->

			if _.isUndefined options.config
				@id = @type() + '-' + global.generateRandomId()
				@$el.attr 'id', this.id
			else 
				@setProperties options.config

			@generateMarkup 
				icon : ''
				name : 'Map Element'

			@setContextMenu()

			return