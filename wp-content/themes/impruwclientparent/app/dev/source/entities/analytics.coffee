define ['app'
		'backbone'],(App, Backbone)->

		App.module "Entities.Analytics", (Analytics, App, Backbone, Marionette, $, _)->

			#Analytics Model
			class Analytics.AnalyticsModel extends Backbone.Model

				idAttribute : 'date'

				parse :(resp)->
					# convert in proper format
					resp['ga:avgTimeOnSite'] = resp['ga:avgTimeOnSite'].toFixed(2)
					resp['ga:pageviewsPerVisit'] = resp['ga:pageviewsPerVisit'].toFixed(2)
					resp['ga:visitBounceRate'] = resp['ga:visitBounceRate'].toFixed(2)
					resp

			#Analytics Collection
			class Analytics.AnalyticsCollection extends Backbone.Collection

				# startDate : Date.parse(new Date().toDateString())

				# endDate : Date.parse(new Date().toDateString())

				model : Analytics.AnalyticsModel

				comparator :(model)->
				  	-model.get 'date'

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
							metrices	: 'ga:visits,ga:visitBounceRate,ga:avgTimeOnSite,ga:uniquePageviews,ga:visitBounceRate,ga:avgTimeOnSite,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces'
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

					# dummy data
					# collection.set [{"date":1.3956192e+12,"ga:visits":35,"ga:newVisits":24,"ga:visitBounceRate":34.2857142857,"ga:avgTimeOnSite":295.228571429,"ga:uniquePageviews":124,"ga:pageviews":169,"ga:pageviewsPerVisit":4.82857142857},{"date":1.3957056e+12,"ga:visits":16,"ga:newVisits":14,"ga:visitBounceRate":25,"ga:avgTimeOnSite":660.5,"ga:uniquePageviews":80,"ga:pageviews":151,"ga:pageviewsPerVisit":9.4375},{"date":1.395792e+12,"ga:visits":23,"ga:newVisits":17,"ga:visitBounceRate":8.69565217391,"ga:avgTimeOnSite":316.304347826,"ga:uniquePageviews":95,"ga:pageviews":144,"ga:pageviewsPerVisit":6.26086956522},{"date":1.3958784e+12,"ga:visits":20,"ga:newVisits":18,"ga:visitBounceRate":25,"ga:avgTimeOnSite":179.1,"ga:uniquePageviews":66,"ga:pageviews":74,"ga:pageviewsPerVisit":3.7},{"date":1.3959648e+12,"ga:visits":22,"ga:newVisits":18,"ga:visitBounceRate":18.1818181818,"ga:avgTimeOnSite":182.772727273,"ga:uniquePageviews":81,"ga:pageviews":109,"ga:pageviewsPerVisit":4.95454545455},{"date":1.3960512e+12,"ga:visits":0,"ga:newVisits":0,"ga:visitBounceRate":0,"ga:avgTimeOnSite":0,"ga:uniquePageviews":0,"ga:pageviews":0,"ga:pageviewsPerVisit":0},{"date":1.3961376e+12,"ga:visits":1,"ga:newVisits":1,"ga:visitBounceRate":100,"ga:avgTimeOnSite":0,"ga:uniquePageviews":1,"ga:pageviews":1,"ga:pageviewsPerVisit":1},{"date":1.396224e+12,"ga:visits":9,"ga:newVisits":7,"ga:visitBounceRate":11.1111111111,"ga:avgTimeOnSite":75,"ga:uniquePageviews":30,"ga:pageviews":34,"ga:pageviewsPerVisit":3.77777777778}]
					# return collection
					
					date = new Date()
					endDate = Date.UTC date.getFullYear(),date.getMonth(),date.getDate()

					#set start date one month ago
					startDate = endDate - 7 * 86400000
					params = 
						metrices	: 'ga:visits,ga:newVisits,ga:visitBounceRate,ga:avgTimeOnSite,ga:uniquePageviews,ga:visitBounceRate,ga:pageviews,ga:pageviewsPerVisit'
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