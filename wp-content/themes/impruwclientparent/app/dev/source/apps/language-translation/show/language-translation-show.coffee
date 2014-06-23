define ['app', 'controllers/base-controller'
        'apps/language-translation/show/language-translation-view'], (App, AppController)->
    
        App.module 'LanguageApp.Show', (Show, App, Backbone, Marionette, $, _)->
            
            class Show.Controller extends AppController
    
                initialize: (options)->
                    @languageLayout = @_getLanguageLayout()

                    @listenTo @languageLayout, 'show',->
                        App.execute 'show:language:selection:app',
                        	region: @languageLayout.languageSelectionRegion
                            
                        App.execute 'show:language:translation:app',
                            region: @languageLayout.languageTranslateRegion                            


                    #function to load view
                    @show @languageLayout,
                    	loading: true

                _getLanguageLayout : ->
                    new Show.Views.LanguageLayout

