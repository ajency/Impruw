define ['app'
		'controllers/base-controller'
		'apps/dashboard/statistics/charts/overview-chart/views'],(App,AppController)->


			App.module "DashboardApp.Statistics.OverViewChart" , (OverViewChart, App)->

				@startWithParent = false

				#data = null
				

				class OverViewChartController extends AppController

					initialize :(options) ->

						@startDate = options.startDate
						@endDate = options.endDate

						@analyticsCollection= null

						@analyticsCollection = App.request "get:missing:data" , @startDate , @endDate
						# console.log JSON.stringify(@analyticsCollection)

						@layout = @_getLayout(@analyticsCollection)

						

						@listenTo @layout, 'button:clicked',(criterion) =>
							@_renderRegion(criterion)


						# show chart
						@listenTo @layout, 'show',->
							console.log "xyz"
							@_renderRegion(App.DashboardApp.Statistics.graphNames)


						# App.commands.setHandler "reload:overview:chart", (start,end)->
						# 	OverViewChartController._renderRegion graphNames

						@show @layout,
							loading : true

					_getLayout:(analyticsCollection)->
						new OverViewChart.Views.Layout
							collection : analyticsCollection


					_renderRegion:(requiredGraphs)->
						
						#get the required data from the offline store
						analyticsCollection = App.request "get:analytics:by:date" , @startDate , @endDate
						#convert the existing array of models to a JSON array of objects
						analyticsJSON = _.map analyticsCollection, (analyticsModel)->
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
  
						# pieData = new Array()
						
						# newUserObj = 
						# 	key : "New Users"
						# 	y : 55
							
						# returiningUserObj = 
						# 	key : "Returning Users"
						# 	y : 110				
						
						# pieData.push newUserObj
						# pieData.push returiningUserObj


						 #render the overview chart
						@layout.chartRegion.show @_getChartView(graphData)

						# @layout.pieRegion.show @_getPieView(pieData)


					_getChartView:(chartData)->
						new OverViewChart.Views.Chart
							data : chartData

					# _getPieView:(pieData)->
					# 	new OverViewChart.Views.PieChart
					# 		data : pieData
					


				# OverViewChart.on 'start',(options)->
					#data = options.collection
					#console.log JSON.stringify(data)
				App.commands.setHandler "show:overview:chart",(options)->
					new OverViewChartController
						region : options.region		
						startDate : options.startDate
						endDate : options.endDate


