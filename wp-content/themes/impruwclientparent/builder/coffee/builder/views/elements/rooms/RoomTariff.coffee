##
## Room Tariff Element
##

define ['builderelement','tpl!builder/templates/elements/BasicElement.tpl','global'], (BuilderElement, template, global)->

	class RoomTariff extends BuilderElement

		className : 'aj-imp-elem-room-tariff element '

		template : template

		elementType : 'RoomTariff'

		dataSource : 0

		events : 
			'mouseenter'  					: 'elementMouseEnter'
			'mouseleave'  					: 'elementMouseLeave'
			'click > .aj-imp-delete-btn' 	: 'destroyElement'
			'contextmenu'					: 'showContextMenu'
			'click a'						: 'void'

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
				name : 'Room Tariff'

			@setContextMenu()

			return

		hasExtraSettings :()->

			options = ''
			
			log @.dataSource

			_.each ['all', 'min'], _.bind (ele, index)->
				
				if @.dataSource is ele 
					selected = 'selected="selected"'
				else
					selected = ''

				options += "<option value='#{ele}' #{selected}>#{_.capitalize(ele)}</option>"
				return 

			, this

			html = "<div class='form-group'><select name='show'>
					#{options}
					</select></div>"


		updateExtraProperties:( evt = {})->

			pcontent = $(evt.target).closest '.popover'
			
			@dataSource = $(pcontent).find('select[name="show"]').val()






