define ['app'], (App)->

	App.module 'DashboardApp.Statistics.SiteAnalytics.Views', (Views, App, Backbone, Marionette, $, _)->

		class Views.OverviewChartView extends Marionette.ItemView

			className : 'row room-chart'

			template : '<div class="row chart-legends">
							<div class="col-md-1">&nbsp;</div>
							<div class="col-md-5">
								<!--<ul class="list-inline duration">
									<li class="active" data-duration="7">Week</li>
									<li data-duration="30">Month</li>
									<li data-duration="180">6 Months</li>
								</ul>-->
							</div>
							<div class="col-md-5">
								<ul class="list-inline pull-right">
									<li ><span class="new-visit">&nbsp;</span>NEW VISITS</li>
									<li><span class="unique-visit">&nbsp;</span>UNIQUE VISITORS</li>
								</ul>
							</div>
							<div class="col-md-1">&nbsp;</div>
						</div>
						<canvas id="overview-chart" height="400" width="700"></canvas><br><br><br>
						<div class="row chart-data">
							<div class="col-md-3"><h3>00:45:36</h3> Avg Visitor Duration</div>
							<div class="col-md-3"><h3>57</h3> Unique Visitor</div>
							<div class="col-md-3"><h3>70 </h3>Total Visits</div>
							<div class="col-md-3"><h3>24%</h3> Bounce Rate</div>
						</div>'

			onShow:->
				# set the width of parent
				chart = @$el.find('#overview-chart').get(0)
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

			tagName : 'tr'

			template : '<td class="text-left" data-title="Source">
							<a href="#">http://dribbble.com/shots/popular? </a>
							<span class="label label-info">R</span>
						</td>
						<td data-title="Visits">163</td>
						<td data-title="Page views">  2.08 </td>
						<td data-title="Avg time on the page"> 00:12:36 </td>
						<td data-title="Bounce rate"> 
							70.38%<span class="glyphicon glyphicon-arrow-up"></span>
						</td>'

		# traffic empty view
		class TrafficEmpty extends Marionette.ItemView

			template : '<td colspan="4">No traffic data to display</td>'

		# traffic view
		class Views.TrafficViewChart extends Marionette.CompositeView

			className : 'row'

			template : '<h4> All Traffic Data</h4>
						<div class="row traffic-list-table">
							<div class="col-md-12">
								<table class="traffic-list table table-striped">
									<thead>
										<tr>
											<th class="text-left">Source</th>
											<th >Visits</th>
											<th>Page views</th>
											<th>Avg time on the page</th>
											<th>Bounce rate</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>
						</div>'

			itemView : TrafficSingle

			itemViewContainer : 'table > tbody'

			emptyView : TrafficEmpty

			onShow:->
				data = @getChartData()
				# setup the chart here`


			#generate the chart data
			getChartData:->

				# all data is stored in collection