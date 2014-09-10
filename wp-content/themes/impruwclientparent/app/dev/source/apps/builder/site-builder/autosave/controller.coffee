define ['app', 'apps/builder/site-builder/autosave/autosavehelper', 'heartbeat'], (App, AutoSaveHelper)->

	App.module 'SiteBuilderApp.AutoSave', (AutoSave, App, Backbone, Marionette, $, _)->

		$document = $(document)

		class AutoSaveLocal 

			constructor : ->
				@hasSupport = @checkLocalStorgeSupport()

			checkLocalStorgeSupport : ->
				test = Math.random().toString()
				result = false

				try 
					window.sessionStorage.setItem( 'wp-test', test )
					result = window.sessionStorage.getItem( 'wp-test' ) is test
					window.sessionStorage.removeItem( 'wp-test' )
				catch error 

				result


		class AutoSaveServer

			constructor : ->
				@autoSaveData = false
				@nextRun = 0
				$document.on 'heartbeat-send.autosave-page-json', @hbAutoSavePageJSONSend
				$document.on 'heartbeat-tick.autosave-page-json', @hbAutoSavePageJSONTick


			# provide data to heartbeat send
			hbAutoSavePageJSONSend : ( evt,  data )=>

				@autoSaveData = @getAutoSaveData()

				if @autoSaveData isnt false
					data['autosave-page-json'] = @autoSaveData

				data

			triggerSave : ->
				@nextRun = 0
				wp.heartbeat.connectNow()

			getAutoSaveData : ->

				if ( new Date() ).getTime() < @nextRun
					return false

				pageId = App.request "get:original:editable:page"

				json = AutoSaveHelper.getPageJson()

				if json is false
					return false

				@disableButtons()

				data = _.defaults json, 'page_id' : pageId

				data


			hbAutoSavePageJSONTick : (event, data)=>
				if data['autosave-page-json']
					@handleTick data['autosave-page-json']

			handleTick : =>
				@schedule()
				@enableButtons()

				# reset autosave data
				@autoSaveData = false

			enableButtons : ->
				App.vent.trigger 'autosave:page:json:enable:buttons'

			disableButtons : ->
				App.vent.trigger 'autosave:page:json:disable:buttons'

			schedule : ->
				if typeof window.autosaveInterval != 'undefined'
					autosaveInterval = window.autosaveInterval
				else
					autosaveInterval = 60

				@nextRun = ( new Date() ).getTime() + ( autosaveInterval * 1000 ) || 60000



		class AutoSaveAPI

			constructor : ->
				@local = new AutoSaveLocal
				@server = new AutoSaveServer


		App.commands.setHandler "autosave-api", ->
			App.autoSaveAPI = new AutoSaveAPI

