define ['app', 'text!apps/builder/site-builder/elements/row/settings/templates/settings.html'],
(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Row.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
        class Views.SettingsView extends Marionette.ItemView

            template: settingsTpl

            className: ''

            mixinTemplateHelpers : (data)->
                data = super data
                data.THEMEURL = THEMEURL
                data.CURRENTTHEMEURL = CURRENTTHEMEURL
                toRemove = []
                _.each data.styles, (style)->
                    style.slug = _.slugify style.name
                    if _.contains style.hide , CURRENTTHEMENAME
                        toRemove.push style
                data.styles = _.difference data.styles, toRemove

                data

            initialize: (opt = {})->
                {@eleModel} = opt
                if @eleModel.get('style') is ''
                    @eleModel.set 'style', 'Default'
                super opt

            
            dialogOptions:
                modal_title: _.polyglot.t 'Pick a Row Style'
                modal_size: 'wide-modal'


            onShow : ->
                @$el.find(".col-item[data-col='#{@eleModel.get('columncount')}'] ").addClass 'ui-selected'
                @$el.find(".single-item[data-style='#{@eleModel.get('style')}'] ").addClass 'ui-selected'
                

            onRender: ->
                @$el.find('.set-column-count').selectable
                    cancel : '.ui-selected'
                    filter: ".col-item"
                    selected : (event, ui)=>
                        @trigger "element:column:count:changed", $(ui.selected).attr 'data-col'
  
                @$el.find('.style-select').selectable
                    cancel : '.ui-selected'
                    filter: ".single-item"
                    selected : (event, ui)=>
                        @trigger "element:style:changed", $(ui.selected).attr 'data-style'

                @$el.find('input[type="checkbox"]').radiocheck()
                @$el.find('select').selectpicker()
                @$el.find(".set-column-count a.btn.#{@eleModel.get('columncount')}-col").addClass 'selected'
                @setFields()

            # set fields for the form
            setFields: ->
                if @eleModel.get('draggable') is true
                    @$el.find('input[name="draggable"]').radiocheck('check')

                @$el.find('select[name="style"]').selectpicker 'val', @eleModel.get 'style'


            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.empty()
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
                if count isnt parseInt @$el.find('.col-item.ui-selected').attr 'data-col'
                    @$el.find('.col-item.ui-selected').removeClass('ui-selected')
                    @$el.find(".col-item[data-col='#{count}'] ").addClass 'ui-selected'
