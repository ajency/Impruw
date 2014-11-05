define ['app'
        'text!apps/builder/site-builder/elements/widget/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Widget.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
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
                @$el.find('select[name="type"]').selectpicker 'val', @eleModel.get 'type'
                @$el.find('textarea[name="widgetCode"]').val  @eleModel.get 'widgetCode'

            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')
                'change select[name="style"]': (evt)->
                    @trigger "element:style:changed", $(evt.target).val()
                'change select[name="type"]' : (evt)->
                    @trigger "element:type:changed", $(evt.target).val()

                'blur textarea[name="widgetCode"]' :(evt)->
                    @trigger 'widget:code:changed',$(evt.target).val()