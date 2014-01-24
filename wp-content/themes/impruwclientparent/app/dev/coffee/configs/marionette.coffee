##
## Set backbone overrites or mixins
##

define ['marionette'], (Marionette)->

	_.extend Marionette.Application::,
	
		navigate: (route, options = {}) ->
			Backbone.history.navigate route, options
	
		getCurrentRoute: ->
			frag = Backbone.history.fragment
			if _.isEmpty(frag) then null else frag
		
		startHistory: ->
			if Backbone.history
				Backbone.history.start()
		
		register: (instance, id) ->
			@_registry ?= {}
			@_registry[id] = instance
		
		unregister: (instance, id) ->
			delete @_registry[id]
		
		resetRegistry: ->
			oldCount = @getRegistrySize()
			for key, controller of @_registry
				controller.region.close()
			msg = "There were #{oldCount} controllers in the registry, there are now #{@getRegistrySize()}"
			if @getRegistrySize() > 0 then console.warn(msg, @_registry) else console.log(msg)
		
		getRegistrySize: ->
			_.size @_registry

	Marionette.TemplateCache::loadTemplate = (templateId) ->
		# Marionette expects "templateId" to be the ID of a DOM element.
		# But with RequireJS, templateId is actually the full text of the template.
		template = templateId
		
		if not template or template.length is 0
			msg = "Could not find template: '" + templateId + "'"
			err = new Error(msg)
			err.name = "NoTemplateError"
			throw err
		
		template