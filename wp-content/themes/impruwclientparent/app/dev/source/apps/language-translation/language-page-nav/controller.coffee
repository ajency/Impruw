define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-nav/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageNav', (LanguagePageNav, App, Backbone, Marionette, $, _)->
        class LanguagePageNav.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {language} = opts

                #get page collection
                @collection = collection = App.request "get:all:pages", language

                @languagePageNavView = @_getPageNavView @collection


                #function to load view
                @show @languagePageNavView,
                    loading: true

            _getPageNavView : (collection)->
                new LanguagePageNav.Views.LanguagePageNavView
                    collection: collection 


        App.commands.setHandler "show:language:page:nav:app", (opts) ->
            new LanguagePageNav.Controller opts
