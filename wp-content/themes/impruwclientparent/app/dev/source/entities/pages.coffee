define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Pages", (Pages, App, Backbone, Marionette, $, _)->

    	#Page model
        class Pages.PageModel extends Backbone.Model
            name: 'languagpage'
            idAttribute: 'ID' 

		#Page Collection class
        class Pages.PageCollection extends Backbone.Collection

            model: Pages.PageModel

            url: ->
                AJAXURL + '?action=get-childsite-pages'   


        pages = new Pages.PageCollection 
        # pages.fetch()      

        #Public API
        API =

            getPages: (language)->
                pages.fetch
                    data:
                        language : language
                pages

            getPageByLanguage : (pageId, pageLang) ->
                pageModel = new Pages.PageModel
                pageModel.fetch
                    data:
                        action: "get-page-by-language"
                        pageId : pageId
                        pageLang : pageLang
                pageModel

            getDefaultPage:(pageId) ->
                pageModel = new Pages.PageModel
                pageModel.fetch
                    data:
                        action: "get-page-by-language"
                        pageId : pageId
                pageModel


        App.reqres.setHandler "get:language:pages", (language) ->
            API.getPages(language)

        App.reqres.setHandler "get:page:by:language", (pageid, pageLang) ->
            API.getPageByLanguage(pageid, pageLang)

        App.reqres.setHandler "get:default:page", (pageid) ->
            API.getDefaultPage(pageid)