define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Elements", (Elements, App, Backbone, Marionette, $, _)->

        # Generic element model
        class Elements.ElementModel extends Backbone.Model

            # custom id attribute as we will be using post_meta table for saving this
            # element details
            idAttribute: 'meta_id'

            defaults: ->
                style: ''
                draggable: true

            name: 'element'

            # override destroy implementation
            # when an element is removed from builder it must be removed from DB
            # as previous revision of the same page will need it.
            # so, skip the delete ajax call. only remove the model
            destroy: (options) ->
                options = (if options then _.clone(options) else {})
                model = this
                success = options.success
                destroy = ->
                    model.trigger "destroy", model, model.collection, options
                    return

                options.success = (resp) ->
                    destroy()  if options.wait or model.isNew()
                    success model, resp, options  if success
                    model.trigger "sync", model, resp, options  unless model.isNew()
                    return

                if @isNew()
                    options.success()
                    return false

                destroy() unless options.wait

            parse : (resp)->
                # handle element case
                if resp.success is false and resp.new_instance
                    App.vent.trigger "new:instance:opened", resp
                    return {}

                return resp.data if resp.code is 'OK'
                resp


        # element collection class
        class ElementsCollection extends Backbone.Collection

            model: Elements.ElementModel

            url: ->
                "#{AJAXURL}?action=fetch-elements"


        recoveredElements = new ElementsCollection


        # PUBLIC API FOR ENitity
        API =
        # create a new element and save it to server
            createElement: (data = {})->
                element = new Elements.ElementModel
                element.set data
                if element.get('element') isnt 'Row' and element.get('element') isnt 'Column'
                    if element.isNew()
                        element.save null,
                            wait: true

                element

        # returns the model of the recovered element
            getUnusedElements: (pageId, revisionId = 0)->
                recoveredElements.url = "#{AJAXURL}?action=get-unused-elements"
                xhr = recoveredElements.fetch
                            data:
                                revision_id: revisionId
                                page_id: pageId
                recoveredElements.xhr = xhr
                recoveredElements

            getUnusedElementByMetaId: (metaId)->
                element = recoveredElements.get parseInt metaId
                element

        # REQUEST HANDLERS
        App.reqres.setHandler "create:new:element", (data) ->
            API.createElement data

        App.reqres.setHandler "get:unused:elements", (pageId, revisionId)->
            API.getUnusedElements pageId, revisionId

        App.reqres.setHandler "get:unused:element:by:metaid", (metaId)->
            API.getUnusedElementByMetaId metaId

        App.commands.setHandler "unused:element:added", (metaId, _page_id)->

            $.ajax
                type: 'POST'
                url: AJAXURL
                data:
                    action: 'remove-unused-element'
                    page_id: _page_id
                    element_meta_id : metaId
                success:->
                    console.log "element removed from unused list"