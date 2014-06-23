define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-nav/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageNav', (LanguagePageNav, App, Backbone, Marionette, $, _)->
        class LanguagePageNav.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @languagePageNavView = @_getPageNavView()


                #function to load view
                @show @languagePageNavView,
                    loading: true

            _getPageNavView : ()->
                new LanguagePageNav.Views.LanguagePageNavView


        App.commands.setHandler "show:language:page:nav:app", (opts) ->
            new LanguagePageNav.Controller opts