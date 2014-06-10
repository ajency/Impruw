define ['app'
		'controllers/base-controller'
		'apps/dashboard/statistics/charts/overview-chart/views'],(App,AppController)->


			App.module "DashboardApp.Statistics.OverViewChart" , (OverViewChart, App)->

				@startWithParent = false

				class OverViewChartController extends AppController

					initialize :(options) ->

						@analyticsCollection = options.collection
						@startDate = options.startDate
						@endDate = options.endDate

						@layout = @_getLayout(@analyticsCollection)

						#listen to the button clicked trigger
						@listenTo @layout, 'button:clicked',(criterion) =>
							@_renderRegion(criterion)

						# show chart
						@listenTo @layout, 'show',->
							@_renderRegion(App.DashboardApp.Statistics.graphNames)

						@show @layout,
							loading : true

					_getLayout:(analyticsCollection)->
						new OverViewChart.Views.Layout
							collection : analyticsCollection


					_renderRegion:(requiredGraphs)->

						start= @startDate
						end = @endDate
						
						#extract the required models from the collection
						analyticsArray = @analyticsCollection.filter (analytics)->
							analytics.id >= start  && analytics.id <= end
						
						#convert the array of models to a JSON array
						analyticsJSON = _.map analyticsArray, (analyticsModel)->							
							analyticsModel.toJSON()


						#convert to proper format for th overview chart
						graphData = new Array()

						_.each requiredGraphs, (graph)->

							if graph == "ga:visits"
						  		graphArray = new Array()
						  		_.each analyticsJSON, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y = _.first _.values _.pick day, 'ga:visits'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			area : true 
						   			key : 'Visits'
						   			values : graphArray
						   			color : "red"
						  		graphData.push graphObject

						  	if graph == "ga:visitors"
						  		graphArray = new Array()
						  		_.each analyticsJSON, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y = _.first _.values _.pick day, 'ga:visitors'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			key : 'Unique Visits'
						   			values : graphArray
						   			color : "green"
						  		graphData.push graphObject

						  	if graph == "ga:newVisits"
						  		graphArray = new Array()
						  		_.each analyticsJSON, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y = _.first _.values _.pick day, 'ga:newVisits'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			key : 'New Visitors'
						   			values : graphArray
						   			color : "blue"
						  		graphData.push graphObject

						  	if graph == "ga:pageviews"
						  		graphArray = new Array()
						  		_.each analyticsJSON, (day)->
						   			dailydata = {}
						   			dailydata.x = _.first _.values _.pick day, 'date' #day.get 'date'
						   			dailydata.y = _.first _.values _.pick day, 'ga:pageviews'#day.get 'ga:visits'
						   			graphArray.push dailydata
						   		graphObject = 
						   			key : 'Page Views'
						   			values : graphArray
						   			color : "yellow"
						  		graphData.push graphObject
 
						#render the overview chart
						@layout.chartRegion.show @_getChartView(graphData)

					_getChartView:(chartData)->
						new OverViewChart.Views.Chart
							data : chartData


				App.commands.setHandler "show:overview:chart",(options)->
					new OverViewChartController
						region : options.region		
						collection : options.collection
						startDate : options.startDate
						endDate :options.endDate

