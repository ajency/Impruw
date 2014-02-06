##
##
##
define ['underscore'], ( _ ) ->

	# overwrite template settings defaults to use mustache style
	_.templateSettings =
			evaluate : /\{\[([\s\S]+?)\]\}/g,
			interpolate : /\{\{([\s\S]+?)\}\}/g
	
	# mixin to add additional functionality underscore
	_.mixin
	
		#multiple app log message in a single statement
		logAppMsg : (msg...)->
			_.each arguments, (l, index)->
				console.log(l) 

		#multiple app error message in a single statement
		logAppErr : (msg...)->
			_.each arguments, (l, index)->
				console.log(l)
