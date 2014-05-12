define ['app', 'controllers/base-controller'
        'apps/language/show/languageviews'], (App, AppController)->
    
        App.module 'LanguageApp.Show', (Show, App, Backbone, Marionette, $, _)->
            
            class Show.Controller extends AppController
    
                initialize: (options)->

                    @languageView = @_getLanguageView()

                    @show @languageView

                _getLanguageView :->
                    new Show.Views.LanguageView

    
    
