define ['app', 'marionette', 'jquery', 'heartbeat'], ( App, Marionette, $ )->

	if !wp.heartbeat
		throw new Error 'heartbeat api not loaded'

	hb = wp.heartbeat
	$document = $ document

	# heartbeat API
	HeartbeatAPI = 
		AppAuthenticationHb : ->
			$document
				# tick handler
				.on 'heartbeat-tick.wp-auth-check', (evt, data)->
					if data['wp-auth-check'] is false
						alert 'you are logged out'
						window.location.reload()

				.on 'heartbeat-connection-lost', ->
					console.log "lost"
					App.execute 'connection-lost'

				.on 'heartbeat-connection-restored', ->
					console.log "restored"
					App.execute 'connection-restored'

		AppPageEditHb : ->	

			pageId = 0
			lock = ''
			locked = false

			$document
				# send handler
				.on 'heartbeat-send.refresh-lock', (evt, data)->
					pageId = $.cookie 'current-page-id'
					lock = lock
					send = {}
					send.post_id = pageId
					if ( lock )
						send.lock = lock

					data['wp-refresh-post-lock'] = send
					data

				.on 'heartbeat-tick.refresh-lock', (evt, data)->
					if not data['wp-refresh-post-lock']
						return
					
					received = data['wp-refresh-post-lock'];

					if received.lock_error
						locked = true
						App.vent.trigger 'page:took:over', received.lock_error.text
					else if received.new_lock
						lock = received.new_lock
						if locked is true
							locked = false
							App.vent.trigger 'page:released', received



	# App command handlers
	App.commands.setHandler "edit-page-heartbeat", ->
		HeartbeatAPI.AppPageEditHb()

	App.commands.setHandler "heartbeat-api", ->
		
		HeartbeatAPI.AppAuthenticationHb()
		HeartbeatAPI.AppPageEditHb()
		# start heartbeat API
		hb.interval 15