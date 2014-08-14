define ['app', 'apps/builder/site-builder/elements/languageswitcher/views'
            'apps/builder/site-builder/elements/languageswitcher/settings/controller'],
(App)->
    App.module 'SiteBuilderApp.Element.LanguageSwitcher', (LanguageSwitcher, App, Backbone, Marionette, $, _)->

        # menu controller
        class LanguageSwitcher.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                @collection = collection = App.request "get:selected:languages"

                _.defaults options.modelData,
                    element: 'LanguageSwitcher'
                    image_id: 0
                    size: 'thumbnail'
                    element: 'LanguageSwitcher'
                    style: 'Default Style'

                super(options)

            bindEvents: ->
                # start listening to model events.
                @listenTo @layout.model, "change:style", @renderElement
                super()
                    

            _getLanguageSwitcherView: (languageSwitcherModel, style)->
                new LanguageSwitcher.Views.LanguageSwitcherView
                            model: languageSwitcherModel
                            collection: @collection
                            style: style

            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                languageSwitcherModel = new Backbone.Model

                style = @layout.model.get 'style'
                collection = App.request "get:site:languageswitcher"

                App.execute "when:fetched", languageSwitcherModel, =>
                    view = @_getLanguageSwitcherView languageSwitcherModel
                    @layout.elementRegion.show view