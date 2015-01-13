define ['app'
		'text!apps/builder/site-builder/elements/list/settings/templates/settings.html'
],(App, settingsTpl)->

	# Headerapp views
	App.module 'SiteBuilderApp.Element.List.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
		class Views.SettingsView extends Marionette.ItemView

			template: settingsTpl

			className: 'modal-content settings-box'

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
				@$el.find('select[name="style"]').selectpicker 'val', @eleModel.get 'style'
				@$el.find('select[name="style"]').selectpicker 'refresh'
				@$el.find(".align-btn button[value='#{@eleModel.get('align')}']").addClass 'aj-imp-orange-btn'
				
				

			events:
				'click .close-settings': (evt)->
					evt.preventDefault()
					App.settingsRegion.close()
				'change input[name="draggable"]': (evt)->
					@trigger "element:draggable:changed", $(evt.target).is(':checked')
				
				'change select[name="style"]': (evt)->
					@trigger "element:style:changed", $(evt.target).val()

				'click .align-btn button' : (e)->
					e.stopPropagation()
					e.preventDefault()
					@$el.find('.align-btn button').removeClass 'aj-imp-orange-btn'
					$(e.target).addClass 'aj-imp-orange-btn'
					@trigger 'element:align:changed',$(e.target).val()
					



		