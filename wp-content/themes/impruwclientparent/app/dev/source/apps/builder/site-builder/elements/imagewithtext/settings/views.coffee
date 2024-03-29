define ['app', 'text!apps/builder/site-builder/elements/imagewithtext/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.ImageWithText.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
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
                if @eleModel.get('link_check') is true
                    @$el.find('input[name="link_check"]').radiocheck('check')
                if @eleModel.get('target') is '_BLANK'
                    @$el.find('input[name="target"]').radiocheck 'check'
                
                @$el.find("input[name='link']").val @eleModel.get 'link'  


                if @eleModel.get('draggable') is true
                    @$el.find('input[name="draggable"]').radiocheck('check')

                @$el.find('select[name="align"]').selectpicker 'val', @eleModel.get 'align'


            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()
                'change select[name="style"]': (evt)->
                    @trigger "element:style:changed", $(evt.target).val()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')
                'change input[name="link_check"]': (evt)->
                    @trigger "element:linkcheck:changed", $(evt.target).is(':checked')
                'change select[name="align"]': (evt)->
                    @trigger "element:alignment:changed", $(evt.target).val()
                'change input[name="target"]': (evt)->
                    @trigger "element:target:changed", if $(evt.target).is(':checked') then '_BLANK' else '_self'
                'blur input.linktext': (evt)->
                    if $(evt.target).val().substring(0, 7) isnt "http://" and $(evt.target).val().substring(0, 8) isnt "https://"  and $(evt.target).val().substring(0, 2) isnt "//"
                        $(evt.target).val "http://" + $(evt.target).val()
                    @trigger "element:link:changed", $(evt.target).val()

             onBeforeClose: ->
                #trigger blur events so that the model gets updated
                @$el.find('input.linktext').trigger 'blur'
                # this is important because this event is triggered to prevent the view from being closed
                # the view needs to be closed but just trigger the blur events so that the element view is
                # updated
                return true