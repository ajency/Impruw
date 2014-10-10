define ['app', 'jquery', 'mustache', 'underscore', 'heartbeat' ], (App, $, Mustache, _)->

	$document = $(document)
	$notificationEle = $('#notifications-region')

	connectionNotification = null

	closeNotification = (e)->
		$(this).parent().fadeOut 'fast', => $(this).parent().remove()


	Helper =
		template : '<div class="notification-message">
						{{#close}}
				        <button type="button" class="close close-notification"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				        {{/close}}
				        <div class="message-text">{{{messageText}}}</div>
				    </div>' 
		toHtml : (dataObj)->
			Mustache.to_html Helper.template , dataObj

	App.vent.on "autosave-failed", (reason)->
		notification = $ Helper.toHtml messageText : "Autosave failed: #{reason}", close : true
		$notificationEle.append(notification)
		notification.fadeIn().find('button').on 'click', closeNotification
		_.delay (-> 
			notification.remove() 
		), 3000
		wp.heartbeat.connectNow()

	App.vent.on "publish:failed", (reason)->
		notification = $ Helper.toHtml messageText : "Published failed: #{reason}" , close : true
		$notificationEle.append(notification)
		notification.fadeIn().find('button').on 'click', closeNotification
		_.delay (-> 
			notification.remove() 
		), 3000


	App.vent.on "page:published", ->
		notification = $ Helper.toHtml messageText : "Page published successfully" , close : true
		$notificationEle.append(notification)
		notification.fadeIn().find('button').on 'click', closeNotification
		_.delay (-> 
			notification.remove() 
		), 3000

	App.vent.on 'connection-lost', ->
		connectionNotification = $ Helper.toHtml messageText : _.polyglot.t "Connection Lost"
		$notificationEle.append(connectionNotification)
		connectionNotification.fadeIn()
		$('.conn-lost-overlay').removeClass 'hidden'

	App.vent.on 'connection-restored', ->
		if connectionNotification isnt null
			connectionNotification.fadeOut 'fast', -> connectionNotification.remove()
		$('.conn-lost-overlay').addClass 'hidden'

	App.reqres.setHandler 'error:encountered', (error)->
		$.post AJAXURL,
			(
				action : 'impruw_error_encountered'
				error : error
			)
