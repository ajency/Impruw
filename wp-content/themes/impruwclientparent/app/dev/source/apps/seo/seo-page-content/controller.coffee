define ['app', 'controllers/base-controller'
        'apps/seo/seo-page-content/view'], (App, AppController)->
    App.module 'SeoApp.SeoPageContent', (SeoPageContent, App, Backbone, Marionette, $, _)->
        class SeoPageContent.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @language = opts.language

                #get page seo collection
                @seomodel = App.request "get:seo:model", @pageId

                @seoPageContentView = @_getPageContentView @seomodel

                @listenTo @seoPageContentView, "page:seo:save", @pageSeoSave

                #function to load view
                @show @seoPageContentView,
                    loading: true

            _getPageContentView :(model) ->
                new SeoPageContent.Views.SeoPageContentView
                	model: model
            
            pageSeoSave:(newSeoTitle ,newSeoDesc, newSeoKeywords)->
                data= []
                data['seo_title'] = newSeoTitle
                data['meta_description'] = newSeoDesc
                @seomodel.set data
                @seomodel.save null,
                    wait : true
                    onlyChanged : true
                    success : @pageSeoUpdated

            pageSeoUpdated :(model, response) =>
                @seoPageContentView.triggerMethod "page:seo:updated"            


        App.commands.setHandler "show:seo:page:content:app", (opts = {}) ->
            new SeoPageContent.Controller opts
