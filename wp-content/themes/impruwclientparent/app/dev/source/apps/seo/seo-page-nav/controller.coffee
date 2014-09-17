define ['app', 'controllers/base-controller'
        'apps/seo/seo-page-nav/view'], (App, AppController)->
    App.module 'SeoApp.SeoPageNav', (SeoPageNav, App, Backbone, Marionette, $, _)->
        class SeoPageNav.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {language} = opts

                @language = language

                #get page collection
                @collection = collection = App.request "get:language:pages", language

                @seoPageNavView = @_getPageNavView @collection

                @listenTo @seoPageNavView, "seo:room:content", @loadSeoRoomContent
                @listenTo @seoPageNavView, "itemview:page:content", @loadSeoPageContent
                # @listenTo @languagePageNavView, "site:translate:content", @loadSiteContent

                #function to load view
                @show @seoPageNavView,
                    loading: true

            _getPageNavView : (collection)->
                new SeoPageNav.Views.SeoPageNavView
                    collection: collection

            loadSeoRoomContent : ->
                Marionette.triggerMethod.call @region, "load:seo:room:content", @language

            loadSeoPageContent : (collection, pageId) ->
                data =
                    pageId: pageId
                    language: @language

                responseFn = (response)=>
                    originalId = response.data.original_id
                    pageId = response.data.translated_id
                    Marionette.triggerMethod.call @region, "load:seo:page:content", @language, pageId

                $.post "#{AJAXURL}?action=get-language-page", data, responseFn, 'json'

            # loadSiteContent :->
            #     Marionette.triggerMethod.call @region, "load:site:content", @editingLanguage


        App.commands.setHandler "show:seo:page:nav:app", (opts) ->
            new SeoPageNav.Controller opts


