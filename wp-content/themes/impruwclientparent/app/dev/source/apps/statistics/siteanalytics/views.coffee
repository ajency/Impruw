define ['app'], (App)->

	App.module 'DashboardApp.Statistics.SiteAnalytics.Views', (Views, App, Backbone, Marionette, $, _)->

		class Views.OverviewChartView extends Marionette.ItemView

			className : 'row'

			template : 'add overview chart markup here'

			onShow:->
				data = @getChartData()
				# setup the chart here`


			#generate the chart data
			getChartData:->
				# all data is stored in collection
		

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