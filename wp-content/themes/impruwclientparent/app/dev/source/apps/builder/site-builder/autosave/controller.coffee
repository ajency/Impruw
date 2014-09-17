define ['app', 'apps/builder/site-builder/autosave/autosavehelper', 'heartbeat'], (App, AutoSaveHelper)->

	App.module 'SiteBuilderApp.AutoSave', (AutoSave, App, Backbone, Marionette, $, _)->

		$document = $(document)

		class AutoSaveLocal extends Marionette.Controller

			initialize : ->
					
				@suspended = false

				@hasSupport = @checkLocalStorgeSupport()
				@blogId = window.BLOGID

				if @hasSupport
					@createStorage()

				$document.ready @run

			suspend : ->
				@suspended = true

			resume : ->
				@suspended = false

			run : =>
				@interval = window.setInterval @doAutoSave, 5 * 1000

			doAutoSave : =>
				
				if @suspended is true
					return false

				json = AutoSaveHelper.getPageJson()
				pageId = App.request "get:original:editable:page"

				data = _.defaults json, 'page_id' : pageId

				@saveLocal data

				
			createStorage : ->
				@key = "impruw-builder-#{@blogId}"
				window.sessionStorage.setItem @key, ''

			checkLocalStorgeSupport : ->
				test = Math.random().toString()
				result = false

				try 
					window.sessionStorage.setItem( 'wp-test', test )
					result = window.sessionStorage.getItem( 'wp-test' ) is test
					window.sessionStorage.removeItem( 'wp-test' )
				catch error 

				result

			getLastSaved : (pageId)->
				return window.sessionStorage.getItem @key

			saveLocal : (json, pageId)->
				
				if @hasSupport
					window.sessionStorage.setItem @key, JSON.stringify json
					return window.sessionStorage.getItem(@key) isnt null

				return false



		class AutoSaveServer extends Marionette.Controller

			initialize : (options)->

				{@local} = options

				@_lastUpdated = 0

				@autoSaveData = false
				@nextRun = 0
				$document.on 'heartbeat-send.autosave-page-json', @hbAutoSavePageJSONSend
				$document.on 'heartbeat-tick.autosave-page-json', @hbAutoSavePageJSONTick

				@canAutosave = true
				@listenTo App.vent, 'page:took:over', (errorMessage)=>
					@canAutosave = false

				@listenTo App.vent, 'page:released', =>
					@canAutosave = true

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

				if not @canAutosave
					return false

				if ( new Date() ).getTime() < @nextRun
					return false

				json = AutoSaveHelper.getPageJson()

				pageId = App.request "get:original:editable:page"

				data = _.defaults json, 'page_id' : pageId

				if json is false or not @isPageModified data
					return false

				@disableButtons()

				# update local copy
				@local.saveLocal data

				# attach instance Id
				data['instance_id'] = App.instanceId

				data

			isPageModified : (data)->
				lastLocalSaved = @local.getLastSaved()
				stringifyJson = JSON.stringify data
				modified = lastLocalSaved isnt stringifyJson
				modified


			hbAutoSavePageJSONTick : (event, data)=>
				if data['autosave-page-json']
					@handleTick data['autosave-page-json']

			handleTick : (data)=>
				@schedule()
				@enableButtons()

				if data.success is false and data.new_instance
					App.vent.trigger "new:instance:opened", data

				if data.success is false
					App.vent.trigger "autosave:failed", data
				else
					@_lastUpdated = data._last_updated

					
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
					autosaveInterval = 6

				@nextRun = ( new Date() ).getTime() + ( autosaveInterval * 1000 ) || 60000



		class AutoSaveAPI

			constructor : ->
				@local = new AutoSaveLocal
				@server = new AutoSaveServer local : @local 


		App.autoSaveAPI = new AutoSaveAPI
				

