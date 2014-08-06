define ['app', 'controllers/base-controller'
        'apps/language-translation/language-site-details/show/view'
        'apps/language-translation/language-site-details/original-address-content/controller'], (App, AppController)->
    App.module 'LanguageApp.LanguageSiteContent', (LanguageSiteContent, App, Backbone, Marionette, $, _)->
        class LanguageSiteContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @editLang = opts.editLang

                @languageSiteContentLayout = @_getSiteContentLayout()

                #Make page content div visible after the room content app is executed
                $('.aj-imp-widget-content').show()

                #function to load view
                @show @languageSiteContentLayout,
                    loading: true


                @listenTo @languageSiteContentLayout, 'show',=>
                    App.execute "original:address:app",
                        region: @languageSiteContentLayout.originalSiteContent,
                        editLang : @editLang

                    App.execute "translated:address:app",
                        region: @languageSiteContentLayout.translatedSiteContent,
                        editLang : @editLang

            _getSiteContentLayout : ->
                new LanguageSiteContent.Views.LanguageSiteContentLayout


        App.commands.setHandler "show:site:content:app", (opts = {}) ->
            new LanguageSiteContent.Controller opts