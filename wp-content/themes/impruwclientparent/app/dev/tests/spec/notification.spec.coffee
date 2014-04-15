define ['app','components/notifications/notificationcontroller'],(App, Notification)->

	describe "Global notification component",->

		describe "Initial setup",->

			it "must have a controller", ->
				expect(Notification.NotificationController).toBeDefined()			

			it "must have a command handler", ->
				expect(App.commands.hasHandler('show:notification')).toBe true

		describe "initializing controller without the message",->

			it "must throw an error", ->
				spyOn Notification.NotificationController::, 'initialize'
				nc = new Notification.NotificationController
				expect(nc.initialize).toHaveBeenCalled()
				#expect(nc.initialize).toThrow new Error "message is missing"
							