define ["marionette"
		"app"], (Marionette, App) ->

	class AppController extends Marionette.Controller
		
		constructor: (options = {}) ->
			@section = options.section
			@_instance_id = _.uniqueId("controller")
			App.commands.execute "register:builder:instance", @, @_instance_id
			super options

		# close the controller. 
		# unregister the controller instance from application object
		close: (args...) ->
			delete @region
			delete @options
			App.commands.execute "unregister:builder:instance", @, @_instance_id
			super args

		# add new element to the section
		add:(layout, section)->
			type = layout.model.get "element"
			if section.find("li[data-element='#{type}']").length is 1
				section.find("li[data-element='#{type}']").replaceWith layout.$el
			else
				section.append layout.$el
			layout.render()
			layout.triggerMethod 'show'

			#check if element need save
			if not layout.model.isNew()
				@showView layout.model