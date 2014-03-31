define ['app'], (App)->

	App.module 'DashboardApp.Statistics.SiteAnalytics.Views', (Views, App, Backbone, Marionette, $, _)->

		class Views.OverviewChartView extends Marionette.ItemView

			className : 'row'

			template : '<canvas id="overview-chart" height="400" width="700"></canvas>'

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
							fillColor : "rgba(220,220,220,0.5)",
							strokeColor : "rgba(220,220,220,1)",
							pointColor : "rgba(220,220,220,1)",
							pointStrokeColor : "#fff",
							data : [65,59,90,81,56,55,40]
						),
						(
							fillColor : "rgba(151,187,205,0.5)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
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