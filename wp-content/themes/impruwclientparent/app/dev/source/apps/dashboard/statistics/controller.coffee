define ['app'
		'controllers/base-controller'
		'text!apps/dashboard/statistics/templates/layout.html'
		'apps/dashboard/statistics/charts-loader'], (App, AppController, layoutTpl)->

			App.module 'DashboardApp.Statistics', (Statistics, App, Backbone, Marionette, $, _)->

				Statistics.graphNames= ['ga:visits', 'ga:visitors', 'ga:newVisits', 'ga:pageviews']

				class Statistics.Router extends Marionette.AppRouter
					appRoutes :
						'statistics' : 'showStatistics'

				class StatisticsLayout extends Marionette.Layout

					template : layoutTpl

					regions : 
						overviewRegion : '#overview-region'

					events : 
						'click .btn-group > label' : 'changeRange'

					initialize:(options)->
						

					changeRange:(e)->
						date = new Date()
						noOfDays = $(e.target).find('input[type="hidden"]').val()
						endDate = Date.UTC date.getFullYear(),date.getMonth(),date.getDate()
						startDate = endDate - noOfDays*86400000

						@trigger "radio:clicked" ,startDate, endDate 

					onShow:->


				class Statistics.Controller extends AppController

					initialize:->

						self = this
						#set end date today
						date = new Date()
						endDate = Date.UTC date.getFullYear(),date.getMonth(),date.getDate()


						#set start date one month ago
						startDate = endDate - 30* 86400000
						#
						changedStart = startDate
						changedEnd = endDate


						#to be triggered 1 sec after fetch success
						App.commands.setHandler "refresh:chart",->
							self.analyticsCollection = App.request "get:all:analytics"

							self.layout.overviewRegion.show self._loadChartOverview(self.analyticsCollection,changedStart,changedEnd)


						#initial fetch of one month
						@analyticsCollection = App.request "fetch:analytics", startDate, endDate

						#give the collection to the layout for waiting
						@layout = @_getLayout(@analyticsCollection)

						@listenTo @layout, 'radio:clicked',(start,end) =>
							changedStart = start
							changedEnd = end

							#get the missing data for the date range
							@analyticsCollection = App.request "get:missing:data" , start, end
							
							#display the region
							@layout.overviewRegion.show @_loadChartOverview(@analyticsCollection,start,end)

						@listenTo @layout, 'show' ,->

							#code for date range picker
							$( "#from" ).datepicker
								defaultDate: "+1w"
								changeMonth: true
								numberOfMonths: 3
								onClose: ( selectedDate)->
									$( "#to" ).datepicker "option", "minDate", selectedDate 
								
							$( "#to" ).datepicker
								defaultDate: "+1w",
								changeMonth: true,
								numberOfMonths: 3,
								onClose: ( selectedDate )->
									$( "#from" ).datepicker "option", "maxDate", selectedDate 
									
							$('#daterange-apply').on 'click',->
								fromDate = $("#from").datepicker "getDate"
								toDate = $("#to").datepicker "getDate"

								start = Date.UTC fromDate.getFullYear(),fromDate.getMonth(),fromDate.getDate()
								end = Date.UTC toDate.getFullYear(),toDate.getMonth(),toDate.getDate()

								changedStart = start
								changedEnd = end

								self.analyticsCollection = App.request "get:missing:data" , start, end

								self.layout.overviewRegion.show self._loadChartOverview(self.analyticsCollection,start,end)   
						                 				
							@layout.overviewRegion.show @_loadChartOverview(@analyticsCollection,startDate,endDate)         #analyticsCollection.toJSON())

						@show @layout,
							loading : true
						
					_setRegions:(layout)->
						@regions = layout.regions

					_getLayout:(data)->
						new StatisticsLayout
							collection : data

					_loadChartOverview:(analyticsCollection,start,end)-> 
						App.execute "show:overview:chart",
							region : @layout.overviewRegion
							collection :analyticsCollection
							startDate : start
							endDate : end
						
				#PUBLIC API
				API = 
					showStatistics : ()->
						new Statistics.Controller	


				Statistics.on 'start', ->
					new Statistics.Router
								controller : API



				