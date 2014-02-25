define ["marionette"
		"app"], (Marionette, App) ->

			# This is a special purpose controller for the setting module for all
			# elements inside site builder. This controller will act as tyhe centerpoint
			# for all action happening on setting region. the default region for this 
			# controller is settingsRegion. It will also hold @model = ElementModel() 
			# depending upon whichever element is loaded
			# It will listen to events coming from region's view instance and update @model 
			# accordingly.
			class BuilderSettingController extends Marionette.Controller
				
				constructor: (options = {}) ->
					{@model} = options
					if not @model 
						throw new Error "@model missing"

					# set default region as settingsRegion
					@region = App.getRegion 'settingsRegion'	
					@_instance_id = _.uniqueId "settingcontroller" 
					App.commands.execute "register:builder:instance", @, @_instance_id
					super options

				# close the controller. 
				# unregister the controller instance from application object
				close: (args...) ->
					delete @region
					delete @options
					App.commands.execute "unregister:builder:instance", @, @_instance_id
					super args

				# listen to onClose event. 
				# this event will be triggered when the element setting popup is closed.
				onClose:->

					# return if the model is not changed. @use: model.hasChanged() function
					return if not @model.hasChanged()

					# if the model is changed . save the updated model to server.
					# null because we have already set the new values for model
					@model.save null, wait: true

				# listen to view events. these will be generic model events which will be same accross 
				# all elements. If custom model events are required overwrite this function with call to super
				_bindModelEvents:(view)->
					@listenTo view, "element:draggable:changed", @updateModel

				# this function will update the model with the passed property
				updateModel:(property, value)->
					# set the value for the passed property. for new porperty a key will be created
					# this will trigger corresponding "change:property" event
					@model.set property,value

