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

				
			analyticsCollection	= new Analytics.AnalyticsCollection	


			#Public API for antity
			API = 
				# get the analytics data
				getAnalyticsData:(start, end)->
					params = 
						metrices	: 'ga:visits,ga:newVisits,ga:visitBounceRate,ga:avgTimeOnSite,ga:uniquePageviews,ga:visitBounceRate,ga:pageviews,ga:pageviewsPerVisit'
						start_date 	: start
						end_date 	: end
						ids			: 81856773

					# analyticsCollection.fetch
					# 				data : params

					analyticsCollection

				# get past one week analytics data
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


			App.reqres.setHandler "get:weekly:data", ->
				API.getWeeklyData()

			App.reqres.setHandler "get:site:analytics:data",(start, end)->
				API.getAnalyticsData start, end
			