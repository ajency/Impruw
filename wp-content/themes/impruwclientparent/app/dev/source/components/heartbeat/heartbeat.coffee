define ['app', 'marionette', 'jquery', 'heartbeat'], ( App, Marionette, $ )->

	if !wp.heartbeat
		throw new Error 'heartbeat api not loaded'

	hb = wp.heartbeat
	$document = $ document

	# heartbeat API
	HeartbeatAPI = 

		AppInstanceCheckHb : ->
			$(document).on("heartbeat-send.check-instance", (e, data) ->
				data["check-instance"] = instance_id : App.instanceId

			).on("heartbeat-tick.check-instance", (e, data) ->
					
				if not data["check-instance"]
					return

				check = data["check-instance"]
				if check.success is false and check.new_instance
                    App.vent.trigger "new:instance:opened", check

			)

		AppNonceRefreshHb : ->
			schedule = ->
				check = false
				window.clearTimeout timeout
				timeout = window.setTimeout(->
					check = true
				, 300000)
				
			check = undefined
			timeout = undefined

			$(document).on("heartbeat-send.wp-refresh-nonces", (e, data) ->
				nonce = undefined
				post_id = undefined
				if check
					if (post_id = $.cookie 'current-page-id') and (nonce = window.lockValue)
						data["wp-refresh-post-nonces"] =
							post_id: post_id
							post_nonce: nonce

			).on("heartbeat-tick.wp-refresh-nonces", (e, data) ->
				nonces = data["wp-refresh-post-nonces"]
				if nonces
					schedule()
					if nonces.replace
						$.each nonces.replace, (selector, value) ->
							window[selector] = value

					if nonces.heartbeatNonce
						window.heartbeatSettings.nonce = nonces.heartbeatNonce	

			).ready ->
				schedule()


		AppAuthenticationHb : ->
			$document
				# tick handler
				.on 'heartbeat-tick.wp-auth-check', (evt, data)->
					if data['wp-auth-check'] is false
						alert 'you are logged out'
						window.location.reload()

				.on 'heartbeat-connection-lost', ->
					App.vent.trigger 'connection-lost'

				.on 'heartbeat-connection-restored', ->
					App.vent.trigger 'connection-restored'

			App.vent.on "new:instance:opened", (data)->
				alert data.reason
				window.location.href = window.location.href + '?expire=true'

		AppPageEditHb : ->	
			
			locked = false

			$document
				# send handler
				.on 'heartbeat-send.refresh-lock', (evt, data)->
					pageId = $.cookie 'current-page-id'
					lock = window.lockValue || false
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
						window.lockValue = received.new_lock
						if locked is true
							locked = false
							App.vent.trigger 'page:released', received



	# App command handlers
	App.commands.setHandler "edit-page-heartbeat", ->
		HeartbeatAPI.AppPageEditHb()

	App.commands.setHandler "heartbeat-api", ->
		
		HeartbeatAPI.AppAuthenticationHb()
		HeartbeatAPI.AppPageEditHb()
		HeartbeatAPI.AppNonceRefreshHb()
		HeartbeatAPI.AppInstanceCheckHb()
		# start heartbeat API
		hb.interval 15