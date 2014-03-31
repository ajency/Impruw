define ['app'], (App)->

	App.module 'DashboardApp.Statistics.SiteAnalytics.Views', (Views, App, Backbone, Marionette, $, _)->

		class Views.OverviewChartView extends Marionette.ItemView

			className : 'row room-chart'

			template : '<canvas id="overview-chart" height="400" width="700"></canvas><br><br><br>'

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

			className : ''

			template : 'add single traffic row markup here'

		# traffic view
		class Views.TrafficViewChart extends Marionette.CompositeView

			className : 'row'

			template : '<add traffic chart markup here'

			itemView : TrafficSingle

			onShow:->
				data = @getChartData()
				# setup the chart here`


			#generate the chart data
			getChartData:->

				# all data is stored in collection