define ['app'
		'backbone'],(App, Backbone)->

		App.module "Entities.Analytics", (Analytics, App, Backbone, Marionette, $, _)->

			#Analytics Model
			class AnalyticsModel extends Backbone.Model

				parse :(resp)->
					# set the id for the model
					resp
					 

			#Analytics Collection
			class AnalyticsCollection extends Backbone.Collection

				model : AnalyticsModel

				url :->
					"#{AJAXURL}?action=get_analytics_data"

			
			# last 7 days analytics data
			weeklyAnalytics	= new AnalyticsCollection
			weeklyAnalytics.comparator = 'date'	
			
			# Overview chart analytics
			overViewAnalytics  = new AnalyticsCollection

			# traffic analytics
			trafficAnalytics = new AnalyticsCollection


			
			#Public API for antity
			API = 
				# get the analytics data
				getWeeklyAnalyticsData:()->
					date = new Date()
					endDate = Date.UTC date.getFullYear(),date.getMonth(),date.getDate()
					startDate = endDate - (7 * 86400000)
					metrices = 'ga:newVisits,ga:visits,ga:visitBounceRate,ga:pageviews,ga:pageviewsPerVisit,ga:uniquePageviews,ga:visitors,ga:timeOnSite'
					weeklyAnalytics.fetch
										reset : true
										data :
											start_date  : startDate
											end_date 	: endDate
											metrices	: metrices
											ids         : 81856773
					weeklyAnalytics


				getAnalyticsData:->

			App.reqres.setHandler "get:weekly:data", ->
				API.getWeeklyAnalyticsData()

			App.reqres.setHandler "get:site:analytics:data",(startDate, endDate)->
				API.getAnalyticsData startDate, endDate
			