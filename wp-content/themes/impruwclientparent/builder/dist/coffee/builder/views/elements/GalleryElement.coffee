##
## Map Element
##

define ['builderelement','tpl!builder/templates/elements/BasicElement.tpl','global'], (BuilderElement, template, global)->

	class GalleryElement extends BuilderElement

		className : 'aj-imp-elem-gallery element '

		template : template

		elementType : 'GalleryElement'

		dataSource : 0

		events : 
			'mouseenter'  					: 'elementMouseEnter'
			'mouseleave'  					: 'elementMouseLeave'
			'click > .aj-imp-delete-btn' 	: 'destroyElement'
			'click'                     	: 'showModal'
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
				name : 'Gallery Element'

			@setContextMenu()

			return


		createGallery :(images)->

			return false if images.length is 0

			ids = _.map images, (image, index)->
				image.get 'id'

			@.dataSource = ids
				

		showModal: ->
		    sliderModal = _.bind((_, SliderManager) ->

		      	slidermanager = SiteBuilder.ViewManager.findByCustom("slider-manager")
		      
		      	#ensure Menu manager is created just once
		      	if _.isUndefined(slidermanager)
		        	slidermanager = new SliderManager()
		        	SiteBuilder.ViewManager.add slidermanager, "slider-manager"
		      
		      	#start listening event
		      	@listenTo SiteBuilder.vent, "create-slider", @createGallery
		      
		      	#modal hide event
		      	@listenTo SiteBuilder.vent, "modal-closed", @stopListeningEvents
		      	slidermanager.open()

		    , this)

		    require ["underscore", "slidermanager"], sliderModal

		  
		###
		Stop listening to modal events
		@return {[type]} [description]
		###
		stopListeningEvents: (modal) ->
		    
		  	#can perform some actions to modal object if required
		    @stopListening SiteBuilder.vent, "create-slider", @createGallery
		    @stopListening SiteBuilder.vent, "modal-closed", @stopListeningEvents

		# hasExtraSettings :()->

		# 	if _.isEmpty ROOMS then return ''

		# 	html = "<div class='form-group'><select name='for-room'>"
		# 	html += "<option value='0'>Select</option>"

		# 	_.each ROOMS, (room, index)->
		# 		html += "<option value=#{room.id}>#{room.name}</option>"
		# 		return

		# 	html += '</select></div>'


		# updateExtraProperties:( evt = {})->

		# 	pcontent = $(evt.target).closest '.popover'

		# 	@dataSource = parseInt $(pcontent).find('select[name="for-room"]').val()





