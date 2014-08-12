define ['app', 'controllers/base-controller'
        'apps/language/show/languageviews'], (App, AppController)->
    
        App.module 'LanguageApp.Show', (Show, App, Backbone, Marionette, $, _)->
            
            class Show.Controller extends AppController
    
                initialize: (options)->

                    @languageView = @_getLanguageView()

                    # trigger set:active:menu event
                    App.vent.trigger "set:active:menu", 'language'

                    @show @languageView

                _getLanguageView :->
                    new Show.Views.LanguageView

    
    
