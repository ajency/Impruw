define ['app', 'text!apps/builder/site-builder/elements/row/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Row.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
        class Views.SettingsView extends Marionette.ItemView

            template: settingsTpl

            className: 'modal-content settings-box'

            initialize: (opt = {})->
                {@eleModel} = opt
                super opt

            onRender: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()
                @$el.find(".set-column-count a.btn.#{@eleModel.get('columncount')}-col").addClass 'selected'
                @setFields()

            # set fields for the form
            setFields: ->
                if @eleModel.get('draggable') is true
                    @$el.find('input[name="draggable"]').checkbox('check')

                @$el.find('select[name="style"]').selectpicker 'val', @eleModel.get 'style'


            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()
                'click .set-column-count a.btn': (evt)->
                    evt.stopPropagation()
                    @$el.find('.set-column-count a.btn').removeClass('selected')
                    $(evt.target).addClass 'selected'
                    @trigger "element:column:count:changed", parseInt $(evt.target).text()
                'change select[name="style"]': (evt)->
                    @trigger "element:style:changed", $(evt.target).val()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')

            onColumnCountChanged: (count)=>
                if count isnt parseInt @$el.find('.set-column-count a.btn.selected').text()
                    @$el.find('.set-column-count a.btn').removeClass('selected')
                    @$el.find(".set-column-count a.btn.#{count}-col").addClass 'selected'