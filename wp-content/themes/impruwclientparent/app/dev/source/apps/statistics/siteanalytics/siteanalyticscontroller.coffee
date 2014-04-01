define ['app', 'controllers/base-controller','apps/statistics/siteanalytics/views','moment'], (App, AppController, moment)->

	App.module 'DashboardApp.Statistics.SiteAnalytics', (SiteAnalytics, App, Backbone, Marionette, $, _)->

		class SiteAnalyticsController extends AppController

			initialize:->

				# get the weekly collection
				date = new Date()
				endDate = Date.UTC date.getFullYear(),date.getMonth(),date.getDate()

				#set start date one month ago
				startDate = endDate - (7 * 86400000)
				
				@collection = App.request "get:site:analytics:data", startDate, endDate

				@layout = layout = @_getLayout()

				@listenTo layout, "show", @renderCharts

				@listenTo layout, "date:range:changed", @renderCharts

				@show layout

			renderCharts:=>
				# show over view chart
				overviewChart = new SiteAnalytics.Views.OverviewChartView 
														collection : @collection
				@layout.overviewChartRegion.show overviewChart

				# show traffic list
				trafficViewChart = new SiteAnalytics.Views.TrafficViewChart 
														collection : @collection
				@layout.trafficChartRegion.show trafficViewChart
	

			_getLayout:->
				new SiteAnalyticsLayout


		class SiteAnalyticsLayout extends Marionette.Layout

			className : 'row'

			template : '<div class="row"> 
			<div class="col-md-3">
				<div class="left-inner-addon ">
							<span class="glyphicon glyphicon-calendar"></span>
							<input type="text" class="datepicker "/>
				</div>
			</div>
			<div class="col-md-1"><h6>or</h6></div>
				<div class="col-md-8 "> 
				<ul class="list-inline select-type ">
								<li class="active">Weak</li>
								<li>Day</li>
								<li>Month</li>
						</ul>
				</div>
			</div>
			<div id="overview-chart-region"></div>
						<div id="traffic-chart-region"></div>'

			events:
				'change .datepicker' : ->
					start = new Date()
					end   = start - (30 * 8460000)
					@trigger "date:range:changed", start, end

			regions :
				overviewChartRegion : '#overview-chart-region'
				trafficChartRegion  : '#traffic-chart-region'

			onShow:->
				@$el.find('.datepicker').datepicker()


		App.commands.setHandler "show:site:analytics:data", (opt)->
			new SiteAnalyticsController opt
