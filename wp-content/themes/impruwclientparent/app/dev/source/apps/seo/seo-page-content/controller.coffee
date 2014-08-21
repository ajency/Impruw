define ['app', 'controllers/base-controller'
        'apps/seo/seo-page-content/view'], (App, AppController)->
    App.module 'SeoApp.SeoPageContent', (SeoPageContent, App, Backbone, Marionette, $, _)->
        class SeoPageContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @language = opts.language

                #get page seo collection
                @seomodel = App.request "get:site:model"

                @seoPageContentView = @_getPageContentView @seomodel

                #function to load view
                @show @seoPageContentView,
                    loading: true

            _getPageContentView :(model) ->
                new SeoPageContent.Views.SeoPageContentView
                	model: model


        App.commands.setHandler "show:seo:page:content:app", (opts = {}) ->
            new SeoPageContent.Controller opts
