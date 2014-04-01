define ['app'], (App)->

	App.module 'DashboardApp.Statistics.SiteAnalytics.Views', (Views, App, Backbone, Marionette, $, _)->

		class Views.OverviewChartView extends Marionette.ItemView

			className : 'row room-chart'

			template : '<div class="row chart-legends">
			<div class="col-md-1">&nbsp;</div>
			<div class="col-md-5"><ul class="list-inline ">
			<li class="active">Weak</li>
			<li>Day</li>
			<li>Month</li>
			</ul></div>
			<div class="col-md-5"><ul class="list-inline pull-right">
			<li ><span class="new-visit">&nbsp;</span>NEW VISITS</li>
			<li><span class="unique-visit">&nbsp;</span>UNIQUE VISITORS</li>
			
			</ul> </div>
			<div class="col-md-1">&nbsp;</div>
			</div>
			<canvas id="overview-chart" height="400" width="700"></canvas><br><br><br>
			<div class="row chart-data">
				<div class="col-md-3"><h3>00:45:36</h3> Avg Visitor Duration</div>
				<div class="col-md-3"><h3>57</h3> Unique Visitor</div>
				<div class="col-md-3"><h3>70 </h3>Total Visits</div>
				<div class="col-md-3"><h3>24%</h3> Bounce Rate</div>
			</div>
			'

			onShow:->
				# set the width of parent
				chart = @$el.find('#overview-chart').get(0)
				console.log $(chart).parent().width()
				$(chart).attr 'width',$(chart).parent().width() - 50
				data = @getChartData()
				# setup the chart here`
				ctx = chart.getContext("2d")
				new Chart(ctx).Line data,{}

			#generate the chart data
			getChartData:->
				# all data is stored in collection
				data =
					labels : ["January","February","March","April","May","June","July"],
					datasets : [
						(
							fillColor : "#c77d28",
							strokeColor : "#c77d28",
							pointColor : "#c77d28",
							pointStrokeColor : "#fff",
							data : [65,59,90,81,56,55,40]
						),
						(
							fillColor : "rgba(244, 135, 8, 0.74)",
							strokeColor : "rgba(244, 135, 8, 0.74)",
							pointColor : "rgba(244, 135, 8, 0.74)",
							pointStrokeColor : "#fff",
							data : [28,48,40,19,96,27,100]
						)
					]

				data

		# traffic single view
		class TrafficSingle extends Marionette.ItemView

			className : 'sadsdas'

			tagName : 'tr'

			template : '<td>add single traffic row markup here</td>'

		# 
		class TrafficEmpty extends Marionette.ItemView

			className : ''

			template : '<td colspan="4">no traffic data to display</td>'

		# traffic view
		class Views.TrafficViewChart extends Marionette.CompositeView

			className : 'row'

			template : '<h4> All Traffic Data</h4>
						add traffic chart markup here.
						<table class="traffic-list"></table>'

			itemView : TrafficSingle

			itemViewContainer : 'table.traffic-list'

			emptyView : TrafficEmpty

			onShow:->
				data = @getChartData()
				# setup the chart here`


			#generate the chart data
			getChartData:->

				# all data is stored in collection