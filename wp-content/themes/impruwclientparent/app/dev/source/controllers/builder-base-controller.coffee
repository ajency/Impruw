define ["marionette"
		"app"], (Marionette, App) ->

	class AppController extends Marionette.Controller
		
		constructor: (options = {}) ->
			@section = options.section
			@_instance_id = _.uniqueId("controller")
			App.commands.execute "register:instance", @, @_instance_id
			super options


		close: (args...) ->
			delete @region
			delete @options
			App.commands.execute "unregister:instance", @, @_instance_id
			super args

		
		add:(view, section)->
			type = view.model.get("type")
			section.find("li[data-element='#{type}']").replaceWith view.$el
			view.render()