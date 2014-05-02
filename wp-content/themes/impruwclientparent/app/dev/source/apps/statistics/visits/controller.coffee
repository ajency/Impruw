define ['app', 'controllers/base-controller'], (App, AppController)->

	App.module 'StatisticsApp.Visits', (Visits, App, Backbone, Marionette, $, _)->

		class Visits.Controller extends AppController

			# initiliaze controller
			initialize:(opts)->

				sitemodel = opts.model

				@view = view = @getVisitsView sitemodel				

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'statistics'

				@show @view,
					loading: true


			getVisitsView :(model) ->
				new VisitsView
						model :model
						

		class VisitsView extends Marionette.ItemView

			template :'<div>
						<h3> Visit Summary</h3>
						<p> Use this section to understand your audience visits by day, month and year.</p>
						
						<h5>Visits Overview (with graph)</h5>
						<div id="widgetIframe">
							<iframe width="100%" height="350" src="http://localhost/impruw/piwik/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitsSummary&actionToWidgetize=index&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth=4d1ff0386c1933bcb68ad517a6573d1e" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
							</iframe>
						</div>
					  	
					  	<h5>Visits by Day of Week</h5>
						<div id="widgetIframe">
							<iframe width="100%" height="350" src="http://localhost/impruw/piwik/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitTime&actionToWidgetize=getByDayOfWeek&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth=4d1ff0386c1933bcb68ad517a6573d1e" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
							</iframe>
						</div>
					  	
					  	<h5>Visitor map</h5>
						<div id="widgetIframe">
							<iframe width="100%" height="350" src="http://localhost/impruw/piwik/index.php?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=visitorMap&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth=4d1ff0386c1933bcb68ad517a6573d1e" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
							</iframe>
						</div>
					  </div>'

			serializeData :->
				data = super()
				data.statistics_enabled = parseInt @model.get 'statistics_enabled'
				data


				
		App.commands.setHandler "show:visits:view",(opts) ->
			new Visits.Controller opts				





			
			