define ['app', 'jquery', 'mustache', 'underscore' ], (App, $, Mustache, _)->

	$document = $(document)
	$notificationEle = $('#notifications-region')

	Helper =
		template : '<div class="notification-message">
				        <button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				        <div class="message-text">{{{messageText}}}</div>
				    </div>' 
		toHtml : (dataObj)->
			Mustache.to_html Helper.template , dataObj

	App.vent.on "autosave-failed", (reason)->
		notification = Helper.toHtml messageText : "Autosave failed: #{reason}"
		$notificationEle.append(notification)
		notification.fadeIn()

	App.vent.on "publish-failed", (reason)->
		notification = Helper.toHtml messageText : "Published failed: #{reason}" 
		$notificationEle.append(notification)
		notification.fadeIn()

	App.vent.on 'connection-lost', ->
		$('body').css 'opacity' , 0.5
		$notificationEle
			.append Helper.toHtml messageText : _.polyglot.t 'Connection Lost'
			.fadeIn()

	App.vent.on 'connection-restored', ->
		$('body').css 'opacity' , 1		
		$notificationEle
			.append Helper.toHtml messageText : _.polyglot.t 'Connection Restored'
			.fadeOut()
