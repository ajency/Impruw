define ['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/address/settings/views'],
(App, AppController)->
    App.module 'SiteBuilderApp.Element.Address.Settings', (Settings, App, Backbone, Marionette, $, _)->

        # menu controller
        class Settings.Controller extends AppController

            # initialize controller
            initialize: (opt = {})->
                { @model } = opt
                @region = App.settingsRegion
                model = App.request "get:element:settings:options", 'Address'
                view = @_getSettingView model, @model

                @listenTo view, "element:alignment:changed", (alignment)=>
                    @model.set "align", alignment

                @listenTo view, "element:style:changed", (style)=>
                    @model.set "style", style

                @listenTo view, "element:draggable:changed", (draggable)=>
                    @model.set "draggable", draggable

                @listenTo view, "element:phone:link:changed", (phone_link)=>
                    @model.set 'phone_link', phone_link

                @listenTo view, "element:spacing:changed", (spacing, value)=>
                    @model.set spacing, value

                @show view

            # time to save model to server
            onClose: ->
                # return if not @model.hasChanged()

                @model.save null,
                    wait: true



            # get settigns view
            _getSettingView: (model, eleModel)->
                new Settings.Views.SettingsView
                    eleModel: eleModel
                    model: model


        App.vent.on "show:address:settings:popup", (model)->
            new Settings.Controller
                model: model


						

