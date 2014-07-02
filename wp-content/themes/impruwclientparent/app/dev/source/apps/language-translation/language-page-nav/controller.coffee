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
                console.log "Collection of all pages ",collection

                @languagePageNavView = @_getPageNavView @collection

                @listenTo @languagePageNavView, "itemview:page:room:content", @loadLanguagePageRoomContent
                @listenTo @languagePageNavView, "itemview:page:content", @loadLanguagePageContent

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
                    pageId = response.data
                    Marionette.triggerMethod.call @region, "load:other:page:content", @editingLanguage, pageId

                $.post "#{AJAXURL}?action=get-language-page", data, responseFn, 'json'


        App.commands.setHandler "show:language:page:nav:app", (opts) ->
            new LanguagePageNav.Controller opts

