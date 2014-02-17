define ['app'
		'holder'
		'text!apps/builder/site-builder/element/templates/element.html'],
		(App, Holder, elementTpl)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Views', (Views, App, Backbone, Marionette, $, _)->

				# Pages single view
				class Views.ElementView extends Marionette.Layout

					# basic template
					template : elementTpl

					tagName : 'div'

					regions: 
						elementRegion : '> .element-markup'

					# class name
					className : 'element-wrapper'

					# element events
					events : 
						'click' : (evt)->
							evt.stopPropagation() 
							@trigger "show:setting:popup", @model

						'click .aj-imp-delete-btn': (evt)->
							evt.stopPropagation()
							@trigger "delete:element", @model

					# model events
					# listen to markup change event. update the UI accordingly
					modelEvents : 
						'change:meta_id'	: 'setMetaId'

					# set the data-element attribute for element 
					onRender:->
						@$el.find('.element-markup > span').spin @_getOptions()
						@setElementType()

					onSetDraggable:(draggable)->
						if draggable is false
							@$el.find('.aj-imp-drag-handle').addClass('non-visible')
						else if draggable is true
							@$el.find('.aj-imp-drag-handle').removeClass('non-visible')
				
					# set the meta id for element
					setMetaId :(model)->
						@$el.find('input[name="meta_id"]').val model.get('meta_id')

					# set element type in hidden field
					setElementType :()->
						@$el.find('input[name="element"]').val @model.get('element')

					# rerender markup 
					onElementModelCreated:->
						# close the spinner
						@$el.find('.element-markup > span').spin false
						
					
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