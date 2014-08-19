define ['app'
        'controllers/base-controller'
        'apps/builder/site-builder/elements/widget/settings/views'
],(App, AppController)->
    App.module 'SiteBuilderApp.Element.Widget.Settings', (Settings, App, Backbone, Marionette, $, _)->

        # menu controller
        class Settings.Controller extends AppController

            # initialize controller
            initialize: (opt = {})->
                { @model } = opt
                @region = App.settingsRegion
                model = App.request "get:element:settings:options", 'Widget'
                view = @_getSettingView model, @model

                @listenTo view, "element:style:changed", (style)=>
                    @model.set "style", style

                @listenTo view, "element:draggable:changed", (draggable)=>
                    @model.set "draggable", draggable

                @listenTo view, 'element:type:changed',(type)=>
                    @model.set 'type',type

                @listenTo view, 'widget:code:changed',(code)=>
                    @model.set 'widgetCode', _.stripslashes code

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


        App.vent.on "show:widget:settings:popup", (model)->
            new Settings.Controller
                model: model


						

