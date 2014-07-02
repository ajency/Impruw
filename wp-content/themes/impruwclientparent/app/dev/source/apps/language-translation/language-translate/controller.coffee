define ['app', 'controllers/base-controller'
        'apps/language-translation/language-translate/view'], (App, AppController)->
    App.module 'LanguageApp.LanguageTranslate', (LanguageTranslate, App, Backbone, Marionette, $, _)->
        class LanguageTranslate.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @languageTranslateView = @_getLanguageView()


                #function to load view
                @show @languageTranslateView,
                    loading: true

            _getLanguageView : (languageSetting)->
                new LanguageTranslate.Views.LanguageTranslateView


        App.commands.setHandler "show:language:translation:app", (opts) ->
            new LanguageTranslate.Controller opts
