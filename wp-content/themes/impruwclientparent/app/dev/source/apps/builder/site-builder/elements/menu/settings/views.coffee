define ['app', 'text!apps/builder/site-builder/elements/menu/settings/templates/settings.html'],
		(App, settingsTpl)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Menu.Settings.Views', (Views, App, Backbone, Marionette, $, _)->

				class Views.SettingsView extends Marionette.ItemView

					template : settingsTpl

					className : 'modal-content settings-box'

					# override the serializeData function for settings view
					serializeData:()->
						data = {}
						config = @options.config.toJSON()
						modelData = @model.toJSON()

						data = 
							config 	: config
							model	: modelData

						data

					onRender:->
						@$el.find('input[type="checkbox"]').checkbox()
						@$el.find('input[type="radio"]').radio()
						@$el.find('select').selectpicker() 
						@setFields()

					# set fields for the form
					setFields:->
						if @model.get('draggable') is true
							@$el.find('input[name="draggable"]').checkbox('check')
						if @model.get('justified') is true
							@$el.find('input[name="justified"]').checkbox('check')

						@$el.find('select[name="style"]').selectpicker 'val',@model.get 'style'
						@$el.find('select[name="choose-menu"]').selectpicker 'val',@model.get 'menu_id'

					events:
						'click .close-settings' : (evt)-> 
											evt.preventDefault()
											App.settingsRegion.close()
						'change select[name="style"]' 		: 'updateStyle'
						'change select[name="choose-menu"]' : (evt)-> @trigger "element:menu:changed", $(evt.target).val()
						'change input[name="draggable"]'	: 'setDraggable'
						'change input[name="justified"]'	: 'setJustified'

					# update the style 
					updateStyle:(evt)=>
						newStyle = $(evt.target).val()
						@trigger "element:style:changed", newStyle

					# align
					alignElement :(evt)->
						align = $(evt.target).val()
						@trigger "element:alignment:changed", align

					# align
					setJustified :(evt)->
						align = $(evt.target).is(':checked')
						@trigger "element:justified:changed", align

					#setDraggable
					setDraggable:(evt)->
						draggable = $(evt.target).is(':checked')
						@trigger "element:draggable:changed", draggable
					