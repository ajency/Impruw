define ['app', 'text!apps/builder/site-builder/elements/slider/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Slider.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
        class Views.SettingsView extends Marionette.ItemView

            template: settingsTpl

            className: 'modal-content settings-box'

            mixinTemplateHelpers : (data)->
                data = super data
                data.transitions = [{name:'Fade',value:'fade'},{name:'Slide To Left',value:'slideleft'},{name:'No Transition',value:'notransition'},
                                {name:'Fly In',value:'flyin'},{name:'Paper Cut',value:'papercut'},{name:'Slide Boxes',value:'boxslide'}]
                data

            initialize: (opt = {})->
                {@eleModel} = opt
                super opt

            onRender: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @setFields()
                @$el.find('select').selectpicker()
                

            # set fields for the form
            setFields: ->
                if @eleModel.get('draggable') is true
                    @$el.find('input[name="draggable"]').checkbox('check')
                # @$el.find('select[name="slide_transition"]').selectpicker 'val', @eleModel.get 'reset_transitions'
                # @$el.find('select[name="align"]').selectpicker 'val', @eleModel.get 'align'
                # @$el.find('select[name="top_margin"]').selectpicker 'val', @eleModel.get 'top_margin'
                # @$el.find('select[name="left_margin"]').selectpicker 'val', @eleModel.get 'left_margin'
                # @$el.find('select[name="bottom_margin"]').selectpicker 'val', @eleModel.get 'bottom_margin'
                # @$el.find('select[name="right_margin"]').selectpicker 'val', @eleModel.get 'right_margin'

                @$el.find('select[name="slide_transition"]').val @eleModel.get 'reset_transitions'
                @$el.find('select[name="align"]').val @eleModel.get 'align'
                @$el.find('select[name="top_margin"]').val @eleModel.get 'top_margin'
                @$el.find('select[name="left_margin"]').val @eleModel.get 'left_margin'
                @$el.find('select[name="bottom_margin"]').val @eleModel.get 'bottom_margin'
                @$el.find('select[name="right_margin"]').val @eleModel.get 'right_margin'

            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()
                'change select[name="slider_id"]': (evt)->
                    @trigger "element:slider_id:changed", $(evt.target).val()
                'change select[name="slide_transition"]': (evt)->
                    @trigger "element:slide:transition:changed", $(evt.target).val()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')
                'change select.spacing': (evt)->
                    @trigger "element:spacing:changed", $(evt.target).attr('name'), $(evt.target).val()