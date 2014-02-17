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

						console.log data
						data

					events:
						'click .close-settings' : (evt)-> 
											evt.preventDefault()
											App.settingsRegion.close()
						'change select[name="style"]' : 'updateStyle'
						'change select[name="align"]' : 'alignElement'

					# update the style 
					updateStyle:(evt)=>
						newStyle = $(evt.target).val()
						@trigger "element:style:changed", newStyle

					# align
					alignElement :(evt)->
						align = $(evt.target).val()
						@trigger "element:alignment:changed", align
					