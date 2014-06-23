define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent', (LanguagePageContent, App, Backbone, Marionette, $, _)->
        class LanguagePageContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @languagePageContentView = @_getPageContentView()


                #function to load view
                @show @languagePageContentView,
                    loading: true

            _getPageContentView : ()->
                new LanguagePageContent.Views.LanguagePageContentView


        App.commands.setHandler "show:language:page:content:app", (opts) ->
            new LanguagePageContent.Controller opts