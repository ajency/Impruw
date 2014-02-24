define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Image.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.ImageView extends Marionette.ItemView

			className : 'image'

			template : '<img {{holder}}src="{{imageurl}}" alt="{{title}}"/>'

			# override serializeData to set holder property for the view
			mixinTemplateHelpers:(data)->
				data = super data
				data.holder = ''
				if @model.isNew()
					data.holder = 'data-'
					data.imageurl = ->
						@url	
				else
					console.log data
					if not data.sizes[data.size]
						data.size = _.chain(_.keys(data.sizes)).first().value()

					data.imageurl = ->
						@sizes[@size].url	

				data

			events:
				'click'		: (e)->
								e.stopPropagation()
								@trigger "show:media:manager"

			# check if a valid image_id is set for the element
			# if present ignore else run the Holder.js to show a placeholder
			# after run remove the data-src attribute of the image to avoid
			# reloading placeholder image again
			onShow:->
				if @model.isNew()
					Holder.run()
					@$el.find('img').removeAttr 'data-src'
