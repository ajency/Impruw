define ['app'
		'backbone'],(App, Backbone)->

		App.module "Entities.Analytics", (Analytics, App, Backbone, Marionette, $, _)->

			#Analytics Model
			class Analytics.AnalyticsModel extends Backbone.Model

				idAttribute : 'date'

			#Analytics Collection
			class Analytics.AnalyticsCollection extends Backbone.Collection

				startDate : Date.parse(new Date().toDateString())

				endDate : Date.parse(new Date().toDateString())

				model : Analytics.AnalyticsModel

				
					


			#Public API for antity
			API = 

				# create a empty collection of analytics and store it in offline store
				createStoreCollection:->
					analyticsCollection = new Analytics.AnalyticsCollection
					App.request "set:collection", 'analyticscollection', analyticsCollection

				#get full collection from offline store
				getAllAnalyticsCollection:(start, end)->
					analyticsCollection = App.request "get:collection", "analyticscollection"

					if start >= analyticsCollection.startDate 
						# ...get data for the specified date range
						analyticsCollection
					
					else
						analyticsCollection = API.fetchAnalytics(start,analyticsCollection.startDate)
						App.execute "reload:overview:chart" ,start, end
						analyticsCollection
						

				#get the collection from offline store by date
				getAnalyticsCollectionByDate:(startDate, endDate)->
						analyticsCollection = App.request "get:collection", 'analyticscollection'
					
					# if start >= analyticsCollection.startDate 

						console.log startDate+"     "+endDate


						# ...get data for the specified date range
						analyticsArray = analyticsCollection.filter (analytics)->
							analytics.id >= startDate && analytics.id <=endDate
						#console.log "arraay"+JSON.stringify(analyticsArray)
						analyticsArray
					
					# else
					# 	fetchAnalytics(start,analyticsCollection.startDate)
					# 	analyticsArray = getAnalyticsCollection(start,end)
					# 	#console.log "array"+analyticsArray
					# 	analyticsArray


				getMissingDataForDateRange:(startDate,endDate)->
						analyticsCollection = App.request "get:collection", 'analyticscollection'
						# App.DashboardApp.Statistics.fetchCount = 0
						#for s from startDate to endDate
						start = startDate
						until start>endDate

							#if value for s exists 
							if analyticsCollection.get(start)

								#s + iday
								#console.log "data available for "+start
								start = start + 86400000

							#else if it doesnt exists
							else 
	
								#for e from s to end 
								end = start
								until end > endDate

									#if value for e doesnt exist
									if not analyticsCollection.get(end)
										# e + 1 day
										#console.log "data not available for "+end
										end = end + 86400000

									#else if it exists
									else
										# e - 1 day
										end = end - 86400000

										#quit e loop
										break

								#fromstart to end to fetch
								analyticsCollection = API.fetchAnalytics start, end
								# App.DashboardApp.Statistics.fetchCount = App.DashboardApp.Statistics.fetchCount+1
								console.log App.DashboardApp.Statistics.fetchCount
								console.log " super fetch for "+start+"   to  "+end
								#s=e+1day
								start = end+86400000


							
								
								
							

						analyticsCollection = App.request "get:collection", 'analyticscollection'
						


						analyticsCollection






					

				#fetch the collection from the server
				fetchAnalytics:(start, end)->

					console.log "fetching from "+start+" to "+end
					analyticsCollection = App.request "get:collection", 'analyticscollection'

					analyticsCollection.url = "#{AJAXURL}?action=get_analytics_data"

					analyticsCollection.startDate = start

					#fetch the data from server add to the existing collection
					analyticsCollection.fetch
						reset : false
						remove : false
						add : true
						data :
							metrices	: 'ga:visits,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces'
							start_date 	: start
							end_date 	: end
							ids			: 81856773
						# success

					# success=()->
					# 	alert App.DashboardApp.Statistics.fetchCount
					# 	App.DashboardApp.Statistics.fetchCount = App.DashboardApp.Statistics.fetchCount-1



					#sort collection according to date
					analyticsCollection.comparator = 'date'
					analyticsCollection.sort()

					

					analyticsCollection





			#request handlers
			App.commands.setHandler "create:analytics:store", ->
				console.log  "collection init"
				API.createStoreCollection()

			App.reqres.setHandler "get:analytics:by:date",(startDate,endDate)->
				API.getAnalyticsCollectionByDate startDate,endDate

			App.reqres.setHandler "fetch:analytics" ,(startDate,endDate)->
				API.fetchAnalytics startDate,endDate

			App.reqres.setHandler "get:all:analytics",(startDate,endDate)->
				API.getAllAnalyticsCollection startDate,endDate

			App.reqres.setHandler "get:missing:data", (startDate,endDate)->
				API.getMissingDataForDateRange startDate,endDate



