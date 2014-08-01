define ['app', 'text!apps/builder/site-builder/elements/link/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Link.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
        class Views.SettingsView extends Marionette.ItemView

            template: settingsTpl

            className: 'modal-content settings-box'

            initialize: (opt = {})->
                {@eleModel} = opt
                super opt

            onRender: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()
                @setFields()

            # set fields for the form
            setFields: ->
                if @eleModel.get('draggable') is true
                    @$el.find('input[name="draggable"]').checkbox 'check'

                if @eleModel.get('target') is '_BLANK'
                    @$el.find('input[name="target"]').checkbox 'check'

                _.each ['link', 'text'], (field, i)=>
                    @$el.find("input[name='#{field}']").val @eleModel.get field

                @$el.find('select[name="style"]').selectpicker 'val', @eleModel.get 'style'

            # events
            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    if @$el.find('form').valid()
                        App.settingsRegion.close()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')
                'change select[name="style"]': (evt)->
                    @trigger "element:style:changed", $(evt.target).val()
                'blur input.linktext': (evt)->
                    if $(evt.target).valid()
                        name = $(evt.target).attr 'name'
                        @trigger "element:#{name}:changed", $(evt.target).val()
                'change input[name="target"]': (evt)->
                    @trigger "element:target:changed", if $(evt.target).is(':checked') then '_BLANK' else '_self'

            onBeforeClose: ->
                #trigger blur events so that the model gets updated
                @$el.find('input.linktext').trigger 'blur'
                # this is important because this event is triggered to prevent the view from being closed
                # the view needs to be closed but just trigger the blur events so that the element view is
                # updated
                return true