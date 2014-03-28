define ['app'
		'backbone'],(App, Backbone)->

		App.module "Entities.Analytics", (Analytics, App, Backbone, Marionette, $, _)->

			#Analytics Model
			class Analytics.AnalyticsModel extends Backbone.Model

				idAttribute : 'date'

			#Analytics Collection
			class Analytics.AnalyticsCollection extends Backbone.Collection

				# startDate : Date.parse(new Date().toDateString())

				# endDate : Date.parse(new Date().toDateString())

				model : Analytics.AnalyticsModel

				url :->
					"#{AJAXURL}?action=get_analytics_data"

				
					


			#Public API for antity
			API = 

				# create a empty collection of analytics and store it in offline store
				createStoreCollection:->
					analyticsCollection = new Analytics.AnalyticsCollection
					App.request "set:collection", 'analyticscollection', analyticsCollection

				#get full collection from offline store
				getAllAnalyticsCollection:->
					analyticsCollection = App.request "get:collection", "analyticscollection"

					analyticsCollection
						

				#get the collection from offline store by date
				# getAnalyticsCollectionByDate:(startDate, endDate)->
				# 		analyticsCollection = App.request "get:collection", 'analyticscollection'
					
				# 	# if start >= analyticsCollection.startDate 

				# 		console.log startDate+"     "+endDate


				# 		# ...get data for the specified date range
				# 		analyticsArray = analyticsCollection.filter (analytics)->
				# 			analytics.id >= startDate && analytics.id <=endDate
				# 		#console.log "arraay"+JSON.stringify(analyticsArray)
				# 		analyticsArray
					
				# 	# else
				# 	# 	fetchAnalytics(start,analyticsCollection.startDate)
				# 	# 	analyticsArray = getAnalyticsCollection(start,end)
				# 	# 	#console.log "array"+analyticsArray
				# 	# 	analyticsArray

				#get the missing data for the given date range
				getMissingDataForDateRange:(startDate,endDate)->
						#get collection from offline store
						analyticsCollection = App.request "get:collection", 'analyticscollection'
						#for s from startDate to endDate
						start = startDate
						until start>endDate

							#if value for s exists 
							if analyticsCollection.get(start)
								#s + iday
								start = start + 86400000

							#else if it doesnt exists
							else 
								#for e from s to end 
								end = start
								until end > endDate

									#if value for e doesnt exist
									if not analyticsCollection.get(end)
										# e + 1 day
										end = end + 86400000

									#else if it exists
									else
										# e - 1 day
										end = end - 86400000
										#exit e loop
										break

								#do smart fetch of missing data
								analyticsCollection = API.fetchAnalytics start, end
								start = end+86400000
						
						analyticsCollection

				#fetch the collection from the server
				fetchAnalytics:(start, end)->
					analyticsCollection = App.request "get:collection", 'analyticscollection'

					analyticsCollection.url = "#{AJAXURL}?action=get_analytics_data"

					# analyticsCollection.startDate = start

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
						success :->
							setTimeout ->
								console.log "fetched"
								App.execute "refresh:chart"
								null
							,1000

					#sort collection according to date
					analyticsCollection.comparator = 'date'
					analyticsCollection.sort()
				
					analyticsCollection

				getWeeklyData:->
					collection = new Analytics.AnalyticsCollection
					date = new Date()
					endDate = Date.UTC date.getFullYear(),date.getMonth(),date.getDate()

					#set start date one month ago
					startDate = endDate - 7* 86400000
					params = 
						metrices 	: 'ga:visits,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces'
						start_date 	: startDate
						end_date 	: endDate
						ids			: 81856773

					collection.fetch
								data : params
					collection

			#request handlers
			App.commands.setHandler "create:analytics:store", ->
				API.createStoreCollection()

			App.reqres.setHandler "get:weekly:data", ->
				API.getWeeklyData()

			App.reqres.setHandler "fetch:analytics" ,(startDate,endDate)->
				API.fetchAnalytics startDate,endDate

			App.reqres.setHandler "get:all:analytics",->
				API.getAllAnalyticsCollection()

			App.reqres.setHandler "get:missing:data", (startDate,endDate)->
				API.getMissingDataForDateRange startDate,endDate