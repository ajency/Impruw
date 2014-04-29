define ['app', 'controllers/base-controller'], (App, AppController)->

	App.module 'StatisticsApp.Show', (Show, App, Backbone, Marionette, $, _)->

		class Show.Controller extends AppController

			# initiliaze controller
			initialize:()->

				trackingStatus = STATISTICS

				if trackingStatus == false
					@view = view = @getDisabledTrackingView()

					@listenTo @view,"enable:tracking:for:site" , @updateTracking
				
				else

					@view = view = @getStatisticsView()
				

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'statistics'

				@show @view,
					loading: true

				
			getDisabledTrackingView : ->
				new TrackingDisabledView

			getStatisticsView :->
				new StatisticsView
			
			updateTracking :->
				options = 
					url:AJAXURL,
					method:'POST',
					data :
						action : 'update-tracking'

				$.ajax( options ).done (response)=>
					@trackingUpdated()	

				.fail (resp)->
					console.log 'error'				

			trackingUpdated :=>
				@view.triggerMethod "tracking:updated"


		class TrackingDisabledView extends Marionette.ItemView

			template :'<div id="tracking-container">
							<div id="disabled_tracking">
								<p>
								Eeep! This doesnot look good.
								Enable javascript to spruce up this place
								How do I do that? ->
								</p>
								<button id="btn_enable_tracking">enable</button>
							</div>
					   </div>'

			events :
				'click #btn_enable_tracking' :->
					@trigger "enable:tracking:for:site"

			onTrackingUpdated :->
				@$el.find('#disabled_tracking').remove()
				newHtml = '<div>Great! Looks like you are right on track. Your tracking code has been successfully activated. We need a day to compile your data so come again tomorrow.
						  </div>'
				@$el.find('#tracking-container').append(newHtml)

		class StatisticsView extends Marionette.ItemView

			template :'<div>
							<p>DISPLAY STATISTICS</p>
					   </div>'




			
	App.StatisticsApp.Show.Controller		