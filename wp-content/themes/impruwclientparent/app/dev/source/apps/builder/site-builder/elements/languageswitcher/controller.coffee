define ['app', 'apps/builder/site-builder/elements/languageswitcher/views'],
(App)->
    App.module 'SiteBuilderApp.Element.LanguageSwitcher', (LanguageSwitcher, App, Backbone, Marionette, $, _)->

        # menu controller
        class LanguageSwitcher.Controller extends App.SiteBuilderApp.Element.Controller

            # intializer
            initialize: (options)->
                _.defaults options.modelData,
                    element: 'LanguageSwitcher'
                    image_id: 0
                    size: 'thumbnail'

                super(options)

            _getLanguageSwitcherView: (languageSwitcherModel)->
                new LanguageSwitcher.Views.LanguageSwitcherView
                            model: languageSwitcherModel

            # setup templates for the element
            renderElement: ()=>
                @removeSpinner()
                languageSwitcherModel = new Backbone.Model

                App.execute "when:fetched", languageSwitcherModel, =>
                    view = @_getLanguageSwitcherView languageSwitcherModel
                    @layout.elementRegion.show view