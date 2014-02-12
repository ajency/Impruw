define ['app'
		'ckeditor'
		'holder'
		'tpl!apps/builder/site-builder/element/templates/element'],
		(App,CKEDITOR, Holder, elementTpl)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Views', (Views, App, Backbone, Marionette, $, _)->

				# Pages single view
				class Views.ElementView extends Marionette.ItemView

					template : elementTpl

					tagName : 'div'

					className : 'element-wrapper'

					# element events
					events : 
						'click .aj-imp-settings-btn' : (evt)-> 

							# ignore if element is text or title
							return if @model.get('elementType') is 'text' or @model.get('elementType') is 'title'

							evt.stopPropagation()
							x = screen.width / 2 - @$el.width() / 2
							y = screen.height / 2 - @$el.height() / 2
							@trigger "show:setting:popup", x, y

						'click .aj-imp-delete-btn': (evt)->
							evt.stopPropagation()
							@trigger "delete:element", @model

					# model events
					# listen to markup change event. update the UI accordingly
					modelEvents : 
						'change:markup' 	: 'renderMarkup'
						'change:id'			: 'setMetaId'

					# set the data-element attribute for element 
					onRender:->
						@$el.attr "data-element", @model.get('type')
						@$el.find('.element-markup > span').spin @_getOptions()
						@setElementType()
					
					# set the meta id for element
					setMetaId :(model)->
						@$el.find('input[name="meta_id"]').val model.get('id')

					# set element type in hidden field
					setElementType :()->
						@$el.find('input[name="element_type"]').val @model.get('elementType')

					# rerender markup 
					renderMarkup:(model)->
						# close the spinner
						@$el.find('.element-markup > span').spin false
						# update the markup
						@$el.find('.element-markup').html model.get 'markup'
						@setInilineEditing()
						@setImagePlaceholders()

					# set CKEDITOR if applicable
					setInilineEditing:->
						# get all inline editable fields for the element
						editable = @$el.find('.element-markup').children().eq(0).attr 'contenteditable'

						# return if this element has not inline editable fields
						return if _.isUndefined editable

						#destry previous instances if any
						# if not _.isUndefined(CKEDITOR.instances) and _.size(CKEDITOR.instances) > 0
						# 	_.each CKEDITOR.instances, (instance, key)->
						# 		delete CKEDITOR.instances[key]
						# 		return

						CKEDITOR.inlineAll()

					# initializes the holder image placeholders
					setImagePlaceholders:->
						imageElements = @$el.find '*[data-src]'

						if _.size(imageElements) > 0
							Holder.run()
							# remove data-src attribute
							$(imageElements).removeAttr 'data-src'

					
					# spinner options
					_getOptions : ->
			            lines 		: 10
			            length 		: 6
			            width 		: 2.5
			            radius 		: 7
			            corners 	: 1
			            rotate 		: 9
			            direction 	: 1
			            color 		: '#000'
			            speed 		: 1
			            trail 		: 60
			            shadow 		: false
			            hwaccel 	: true
			            className 	: 'spinner'
			            zIndex 		: 2e9
			            top 		: '0px'
			            left 		: '40px'

				
			App.SiteBuilderApp.Element.Views