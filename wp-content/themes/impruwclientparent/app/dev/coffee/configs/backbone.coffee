define ["backbone"], (Backbone) ->

	# Hold reference to original sync function
	_sync = Backbone.sync
	
	# Overwrite the Backbone.sync to set additional _fetch object to entity
	# The _fetch is $.Deffered object and used later to executes callbacks
	# Sets only for 'read' method
	Backbone.sync = (method, entity, options = {}) ->
		sync = _sync(method, entity, options)
		if !entity._fetch and method is "read"
			entity._fetch = sync
			
		sync

	return