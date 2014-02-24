define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Image.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.ImageView extends Marionette.ItemView

			className : 'image'

			template : '<img {{holder}}src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive"/>'

			# override serializeData to set holder property for the view
			mixinTemplateHelpers:(data)->
				data = super data
				data.holder = ''
				if @model.isNew()
					data.holder = 'data-'
					data.imageurl = ->
						@url	
				else
					
					if not data.sizes[data.size]
						data.size = _.chain(_.keys(data.sizes)).first().value()

					data.imageurl = ->
						@sizes[@size].url	

					data.alignclass = ->
						switch @alignment
							when 'left' 
								return 'pull-left'
							when 'right'
								return 'pull-right'

				data

			events:
				'click'		: (e)->
								e.stopPropagation()
								@trigger "show:media:manager"

			# set the height of the parent of img in case float value is set
			# check if a valid image_id is set for the element
			# if present ignore else run the Holder.js to show a placeholder
			# after run remove the data-src attribute of the image to avoid
			# reloading placeholder image again
			onShow:->
				if @model.isNew()
					Holder.run()
					@$el.find('img').removeAttr 'data-src'

				@$el.height @$el.find('img').height()
