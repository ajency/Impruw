define ["backbone","mustache"], (Backbone, Mustache) ->

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

	# attach mustache to all view
	Backbone.View.Mustache = Mustache

	# set backbone.send function for making ajax request with wordpress
	Backbone.send =  (action, options = {})->
		
		if _.isObject action
			options = action 
		else
			options.data =  options.data || {}
			options.data = _.extend options.data, action:action

		options = _.defaults options,
								type	: 'POST',
								url		: AJAXURL

		$.Deferred (deferred)->

			# Transfer success/error callbacks.
			if options.success
				deferred.done options.success
			if options.error
				deferred.fail options.error

			delete options.success
			delete options.error

			# Use with PHP's wp_send_json_success() and wp_send_json_error()
			$.ajax( options ).done (response)->
				# Treat a response of `1` as successful for backwards
				# compatibility with existing handlers.
				if response.code is not 'OK'
					response = code : 'ERROR'

				if _.isObject(response) and response.code is 'OK'
					deferred.resolveWith this,[response]
				else
					deferred.rejectWith this, [response]

			.fail ->
				deferred.rejectWith this, arguments
			
		.promise()