define ['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/title/settings/views'],
(App, AppController)->
    App.module 'SiteBuilderApp.Element.Title.Settings', (Settings, App, Backbone, Marionette, $, _)->

        # menu controller
        class Settings.Controller extends AppController

            # initialize controller
            initialize: (opt = {})->
                { @model } = opt
                @region = App.settingsRegion
                model = App.request "get:element:settings:options", 'Title'
                view = @_getSettingView model, @model

                @listenTo view, "element:style:changed", (style)=>
                    @model.set "style", style

                @listenTo view, "element:draggable:changed", (draggable)=>
                    @model.set "draggable", draggable

                @show view


            # get settigns view
            _getSettingView: (model, eleModel)->
                new Settings.Views.SettingsView
                    eleModel: eleModel
                    model: model

            # time to save model to server
            onClose: ->
                return if not @model.hasChanged()

                @model.save null,
                    wait: true


        App.vent.on "show:title:settings:popup", (model)->
            new Settings.Controller
                model: model


						

