define ["app", 'backbone','jquery'], (App, Backbone, $) ->

    App.module "Entities.SiteBuilderJSON", (SiteBuilderJSON, App, Backbone, Marionette, $, _)->
        
        class PageJson extends Backbone.Model

            idAttribute: 'page_id'

            name: 'page-json'

            initialize : ->
                @lock = false
                @fetchEntire = false
                # heartbeat API
                @listenTo App.vent, 'page:released', =>
                    @fetchEntire = true

            url: ->
                pageId = @get 'page_id'
                revisionId = @get 'revision_id'
                onlyPage = '&only_page=no'
                if @fetchOnlyPage()
                    onlyPage = '&only_page=yes'
                
                "#{AJAXURL}?action=read-page-json&page_id=#{pageId}&revision_id=#{revisionId}#{onlyPage}"

            fetchOnlyPage : ->
                if @has('header') && @has('footer') && not @fetchEntire
                    return true

                return false

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
                    @fetchEntire = true
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

                resp.data

        json = new PageJson

        API =
            getPageJSON: (pageId, revisionId, onlyPage)->
                json.set
                    page_id: parseInt pageId
                    revision_id: parseInt revisionId

                json.fetch()
                json

        # handlers
        App.reqres.setHandler "get:page:json", (pageId, revisionId, onlyPage)->
            API.getPageJSON pageId, revisionId, onlyPage