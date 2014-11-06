define ['app', 'text!apps/builder/site-builder/elements/spacer/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Spacer.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
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

                # @$el.find('select[name="align"]').selectpicker 'val', @eleModel.get 'align'
                @$el.find('select[name="top_margin"]').selectpicker 'val', @eleModel.get 'top_margin'
                @$el.find('select[name="left_margin"]').selectpicker 'val', @eleModel.get 'left_margin'
                @$el.find('select[name="bottom_margin"]').selectpicker 'val', @eleModel.get 'bottom_margin'
                @$el.find('select[name="right_margin"]').selectpicker 'val', @eleModel.get 'right_margin'

                @$el.find('select[name="type"]').selectpicker('val', @eleModel.get('type')).selectpicker('refresh')
                @$el.find('select[name="style"]').selectpicker('val', @eleModel.get('style')).selectpicker('refresh')
                # type = _.slugify @eleModel.get 'type'
                # @triggerMethod "type:#{type}"

            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()

                'change select[name="type"]': (evt)->
                    # @$el.find('select[name="style"]').selectpicker('val', 'Default').selectpicker('refresh')
                    @trigger "element:type:changed", $(evt.target).val()
                'change select[name="style"]': (evt)->
                    @trigger "element:style:changed", $(evt.target).val()


                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')
                'change select.spacing': (evt)->
                    @trigger "element:spacing:changed", $(evt.target).attr('name'), $(evt.target).val()

            onTypeBlank : ->
                # @$el.find('select[name="style"]').selectpicker 'hide'
                @$el.find('.style, .prim-colors , .sec-colors').hide()

            onTypeLine : ->
                @$el.find(' .sec-colors').hide()
                @$el.find('.style, .prim-colors ').show()
                # @$el.find('select[name="style"]').selectpicker 'show'

            onTypePattern : ->
                @$el.find('.style, .prim-colors , .sec-colors').show()
                # @$el.find('select[name="style"]').selectpicker 'show'