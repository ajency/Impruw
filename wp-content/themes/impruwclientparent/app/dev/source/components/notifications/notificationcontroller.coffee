define ['app','controllers/base-controller'], (App, AppController)->

	class NotificationController extends AppController

		initialize: (options) ->
			#throw new Error "message error"
			@throwMessageError()

		# throw an error
		throwMessageError : ->
			throw new Exception "message is missing"
			

	App.commands.setHandler "show:notification", (message, options) ->
		

	NotificationController : NotificationController