define ['app'
		'backbone'],(App, Backbone)->

		App.module "Entities.Analytics", (Analytics, App, Backbone, Marionette, $, _)->

			#Analytics Model
			class Analytics.AnalyticsModel extends Backbone.Model

				idAttribute : 'date'

			#Analytics Collection
			class Analytics.AnalyticsCollection extends Backbone.Collection

				startDate : new Date()

				endDate : new Date()

				model : Analytics.AssociatedModel

				
					


			#Public API for antity
			API = 

				# create a empty collection of analytics and store it in offline store
				createStoreCollection:->
					analyticsCollection = new Analytics.AnalyticsCollection
					App.request "set:collection", 'analyticscollection', analyticsCollection

				#get the collection from offline store by date
				getAnalyticsCollectionByDate:(start, end)->
					analyticsCollection = App.request "get:collection", 'analyticscollection'

					if start < analyticsCollection.startDate 
						# ...fetch data from server
					
					else 
						# ...get data for the specified date range
						analyticsCollection.filter (analytics)->
							analytics.id >= start && analytics.id <=end

				#fetch the collection from the server
				fetchAnalytics:(start, end)->
					analyticsCollection = App.request "get:collection", 'analyticscollection'

					# analyticsCollection.url = "#{AJAXURL}?action=get_analytics_data"
					# console.log  "#{AJAXURL}?action=get_analytics_data"

					# params =
					# 	metrices	: 'ga:visits,ga:visitors,ga:newVisits,ga:pageviews,ga:pageviewsPerVisit,ga:bounces'
					# 	startDate 	: start
					# 	endDate 	: end

					# analyticsCollection.fetch
					# 	data : params

					# console.log JSON.stringify(analyticsCollection)

					analyticsCollection = [{"date":1391212800000,"ga:visits":"0","ga:visitors":"0","ga:newVisits":"0","ga:pageviews":"0","ga:pageviewsPerVisit":"0.0","ga:bounces":"0"},{"date":1391299200000,"ga:visits":"0","ga:visitors":"0","ga:newVisits":"0","ga:pageviews":"0","ga:pageviewsPerVisit":"0.0","ga:bounces":"0"},{"date":1391385600000,"ga:visits":"0","ga:visitors":"0","ga:newVisits":"0","ga:pageviews":"0","ga:pageviewsPerVisit":"0.0","ga:bounces":"0"},{"date":1391472000000,"ga:visits":"0","ga:visitors":"0","ga:newVisits":"0","ga:pageviews":"0","ga:pageviewsPerVisit":"0.0","ga:bounces":"0"},{"date":1391558400000,"ga:visits":"6","ga:visitors":"6","ga:newVisits":"6","ga:pageviews":"19","ga:pageviewsPerVisit":"3.1666666666666665","ga:bounces":"2"},{"date":1391644800000,"ga:visits":"26","ga:visitors":"22","ga:newVisits":"22","ga:pageviews":"116","ga:pageviewsPerVisit":"4.461538461538462","ga:bounces":"5"},{"date":1391731200000,"ga:visits":"38","ga:visitors":"34","ga:newVisits":"33","ga:pageviews":"223","ga:pageviewsPerVisit":"5.868421052631579","ga:bounces":"8"},{"date":1391817600000,"ga:visits":"14","ga:visitors":"12","ga:newVisits":"12","ga:pageviews":"77","ga:pageviewsPerVisit":"5.5","ga:bounces":"3"},{"date":1391904000000,"ga:visits":"12","ga:visitors":"11","ga:newVisits":"11","ga:pageviews":"60","ga:pageviewsPerVisit":"5.0","ga:bounces":"1"},{"date":1391990400000,"ga:visits":"33","ga:visitors":"27","ga:newVisits":"23","ga:pageviews":"184","ga:pageviewsPerVisit":"5.575757575757576","ga:bounces":"13"},{"date":1392076800000,"ga:visits":"30","ga:visitors":"28","ga:newVisits":"24","ga:pageviews":"145","ga:pageviewsPerVisit":"4.833333333333333","ga:bounces":"6"},{"date":1392163200000,"ga:visits":"13","ga:visitors":"10","ga:newVisits":"8","ga:pageviews":"55","ga:pageviewsPerVisit":"4.230769230769231","ga:bounces":"8"},{"date":1392249600000,"ga:visits":"26","ga:visitors":"23","ga:newVisits":"22","ga:pageviews":"125","ga:pageviewsPerVisit":"4.8076923076923075","ga:bounces":"7"},{"date":1392336000000,"ga:visits":"26","ga:visitors":"20","ga:newVisits":"13","ga:pageviews":"149","ga:pageviewsPerVisit":"5.730769230769231","ga:bounces":"3"},{"date":1392422400000,"ga:visits":"14","ga:visitors":"13","ga:newVisits":"12","ga:pageviews":"56","ga:pageviewsPerVisit":"4.0","ga:bounces":"5"},{"date":1392508800000,"ga:visits":"11","ga:visitors":"10","ga:newVisits":"8","ga:pageviews":"49","ga:pageviewsPerVisit":"4.454545454545454","ga:bounces":"4"},{"date":1392595200000,"ga:visits":"31","ga:visitors":"28","ga:newVisits":"25","ga:pageviews":"137","ga:pageviewsPerVisit":"4.419354838709677","ga:bounces":"7"},{"date":1392681600000,"ga:visits":"27","ga:visitors":"26","ga:newVisits":"22","ga:pageviews":"112","ga:pageviewsPerVisit":"4.148148148148148","ga:bounces":"6"},{"date":1392768000000,"ga:visits":"22","ga:visitors":"17","ga:newVisits":"16","ga:pageviews":"134","ga:pageviewsPerVisit":"6.090909090909091","ga:bounces":"4"},{"date":1392854400000,"ga:visits":"14","ga:visitors":"13","ga:newVisits":"13","ga:pageviews":"103","ga:pageviewsPerVisit":"7.357142857142857","ga:bounces":"2"}]

					analyticsCollection





			#request handlers
			App.commands.setHandler "create:analytics:store", ->
				alert "collection init"
				API.createStoreCollection()

			App.reqres.setHandler "get:analytics:by:date",(startDate,endDate)->
				API.getAnalyticsCollectionByDate startDate,endDate

			App.reqres.setHandler "fetch:analytics" ,(startDate,endDate)->
				API.fetchAnalytics startDate,endDate


