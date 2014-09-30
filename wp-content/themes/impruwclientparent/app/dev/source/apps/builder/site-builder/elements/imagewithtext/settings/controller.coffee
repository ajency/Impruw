define ['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/imagewithtext/settings/views'],
(App, AppController)->
    App.module 'SiteBuilderApp.Element.ImageWithText.Settings', (Settings, App, Backbone, Marionette, $, _)->

        # menu controller
        class Settings.Controller extends AppController

            # initialize controller
            initialize: (opt = {})->
                { @model } = opt
                @region = App.settingsRegion
                model = App.request "get:element:settings:options", 'ImageWithText'
                view = @_getSettingView model, @model

                @listenTo view, "element:style:changed", (style)=>
                    @model.set "style", style

                @listenTo view, "element:draggable:changed", (draggable)=>
                    @model.set "draggable", draggable

                @listenTo view, "element:linkcheck:changed", (link_check)=>
                    @model.set "link_check", link_check

                @listenTo view, "element:alignment:changed", (alignment)=>
                    @model.set "align", alignment

                @listenTo view, "element:link:changed", (link)=>
                    @model.set "link", link
                @listenTo view, "element:target:changed", (target)=>
                    @model.set "target", target

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


        App.vent.on "show:imagewithtext:settings:popup", (model)->
            new Settings.Controller
                model: model


						

