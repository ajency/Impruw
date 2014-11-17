define ['app'
		'text!apps/builder/site-builder/elements/smarttable/settings/templates/settings.html'
],(App, settingsTpl)->

	# Headerapp views
	App.module 'SiteBuilderApp.Element.SmartTable.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
		class Views.SettingsView extends Marionette.ItemView

			template: settingsTpl

			className: 'modal-content settings-box'

			mixinTemplateHelpers : (data)->
				data = super data             	
				data.innerStyle = @getInnerStyles @eleModel.get 'style'

				data

			initialize: (opt = {})->
				{@eleModel} = opt
				super opt

			onRender: ->
				@$el.find('input[type="checkbox"]').radiocheck()
				@$el.find('select').selectpicker()
				@setFields()

			# set fields for the form
			setFields: ->
				if @eleModel.get('draggable') is true
					@$el.find('input[name="draggable"]').radiocheck('check')
				@$el.find('select[name="type"]').selectpicker 'val', @eleModel.get 'style'
				@$el.find('select[name="type"]').selectpicker 'refresh'
				@$el.find('select[name="style"]').selectpicker 'val', @eleModel.get 'innerStyle'
				@$el.find('select[name="style"]').selectpicker 'refresh'
				

			events:
				'click .close-settings': (evt)->
					evt.preventDefault()
					App.settingsRegion.close()
				'change input[name="draggable"]': (evt)->
					@trigger "element:draggable:changed", $(evt.target).is(':checked')
				'change select[name="style"]': (evt)->
					@trigger "element:inner:style:changed", $(evt.target).val()
				'change select[name="type"]': (evt)->
					@trigger "element:style:changed", $(evt.target).val()
					@populateInnerStyleDropdown $(evt.target).val()
					



			getInnerStyles : (style)->
				type = _.findWhere @model.get('styles'), 
							name : style

				type.inner_style


			populateInnerStyleDropdown : (style)->
				innerStyle = @getInnerStyles style
				options = ''
				_.each innerStyle,(stl)->
					options += "<option value='#{stl}'>#{stl}</option>"
				@$el.find('select[name="style"]').html options
				@$el.find('select[name="style"]').val 'Default'
				@$el.find('select[name="style"]').selectpicker 'refresh'