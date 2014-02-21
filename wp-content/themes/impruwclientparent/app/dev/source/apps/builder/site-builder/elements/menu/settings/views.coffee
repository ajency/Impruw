define ['app', 'text!apps/builder/site-builder/elements/menu/settings/templates/settings.html'],
		(App, settingsTpl)->

			# Headerapp views
			App.module 'SiteBuilderApp.Element.Menu.Settings.Views', (Views, App, Backbone, Marionette, $, _)->

				class Views.SettingsView extends Marionette.ItemView

					template : settingsTpl

					className : 'modal-content settings-box'

					initialize:(opt = {})->
						{@eleModel} = opt
						super opt

					# override the serializeData function for settings view
					serializeData:()->
						data = @model.toJSON()
						
						dataCloned = _.clone data
						dataCloned.templates = []
						_.each data.templates, (val, key)=>
							dataCloned.templates.push 
													name : key
													slug : _.slugify key
						dataCloned

					onRender:->
						@$el.find('input[type="checkbox"]').checkbox()
						@$el.find('input[type="radio"]').radio()
						@$el.find('select').selectpicker() 
						@setFields()

					# set fields for the form
					setFields:->
						if @eleModel.get('draggable') is true
							@$el.find('input[name="draggable"]').checkbox('check')
						if @eleModel.get('justified') is true
							@$el.find('input[name="justified"]').checkbox('check')

						@$el.find('select[name="style"]').selectpicker 'val', @eleModel.get 'style'
						@$el.find('select[name="choose-menu"]').selectpicker 'val', @eleModel.get 'menu_id'

					events:
						'click .close-settings' : (evt)-> 
											evt.preventDefault()
											App.settingsRegion.close()
						'change select[name="style"]' 		: (evt)-> @trigger "element:style:changed"		, $(evt.target).val()
						'change select[name="choose-menu"]' : (evt)-> @trigger "element:menu:changed"		, $(evt.target).val()
						'change input[name="draggable"]'	: (evt)-> @trigger "element:draggable:changed"	, $(evt.target).is(':checked')
						'change input[name="justified"]'	: (evt)-> @trigger "element:justified:changed"	, $(evt.target).is(':checked')

					