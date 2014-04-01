define ['app', 'controllers/base-controller','moment'], (App, AppController, moment)->

	App.module 'DashboardApp.Statistics.WeeklyData', (WeeklyData, App, Backbone, Marionette, $, _)->

		class WeeklyDataController extends AppController

			initialize:->

				# get the weekly collection
				collection = App.request "get:weekly:data"

				view = @_getWeeklyDataView collection

				@show view,
						loading : true


			_getWeeklyDataView:(collection)->
				new WeeklyDataView 
							collection : collection


		class SingleDayData extends Marionette.ItemView

			template : '<li>
							<em>{{weekday}}</em> <span class="glyphicon glyphicon-user"></span>
							<span class="glyphicon glyphicon-arrow-up"></span> 
							<b>{{ga:newVisits}},{{ga:pageviewsPerVisit}},{{ga:pageviews}}...</b>
						</li>'

			serializeData:->
				data = super()

				data.formattedDate = ->
					new Date @date

				data.weekday = ->
					d = new Date @date
					moment(d).format 'ddd'

				data

		# create the composite view
		class WeeklyDataView extends Marionette.CompositeView

			template : '<h4 class="chart-title"> At a glance</h4>
						<div class="row statistics-visitor">
							<div class="col-md-7 statistics-tod-visitor">
								<h3>Today Visits</h3>
								<div class="today-visits">
								{{weekday}} 
								<h1>{{ga:visits}}</h1>
								<span>Visits</span>
								</div>
								<div class="row today-visitor-details">
									<div class="col-md-3 col-xs-3"><span class="sm-txt per-data"><span class="glyphicon glyphicon-arrow-up"></span>{{ga:visitBounceRate}}</span></div>
									<div class="col-md-4 col-xs-4">{{ga:pageviews}} <span class="glyphicon glyphicon-file"></span> <span class="sm-txt">pageviews</span></div>
									<div class="col-md-5 col-xs-5">{{ga:avgTimeOnSite}}<span class="glyphicon glyphicon-time"></span><i class="fa fa-clock-o"></i> <span class="sm-txt">Avg visit duration</span></div>
								</div>
								<hr>
								<div class="row total-visits">
									<div class="col-md-3 col-xs-3">Unique <br>pageviews <b>{{ga:uniquePageviews}}</b></div>
									<div class="col-md-3 col-xs-3">New <br>visits <b>{{ga:newVisits}}</b></div>
									<div class="col-md-3 col-xs-3">Page views<br> per visit <b>{{ga:pageviewsPerVisit}}</b></div>
									<div class="col-md-3 col-xs-3">Visit Bounce <br>rate <b>{{ga:visitBounceRate}}</b></div>
								</div>
							</div>
							<div class="col-md-5 weekly-list">
								<ul class="list-unstyled">
								</ul>
							</div>
						</div>'
						
			itemViewContainer : '.weekly-list'

			itemView : SingleDayData

			serializeData:->
				data = super()

				data.formattedDate = ->	
					new Date @date

				data.weekday = ->
					d = new Date @date
					moment(d).format('dddd')

				data

			onBeforeRender:->
				# pick out the model from collection
				return if not @collection
				
				# pop out the last model from collection
				@model = @collection.shift()

				# sort the models
				@collection.sort()


		App.commands.setHandler "show:weekly:data", (opt)->
			new WeeklyDataController opt
