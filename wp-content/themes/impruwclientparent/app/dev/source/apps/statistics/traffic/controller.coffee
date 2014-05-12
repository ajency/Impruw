define ['app', 'controllers/base-controller'], (App, AppController)->

	App.module 'StatisticsApp.Traffic', (Traffic, App, Backbone, Marionette, $, _)->

		class Traffic.Controller extends AppController

			# initiliaze controller
			initialize:(opts)->

				sitemodel = opts.model

				@view = view = @getTrafficView sitemodel				

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'statistics'

				@show @view,
					loading: true


			getTrafficView :(model) ->
				new TrafficView
						model :model
						

		class TrafficView extends Marionette.ItemView

			template :'<div class="aj-imp-dash-content">
						<header class="aj-imp-dash-header row">
							<div class="aj-imp-dash-title col-xs-12">
								<h2 class="aj-imp-page-head">Traffic Summary</h2>
							</div>
						</header>
						<h4 class="aj-imp-sub-head"><small>View the keywords, networks and devices being used to access your site.</small></h5>
						
						<h5 class="aj-imp-sub-head-thin">All Referrers</h5>
						<div id="widgetIframe">
							<iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Referrers&actionToWidgetize=getAll&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
							</iframe>
						</div>
					  	
					  	<h5 class="aj-imp-sub-head-thin">Device type</h5>
						<div id="widgetIframe">
							<iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=UserSettings&actionToWidgetize=getMobileVsDesktop&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
							</iframe>
						</div>
					  	
					  	<h5 class="aj-imp-sub-head-thin">Insights Overview</h5>
						<div id="widgetIframe">
							<iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=Insights&actionToWidgetize=getInsightsOverview&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
							</iframe>
						</div>
					  </div>'

			serializeData :->
				data = super()
				data.statistics_enabled = parseInt @model.get 'statistics_enabled'
				data


				
		App.commands.setHandler "show:traffic:view",(opts) ->
			new Traffic.Controller opts				





			
			