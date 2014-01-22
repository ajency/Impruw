##
##
##
define ['underscore'], ( _ ) ->
	
    _.templateSettings =
    	evaluate: /\{\[([\s\S]+?)\]\}/g
    	interpolate: /\{\{(.+?)\}\}/g

    _.mixin
    
    	##multiple app log message in a single statement
    	logAppMsg : (msg...)->
    		_.each arguments, (l, index)->
	    		console.log(l) 

	    ##multiple app error message in a single statement
    	logAppErr : (msg...)->
    		_.each arguments, (l, index)->
	    		console.log(l)
