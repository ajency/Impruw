define ['app'
		'controllers/base-controller'
		'apps/dashboard/statistics/charts/overview-chart/views'],(App,AppController)->


			App.module "DashboardApp.Statistics.OverViewChart" , (OverViewChart, App)->

				@startWithParent = false

				data = null
				graphNames=['ga:visits', 'ga:visitors', 'ga:newVisits', 'ga:pageviews']

				class OverViewChartController extends AppController

					initialize :(options) ->

						@layout = @_getLayout()

						@show @layout

						@listenTo @layout, 'button:clicked',(criterion) =>
							@_renderRegion(criterion)


						# show chart
						@_renderRegion(graphNames)

					_renderRegion:(requiredGraphs)->
						#console.log JSON.stringify(data)
						# mydata = jsonsql.query "select date, ga:visits from json",data
						graphData = new Array()

						_.each requiredGraphs, (graph)->

							if graph == "ga:visits"
						  		graphArray = new Array()
						  		_.each data, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y =parseInt _.first _.values _.pick day, 'ga:visits'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			key : 'Visits'
						   			values : graphArray
						  		graphData.push graphObject

						  	if graph == "ga:visitors"
						  		graphArray = new Array()
						  		_.each data, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y =parseInt _.first _.values _.pick day, 'ga:visitors'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			key : 'Unique Visits'
						   			values : graphArray
						  		graphData.push graphObject

						  	if graph == "ga:newVisits"
						  		graphArray = new Array()
						  		_.each data, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y =parseInt _.first _.values _.pick day, 'ga:newVisits'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			key : 'New Visitors'
						   			values : graphArray
						  		graphData.push graphObject

						  	if graph == "ga:pageviews"
						  		graphArray = new Array()
						  		_.each data, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y =parseInt _.first _.values _.pick day, 'ga:pageviews'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			key : 'Page Views'
						   			values : graphArray
						  		graphData.push graphObject
  
     




						@layout.chartRegion.show @_getChartView(graphData)


					_getChartView:(chartData)->
						new OverViewChart.Views.Chart
							data : chartData


					_getLayout:->
						new OverViewChart.Views.Layout



				OverViewChart.on 'start',(options)->
					data = options.collection
					#console.log JSON.stringify(data)
					new OverViewChartController
						region : options.region		


