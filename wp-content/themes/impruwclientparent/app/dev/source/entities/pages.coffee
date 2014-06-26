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

        pageModel = new Pages.PageModel 
        pages = new Pages.PageCollection 
        # pages.fetch()      

        #Public API
        API =

            getPages: (language)->
                pages.fetch
                    data:
                        language : language
                pages


        App.reqres.setHandler "get:language:pages", (language) ->
            API.getPages(language)             	