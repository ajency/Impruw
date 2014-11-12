##
## Set backbone overrites or mixins
##
define ['marionette', 'mustache', 'underscore'], (Marionette, Mustache, _ )->

    # Extends the Marionette.Application to add some additional functions
    _.extend Marionette.Application::,

        navigate: (route, options = {}) ->
            Backbone.history.navigate route, options

        getCurrentRoute: ->
            frag = Backbone.history.fragment
            if _.isEmpty(frag) then null else frag

        startHistory: ->
            if Backbone.history
                Backbone.history.start()

        # register a controller instance
        register: (instance, id) ->
            @_registry ?= {}
            @_registry[id] = instance


        unregister: (instance, id) ->
            delete @_registry[id]

        resetRegistry: ->
            oldCount = @getRegistrySize()
            for key, controller of @_registry
                controller.region.empty()
            msg = "There were #{oldCount} controllers in the registry, there are now #{@getRegistrySize()}"
            if @getRegistrySize() > 0 then console.warn(msg, @_registry) else console.log(msg)

        getRegistrySize: ->
            _.size @_registry

    # register a controller instance
        registerElement: (instance, id) ->
            @_elementRegistry ?= {}
            @_elementRegistry[id] = instance

    # unregister a controller instance
        unregisterElement: (instance, id) ->
            delete @_elementRegistry[id]

        resetElementRegistry: ->
            oldCount = @getElementRegistrySize()
            for key, controller of @_elementRegistry
                controller.layout.destroy()
            msg = "There were #{oldCount} controllers in the registry, there are now #{@getElementRegistrySize()}"
            if @getElementRegistrySize() > 0 then console.warn(msg, @_elementRegistry) else console.log(msg)

        getElementRegistrySize: ->
            _.size @_elementRegistry

    # add hide /unhide functionality to a region
    _.extend Marionette.Region::,

        hide: ->
            @$el.hide()

        unhide: ->
            @$el.show()

    _.extend Marionette.ItemView::,

        _renderTemplate : ->
            template = @getTemplate()
            data = this.serializeData()
            data = this.mixinTemplateHelpers data
      
            # Render and add to el
            html = Marionette.Renderer.render template, data, @
            @attachElContent(html);
      
            return @


    # overwrite the default rendering engine to mustache
    Marionette.Renderer.render = (template, data)->
        if not template
            template = ''

        if typeof template is "function"
            template = template()

        Mustache.to_html template, data


    Marionette.View::mixinTemplateHelpers = (target) ->
        target = target or {}
        target.polyglot = ->
            (argument, renderer) ->
                renderer _.polyglot.t argument

        templateHelpers = Marionette.getOption(this, "templateHelpers")
        templateHelpers = templateHelpers.call(this)  if _.isFunction(templateHelpers)
        _.extend target, templateHelpers

    # Override the loadTemplate function as we are using requirejs
    # Marionette expects "templateId" to be the ID of a DOM element.
    # But with RequireJS, templateId is actually the full text of the template.
    Marionette.TemplateCache::loadTemplate = (templateId) ->
        template = templateId

        if not template or template.length is 0
            msg = "Could not find template: '" + templateId + "'"
            err = new Error(msg)
            err.name = "NoTemplateError"
            throw err

        template

    # Form view
    class Marionette.FormView extends Marionette.ItemView

        tagName: 'form'

        className: 'form-horizontal'

        # add validation
        onShow: ->
            @$el.validate()
