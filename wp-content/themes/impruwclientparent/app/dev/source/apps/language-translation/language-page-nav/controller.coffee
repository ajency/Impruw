define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-nav/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageNav', (LanguagePageNav, App, Backbone, Marionette, $, _)->
        class LanguagePageNav.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->

                {language} = opts

                @editingLanguage = language

                #get page collection
                @collection = collection = App.request "get:language:pages", language

                @languagePageNavView = @_getPageNavView @collection

                @listenTo @languagePageNavView, "page:room:content", @loadLanguagePageRoomContent
                @listenTo @languagePageNavView, "itemview:page:content", @loadLanguagePageContent
                @listenTo @languagePageNavView, "site:translate:content", @loadSiteContent
                @listenTo @languagePageNavView, "header:translate:content", @loadHeaderContent
                @listenTo @languagePageNavView, "footer:translate:content", @loadFooterContent

                #function to load view
                @show @languagePageNavView,
                    loading: true

            _getPageNavView : (collection)->
                new LanguagePageNav.Views.LanguagePageNavView
                    collection: collection

            loadLanguagePageRoomContent : ->
                Marionette.triggerMethod.call @region, "load:page:room:content", @editingLanguage

            loadLanguagePageContent : (collection, originalPageId) ->
                data =
                    pageId: originalPageId
                    language: @editingLanguage

                responseFn = (response)=>
                    originalId = response.data.original_id
                    pageId = response.data.translated_id
                    Marionette.triggerMethod.call @region, "load:other:page:content", @editingLanguage, pageId, originalId

                $.post "#{AJAXURL}?action=get-language-page", data, responseFn, 'json'

            loadSiteContent :->
                Marionette.triggerMethod.call @region, "load:site:content", @editingLanguage

            loadHeaderContent :->
                Marionette.triggerMethod.call @region, "load:header:content", @editingLanguage

            loadFooterContent :->
                Marionette.triggerMethod.call @region, "load:footer:content", @editingLanguage


        App.commands.setHandler "show:language:page:nav:app", (opts) ->
            new LanguagePageNav.Controller opts

