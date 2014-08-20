define ['app', 'controllers/base-controller', 'apps/builder/site-builder/elements/link/settings/views'],
(App, AppController)->
    App.module 'SiteBuilderApp.Element.Link.Settings', (Settings, App, Backbone, Marionette, $, _)->

        # menu controller
        class Settings.Controller extends AppController

            # initialize controller
            initialize: (opt = {})->
                { @model } = opt
                @region = App.settingsRegion
                model = App.request "get:element:settings:options", 'Link'
                view = @_getSettingView model, @model

                @listenTo view, "element:style:changed", (style)=>
                    @model.set "style", style
                @listenTo view, "element:draggable:changed", (draggable)=>
                    @model.set "draggable", draggable
                @listenTo view, "element:link:changed", (link)=>
                    @model.set "link", link
                @listenTo view, "element:text:changed", (text)=>
                    #get original data
                    original_data =  @model.get('text')
                    
                    if _.isObject original_data
                        textdata = original_data
                    else
                        textdata = {}
                        textdata['en'] = original_data

                    textdata[WPML_DEFAULT_LANG] = text

                    @model.set "text", textdata

                @listenTo view, "element:target:changed", (target)=>
                    @model.set "target", target

                @show view


            # get settigns view
            _getSettingView: (model, eleModel)->
                new Settings.Views.SettingsView
                    eleModel: eleModel
                    model: model

            # time to save model to server
            onClose: ->
                # return if not @model.hasChanged()
                @model.save null,
                    wait: true


        App.vent.on "show:link:settings:popup", (model)->
            new Settings.Controller
                model: model