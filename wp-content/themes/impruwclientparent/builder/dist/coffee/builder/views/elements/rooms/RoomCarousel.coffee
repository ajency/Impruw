
define ['builderelement'
		'tpl!builder/templates/elements/BasicElement.tpl'
		'global'], 
		(BuilderElement, template, global)->

			class RoomCarousel extends BuilderElement

				className : 'aj-imp-elem-room-carousel element'

				template : template

				elementType : 'RoomCarousel'

				events : 
					'mouseenter'  					: 'elementMouseEnter'
					'mouseleave'  					: 'elementMouseLeave'
					'click > .aj-imp-delete-btn' 	: 'destroyElement'
					'contextmenu'					: 'showContextMenu'
					'click a'						: 'void'


				initialize:(options = {})->

					if _.isUndefined options.config
						@id = @type() + '-' + global.generateRandomId()
						@$el.attr 'id', this.id
					else 
						@setProperties options.config

					@generateMarkup 
						icon : 'uniF11C'
						name : 'Room Carousel'

					@setContextMenu()

					return