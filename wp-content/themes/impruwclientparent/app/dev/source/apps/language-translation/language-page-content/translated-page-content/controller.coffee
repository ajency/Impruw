define ['app', 'controllers/base-controller'
        'apps/language-translation/language-page-content/translated-page-content/view'], (App, AppController)->
    App.module 'LanguageApp.LanguagePageContent.TranslatedPage', (TranslatedPage, App, Backbone, Marionette, $, _)->

        class TranslatedPage.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                @pageId = opts.pageId
                @editLang = opts.editLang
                @originalId = opts.originalId

                #get page collection
                @pageModel =  App.request "get:page:by:language" , @pageId , @editLang

                #get page element collection

                @pageElementsCollection = App.request "get:page:elements" , @originalId

                @translatedContentView = @_getLanguageView @pageModel , @pageElementsCollection

                @listenTo @translatedContentView, "translated:page:title:updated", @updateTranslatedPageTitle
                @listenTo @translatedContentView, "itemview:page:element:updated", @updatePageElementContent

                #function to load view
                @show @translatedContentView,
                    loading: true

            _getLanguageView :(model, collection)->
                new TranslatedPage.Views.TranslatedPageView
                    model:model
                    collection: collection
                    language: @editLang

            updateTranslatedPageTitle:(newPageTitle, pageId)->
                data= []
                data['translatedPageTitle'] = newPageTitle
                data['translatedPageID'] = pageId
                @pageModel.set data
                # AJAX
                $.post "#{AJAXURL}?action=update-translated-page-title",
                    (
                        page_title : newPageTitle
                        page_id : pageId
                    ), @pageTitleUpdated, 'json'

            @pageTitleUpdated:(response) =>
                @translatedContentView.triggerMethod "page:title:updated"

            updatePageElementContent :(view, newElemContent)->

                model = view.model
                
                if model.get('element') is 'Link'
                    content_text = 'text'
                else
                    content_text = 'content'

                translatedContent = model.get content_text

                if _.isObject translatedContent
                    data = {}
                    Object.getOwnPropertyNames(translatedContent).forEach (val, idx, array) ->
                        data[val] = _.stripslashes translatedContent[val]
                else
                    data = {}
                    data['en'] = _.stripslashes translatedContent
                    data['nb'] = _.stripslashes translatedContent

                editLang = @editLang
                data[editLang] = newElemContent
                
                model.set content_text, data
                model.set 'source', 'dashboard'
                model.save null,
                    wait: true
                    success: @contentUpdated

            @contentUpdated :->
                console.log "Successfully updated content"

        App.commands.setHandler "translated:page:content:app", (opts) ->
            new TranslatedPage.Controller opts