define ['app', 'jquery' ], (App, $)->

	$document = $(document)
	$notificationEle = $('#notification-element')

	App.vent.on "autosave-failed", (reason)->
		$notificationEle
			.text "Autosave failed: " + reason
			.fadeIn()

	App.vent.on "publish-failed", (reason)->
		 $notificationEle
			.text "Publish failed: " + reason
			.fadeIn()

	App.vent.on 'connection-lost', ->
		$('body').css 'opacity' , 0.5
		$notificationEle
			.text _.polyglot 'Connection Lost'
			.fadeIn()

	App.vent.on 'connection-restored', ->
		$('body').css 'opacity' , 1		
		$notificationEle
			.text _.polyglot 'Connection Restored'
			.fadeOut()
