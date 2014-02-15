define ['app'
		'text!apps/builder/site-builder/settings/templates/settings.html'],
		(App, settingsTpl)->

			App.module 'SiteBuilderApp.Settings.Views', (Views, App, Backbone, Marionette, $, _)->

				# settings view
				class Views.SettingView extends Marionette.ItemView

					template : settingsTpl

					className : 'modal-content settings-box'

					events:
						'click .close-settings' : (evt)-> 
										evt.preventDefault()
										App.settingsRegion.close()
						'change select[name="style"]': 'updateStyle'

					# update the style 
					updateStyle:(evt)=>
						newStyle = $(evt.target).val()
						@trigger "element:style:changed", newStyle
						

							
			App.SiteBuilderApp.Settings.Views