define ['app'
		'controllers/base-controller'
		'nvd3'], (App, AppController, nv)->

			# this is one kinf of chart
			App.module "DashboardApp.Statistics.OverViewChart", (OverViewChart, App)->

				@startWithParent = false

				class Controller extends AppController

					initialize:->
						chart = @_getChartView()
						@show chart, loading : true

					_getChartView:->
						new Chart


				class Chart extends Marionette.ItemView

					className: 'overview-chart'

					template: '<svg style="height:300px"></svg>'

					id : 'overview-chart'

					# add the graph/chart handling code here
					onShow:->

						sinAndCos = ->
							sin = []
							sin2 = []
							cos = []
						  
							#Data is represented as an array of {x,y} pairs.
							i = 0

							while i < 100
								sin.push
									x: i
									y: Math.sin(i / 10)

								sin2.push
									x: i
									y: Math.sin(i / 10) * 0.25 + 0.5

								cos.push
									x: i
									y: .5 * Math.cos(i / 10)

							i++
						  
							#Line chart data should be sent as an array of series objects.
							return [
								{
									values: sin #values - represents the array of {x,y} data points
									key: "Sine Wave" #key - the name of the series.
									color: "#ff7f0e" #color - optional: choose your own line color.
								}
								{
									values: cos
									key: "Cosine Wave"
									color: "#2ca02c"
								}
								{
									values: sin2
									key: "Another sine wave"
									color: "#7777ff"
									area: true 
								}
							]


						nv.addGraph ->
							chart = nv.models.lineChart().margin(left: 100).useInteractiveGuideline(true).transitionDuration(350).showLegend(true).showYAxis(true).showXAxis(true)
							chart.xAxis.axisLabel("Time (ms)").tickFormat d3.format(",r")
							chart.yAxis.axisLabel("Voltage (v)").tickFormat d3.format(".02f")
							myData = sinAndCos()
							d3.select("#overview-chart svg").datum(myData).call chart
							nv.utils.windowResize ->
							chart.update()
							chart


				OverViewChart.on 'start',(options)->
					new Controller 
							region : options.region

