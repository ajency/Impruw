define ['app', 'text!apps/builder/site-builder/elements/address/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Address.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
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

                if @eleModel.get('phone_link') is 'enable'
                    @$el.find('input[name="phone_link"]').radiocheck('check')

                @$el.find('select[name="align"]').selectpicker 'val', @eleModel.get 'align'
                @$el.find('select[name="top_margin"]').selectpicker 'val', @eleModel.get 'top_margin'
                @$el.find('select[name="left_margin"]').selectpicker 'val', @eleModel.get 'left_margin'
                @$el.find('select[name="bottom_margin"]').selectpicker 'val', @eleModel.get 'bottom_margin'
                @$el.find('select[name="right_margin"]').selectpicker 'val', @eleModel.get 'right_margin'

                alignClass = @eleModel.get 'align'
                btnName = '.js-btn-'+alignClass
                @$el.find(btnName).addClass 'aj-imp-orange-btn'

            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()
                'change select[name="style"]': (evt)->
                    @trigger "element:style:changed", $(evt.target).val()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')

                'change input[name="phone_link"]': (evt)->
                    enabled = if $(evt.target).is(':checked') then 'enable' else 'disable'
                    @trigger "element:phone:link:changed", enabled
                'change select.spacing': (evt)->
                    @trigger "element:spacing:changed", $(evt.target).attr('name'), $(evt.target).val()

                'click .js-btn-left': (evt)->
                    evt.preventDefault()
                    # add left button the orange class if not present
                    @$el.find('.js-btn-left').removeClass("aj-imp-orange-btn").addClass("aj-imp-orange-btn").blur()
                    @$el.find('.js-btn-center').removeClass("aj-imp-orange-btn")
                    @$el.find('.js-btn-right').removeClass("aj-imp-orange-btn")

                    @trigger "element:alignment:changed", $(evt.target).val()

                'click .js-btn-center': (evt)->
                    evt.preventDefault()

                    @$el.find('.js-btn-center').removeClass("aj-imp-orange-btn").addClass("aj-imp-orange-btn").blur()
                    @$el.find('.js-btn-left').removeClass("aj-imp-orange-btn")
                    @$el.find('.js-btn-right').removeClass("aj-imp-orange-btn")

                    @trigger "element:alignment:changed", $(evt.target).val()

                'click .js-btn-right': (evt)->
                    evt.preventDefault()

                    @$el.find('.js-btn-right').removeClass("aj-imp-orange-btn").addClass("aj-imp-orange-btn").blur()
                    @$el.find('.js-btn-left').removeClass("aj-imp-orange-btn")
                    @$el.find('.js-btn-center').removeClass("aj-imp-orange-btn")

                    @trigger "element:alignment:changed", $(evt.target).val()
