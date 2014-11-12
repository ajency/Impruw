define ['app', 'text!apps/builder/site-builder/elements/logo/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Logo.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
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

                @$el.find('select[name="top_margin"]').selectpicker 'val', @eleModel.get 'top_margin'
                @$el.find('select[name="left_margin"]').selectpicker 'val', @eleModel.get 'left_margin'
                @$el.find('select[name="bottom_margin"]').selectpicker 'val', @eleModel.get 'bottom_margin'
                @$el.find('select[name="right_margin"]').selectpicker 'val', @eleModel.get 'right_margin'

            #@$el.find('select[name="style"]').selectpicker 'val',@eleModel.get 'style'


            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.empty()
            #'change select[name="style"]' 	:(evt)-> @trigger "element:style:changed", $(evt.target).val()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')
                'change select.spacing': (evt)->
                    @trigger "element:spacing:changed", $(evt.target).attr('name'), $(evt.target).val()