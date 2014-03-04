define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.ImageWithText.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.ImageWithTextView extends Marionette.ItemView

			className : 'image'

			template : '<img {{holder}}src="{{imageurl}}" alt="{{title}}" class="{{alignclass}} img-responsive image-img-with-text"/>
						<p class="editor"></p>
						<div class="clearfix"></div>'

			# override serializeData to set holder property for the view
			mixinTemplateHelpers:(data)->
				data = super data
				data.holder = ''
				if @model.isNew()
					data.holder = 'data-'
					data.imageurl = ->
						@url = "#{SITEURL}/wp-content/themes/impruwclientparent/app/dev/js/plugins/holder.js/35%x165"	
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
				'click img'		: (e)->
									e.stopPropagation()
									@trigger "show:media:manager"
				'blur p.editor' : (e)-> @trigger "text:element:blur", @$el.children('p.editor').html()


			# set the height of the parent of img in case float value is set
			# check if a valid image_id is set for the element
			# if present ignore else run the Holder.js to show a placeholder
			# after run remove the data-src attribute of the image to avoid
			# reloading placeholder image again
			onShow:->
				if @model.isNew()
					Holder.run()
					@$el.find('img').removeAttr 'data-src'



				#@$el.height @$el.find('img').height()

				#run ckeditor
				@$el.children('p.editor').attr('contenteditable','true').attr 'id', _.uniqueId 'text-'
				@editor = CKEDITOR.inline document.getElementById @$el.children('p.editor').attr 'id'
				content = Marionette.getOption(this, 'templateHelpers').content
				@editor.setData _.stripslashes content
