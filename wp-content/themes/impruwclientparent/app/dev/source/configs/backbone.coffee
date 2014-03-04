define ["backbone","mustache"], (Backbone, Mustache) ->

	# Override the default Backbone.Model.sync to handle wordpress ajax.
	# All ajax in wordpresss are triggered from admin_url('admin-ajax.php') URL
	# each ajax is differentiated with action an parameter. So, each model fetch/save/destroy
	# needs to have an action parameeter to trigger ajax.
	# each model MUST have a "name" property. We will have 4 different ajax action for each CRUD actions which 
	# depends on name property viz. 
	# (create-modelname, update-modelname, delete-destroyname, read-modelname )
	# urlRoot for wordpress will always be admin_url('admin-ajax.php')

	_.extend Backbone.Model::,

		# name : ''

		# initialize: (opt = {})->
				
		# 	# set the name property if if passed with options
		# 	@name = opt.name if opt.name	

		# 	if not @name
		# 		throw new Error '"name" property is not set the model. Please set the name property'
		
		# model parse function
		parse:(resp)->
			# change sizes to an array
			if resp.code is 'OK'
				return resp.data 

			resp



	# Hold reference to original sync function
	_sync = Backbone.sync
	
	# Overwrite the Backbone.sync to set additional _fetch object to entity
	# The _fetch is $.Deffered object and used later to executes callbacks
	# Sets only for 'read' method
	Backbone.sync = (method, entity, options = {}) ->
		sync = _sync(method, entity, options)
		if !entity._fetch and method is "read" or !entity._fetch and method is "create"
			entity._fetch = sync
			
		sync

	_.extend Backbone.Collection::,

		fetched : false



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
		xhr = null

		$.Deferred (deferred)->

			# Transfer success/error callbacks.
			if options.success
				deferred.done options.success
			if options.error
				deferred.fail options.error

			delete options.success
			delete options.error

			# Use with PHP's wp_send_json_success() and wp_send_json_error()
			xhr = $.ajax( options ).done (response)->
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
		
		# return a xhr object
		xhr