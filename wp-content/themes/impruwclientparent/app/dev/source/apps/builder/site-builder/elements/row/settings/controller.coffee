define ['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/row/settings/views'],
(App, AppController)->
    App.module 'SiteBuilderApp.Element.Row.Settings', (Settings, App, Backbone, Marionette, $, _)->

        # menu controller
        class Settings.Controller extends AppController

            # initialize controller
            initialize: (opt = {})->
                { @model } = opt
                @region = App.dialogRegion
                model = App.request "get:element:settings:options", 'Row'
                view = @_getSettingView model, @model

                @listenTo view, "element:style:changed", (style)=>
                    @model.set "style", style

               
                @listenTo view, "element:column:count:changed", (newCount)=>
                    @model.set "columncount", newCount

                @listenTo @model, 'column:count:setting:change',(count)=>
                    view.triggerMethod 'column:count:changed', count

                @show view


            # get settigns view
            _getSettingView: (model, eleModel)->
                new Settings.Views.SettingsView
                    eleModel: eleModel
                    model: model


        App.vent.on "show:row:settings:popup", (model)->
            new Settings.Controller
                model: model


						

