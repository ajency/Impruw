define ["app", 'backbone','jquery'], (App, Backbone, $) ->

    App.module "Entities.SiteBuilderJSON", (SiteBuilderJSON, App, Backbone, Marionette, $, _)->
        
        class PageJson extends Backbone.Model

            idAttribute: 'page_id'

            name: 'page-json'

            initialize : ->
                @lock = false

            url: ->
                pageId = @get 'page_id'
                revisionId = @get 'revision_id'
                "#{AJAXURL}?action=read-page-json&page_id=#{pageId}&revision_id=#{revisionId}"

            sync: (method, model, options)->
                params =
                    url: @url()
                    type: "GET"
                    dataType: "json"

                params = _.extend(params, options)

                xhr = Backbone.ajax params

                model._fetch = xhr

                xhr

            parse : (resp)->
                if resp.lock isnt true
                    window.lockValue = resp.lock
                    if @locked is true
                        eventData = {}
                        eventData['wp-refresh-post-lock'] = 'new_lock': resp.lock
                        $(document).trigger 'heartbeat-tick', [ eventData ]
                        @locked = false

                else if resp.lock is true
                    @locked = true
                    wp.heartbeat.connectNow()

                if resp._wpnonce
                    window._wpnonce = resp._wpnonce

                resp

        json = new PageJson

        API =
            getPageJSON: (pageId, revisionId)->
                json.set
                    page_id: parseInt pageId
                    revision_id: parseInt revisionId

                json.fetch()
                json

        # handlers
        App.reqres.setHandler "get:page:json", (pageId, revisionId)->
            API.getPageJSON pageId, revisionId