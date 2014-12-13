define ['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/spacer/settings/views'],
(App, AppController)->
    App.module 'SiteBuilderApp.Element.Spacer.Settings', (Settings, App, Backbone, Marionette, $, _)->

        # menu controller
        class Settings.Controller extends AppController

            # initialize controller
            initialize: (opt = {})->
                { @model } = opt
                @region = App.settingsRegion
                model = App.request "get:element:settings:options", 'Spacer'
                console.log model
                view = @_getSettingView model, @model

                @listenTo view, "element:type:changed", (type)=>
                    
                    @model.set "type", type
                    @model.set 'style', 'default'

                    # if type is 'Blank'
                    #     @model.set "style", 'Default'

                    # type = _.slugify type
                    view.triggerMethod "type:#{type}"


                @listenTo view, "element:style:changed", (style)=>
                    @model.set "style", style

                @listenTo view, "element:draggable:changed", (draggable)=>
                    @model.set "draggable", draggable

                @listenTo view, "element:spacing:changed", (spacing, value)=>
                    @model.set spacing, value

                @show view

            # time to save model to server
            onClose: ->
                return if not @model.hasChanged()

                @model.save null,
                    wait: true



            # get settigns view
            _getSettingView: (model, eleModel)->
                new Settings.Views.SettingsView
                    eleModel: eleModel
                    model: model


        App.vent.on "show:spacer:settings:popup", (model)->
            new Settings.Controller
                model: model


						

