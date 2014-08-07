define [ "app", 'backbone' ], ( App, Backbone ) ->
    App.module "Entities.Pages", ( Pages, App, Backbone, Marionette, $, _ )->

        # Page Model
        class Pages.PageModel extends Backbone.Model

            # defaults for
            defaults : ->
                post_title : ''

            name : 'page'

            idAttribute : 'ID'


        # Page collection
        class Pages.PageCollection extends Backbone.Collection

            # model
            model : Pages.PageModel

            url : ->
                "#{AJAXURL}?action=get-pages"

            parse : ( resp )->
                return resp.data if resp.code is 'OK'
                resp

        pages = new Pages.PageCollection
        pages.fetch
            reset : true

        # PUBLIC API FOR ENitity
        API =
            getPagesCollection : ->
                new Pages.PageCollection

            getPages : ->
                pages

            createNewPage : ( data = {} )->
                page = new Pages.PageModel data
                page

            getPageModelById : ( pageId )->
                pageModel = new Pages.PageModel 'ID' : parseInt pageId
                pageModel.fetch
                    data :
                        'ID' : pageId
                        'action' : 'read-page'
                pageModel

        # REQUEST HANDLERS
        App.reqres.setHandler "get:editable:pages", ->
            API.getPages()

        App.reqres.setHandler "get:fetched:page", (id)->
            page = pages.get id
            page


        App.reqres.setHandler "create:page:model", ( data )->
            API.createNewPage data

        App.reqres.setHandler "get:page:model:by:id", ( pageId )->
            API.getPageModelById pageId

        App.reqres.setHandler "get:pages:collection", ->
            API.getPagesCollection()