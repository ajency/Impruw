define ['app'
        'text!apps/builder/site-builder/elements/tabs/settings/templates/settings.html'
],(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Tabs.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
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
                if @eleModel.get('justified') is true
                    @$el.find('input[name="justified"]').radiocheck('check')

                @$el.find('select[name="style"]').selectpicker('val', @eleModel.get('style')).selectpicker 'refresh'

            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')
                'change input[name="justified"]': (evt)->
                    @trigger "element:justified:changed", $(evt.target).is(':checked')

                'change select[name="style"]': (evt)->
                    @trigger "element:style:changed", $(evt.target).val()