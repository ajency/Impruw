define ['app', 'text!apps/builder/site-builder/elements/row/settings/templates/settings.html'],
		(App, settingsTpl)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Row.Settings.Views', (Views, App, Backbone, Marionette, $, _)->

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
						@$el.find('select').selectpicker 
												style: 'btn-mini btn-default'

					events:
						'click .close-settings' : (evt)-> 
											evt.preventDefault()
											App.settingsRegion.close()
						'change select[name="style"]' 	:(evt)-> @trigger "element:style:changed", $(evt.target).val()
						'change input[name="draggable"]': (evt)-> @trigger "element:draggable:changed", $(evt.target).is(':checked')