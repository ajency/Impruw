define ['app', 'text!apps/media-manager/edit-media/templates/form.html'], (App, formTpl)->
	
			App.module 'MediaManager.EditMedia.Views', (Views, App)->

				class Views.EditMediaView extends Marionette.ItemView
					
					template : formTpl

					events: 
						'change select[name="size"]' : (e)-> @trigger "size:select:changed", $(e.target).val()

					serializeData: ->
						data = super()
						# change sizes to array for mustache rendrening
						sizes = _.clone data.sizes
						delete data.sizes
						# reset array
						data.sizes = []
						_.each sizes, (size, key)->
							s = {}
							s[key] = size
							data.sizes.push s 
										
						data.sizename = ->
							_.chain(_.keys(@)).first().value()

						data.sizedimension = ->
							size = _.chain(_.values(@)).first().value()
							return "#{size.width}x#{size.height}"

						data	

					onRender:->
						@$el.find('select').selectpicker()			