define ["marionette"
		"app"], (Marionette, App) ->

	class AppController extends Marionette.Controller
		
		constructor: (options = {}) ->
			@section = options.section
			@_instance_id = _.uniqueId("controller")
			App.commands.execute "register:instance", @, @_instance_id
			super options

		# close the controller. 
		# unregister the controller instance from application object
		close: (args...) ->
			delete @region
			delete @options
			App.commands.execute "unregister:instance", @, @_instance_id
			super args

		# add new element to the section
		add:(view, section)->
			type = view.model.get "element"
			section.find("li[data-element='#{type}']").replaceWith view.$el
			view.render()