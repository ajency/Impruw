define ['app'
        'text!apps/builder/site-builder/elements/table/settings/templates/settings.html'
],(App, settingsTpl)->

    # Headerapp views
    App.module 'SiteBuilderApp.Element.Table.Settings.Views', (Views, App, Backbone, Marionette, $, _)->
        class Views.SettingsView extends Marionette.ItemView

            template: settingsTpl

            className: 'modal-content settings-box'

            mixinTemplateHelpers : (data)->
                data = super data
                data.column = @eleModel.get 'column'
                data.row = @eleModel.get 'row'
                data

            events:
                'click .close-settings': (evt)->
                    evt.preventDefault()
                    App.settingsRegion.close()
                'change input[name="draggable"]': (evt)->
                    @trigger "element:draggable:changed", $(evt.target).is(':checked')

                'click .spinner .btn:first-of-type' : 'increaseCount'
                'click .spinner .btn:last-of-type' : 'decreaseCount'
                'blur .spinner input' : 'changeCount'
                'change #checkbox-bordered' : 'changeBordered'
                'change #checkbox-striped' : 'changeStriped'
                'change #table-style' : 'changeStyle'

            initialize: (opt = {})->
                {@eleModel} = opt

                @listenTo @eleModel,'change:row',@changeRowCount
                @listenTo @eleModel,'change:column',@changeColCount

                super opt

            onRender: ->
                @setFields()
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()
                

           

            # set fields for the form
            setFields: ->
                
                @$el.find('input[name="draggable"]').checkbox('check') if @eleModel.get('draggable')

                @$el.find('#checkbox-bordered').prop 'checked', @eleModel.get('bordered')
                @$el.find('#checkbox-striped').prop 'checked', @eleModel.get('striped')
                @$el.find('#table-style').val @eleModel.get 'style' 


            changeCount:(evt)->
                count = parseInt $(evt.target).closest('.spinner').find('input').val()
                if _.isNumber(count) and count > 0
                    @eleModel.set 'column', count if $(evt.target).closest('.spinner').hasClass 'column-spinner'
                    @eleModel.set 'row', count if $(evt.target).closest('.spinner').hasClass 'row-spinner'

            increaseCount : (evt)->
                evt.stopPropagation()

                count = parseInt($(evt.target).closest('.spinner').find('input').val(),10)              
                count++

                $(evt.target).closest('.spinner').find('input').val count
                @eleModel.set 'column', count if $(evt.target).closest('.spinner').hasClass 'column-spinner'
                @eleModel.set 'row', count if $(evt.target).closest('.spinner').hasClass 'row-spinner'


            decreaseCount : (evt)->
                evt.stopPropagation()
                count = parseInt($(evt.target).closest('.spinner').find('input').val(),10)
                count--

                if count > 0
                    $(evt.target).closest('.spinner').find('input').val count
                    @eleModel.set 'column', count if $(evt.target).closest('.spinner').hasClass 'column-spinner'
                    @eleModel.set 'row', count if $(evt.target).closest('.spinner').hasClass 'row-spinner'

            changeRowCount :(model,row)->
                @$el.find('.row-spinner input').val row

            changeColCount : (model,column)->
                @$el.find('.column-spinner input').val column

            changeBordered : (e)->
                if $(e.target).prop 'checked'
                    @eleModel.set 'bordered',true
                else
                    @eleModel.set 'bordered',false

            changeStriped : (e)->
                if $(e.target).prop 'checked'
                    @eleModel.set 'striped',true
                else
                    @eleModel.set 'striped',false

            changeStyle : (e)->
                @eleModel.set 'style', _.slugify $(e.target).val()


