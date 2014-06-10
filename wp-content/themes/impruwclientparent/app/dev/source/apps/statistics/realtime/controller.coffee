define ['app', 'controllers/base-controller'], (App, AppController)->

	App.module 'StatisticsApp.RealTime', (RealTime, App, Backbone, Marionette, $, _)->

		class RealTime.Controller extends AppController

			# initiliaze controller
			initialize:(opts)->

				sitemodel = opts.model

				@view = view = @getRealTimeView sitemodel				

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'statistics'

				@show @view,
					loading: true


			getRealTimeView :(model) ->
				new RealTimeView
						model :model
						

		class RealTimeView extends Marionette.ItemView

			template :'<div class="aj-imp-dash-content">
						<header class="aj-imp-dash-header row">
							<div class="aj-imp-dash-title col-xs-12">
								<h2 class="aj-imp-page-head">Real time visitors</h2>
							</div>
						</header>
						<h4 class="aj-imp-sub-head"><small>This is where you monitor user activity as it happens on your site.</small></h4>
						<h5 class="aj-imp-sub-head-thin">Real Time Visitor Count</h5>
					  	<div id="widgetIframe">
					  		<iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Live&actionToWidgetize=getSimpleLastVisitCount&idSite={{statistics_enabled}}&period=day&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
					  		</iframe>
					  	</div>
					  	<h5 class="aj-imp-sub-head-thin">Real time map</h5>
					  	<div id="widgetIframe">
					  		<iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=realtimeMap&idSite={{statistics_enabled}}&period=day&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
					  		</iframe>
					  	</div>
					  </div>'

			serializeData :->
				data = super()
				data.statistics_enabled = parseInt @model.get 'statistics_enabled'
				data


				
		App.commands.setHandler "show:realtime:view",(opts) ->
			new RealTime.Controller opts				





			
			