define ["backbone"], (Backbone) ->

	_sync = Backbone.sync

	Backbone.sync = (method, entity, options = {}) ->
		
		sync = _sync(method, entity, options)
		if !entity._fetch and method is "read"
			entity._fetch = sync
			console.log("fetch sync")
		sync

	return