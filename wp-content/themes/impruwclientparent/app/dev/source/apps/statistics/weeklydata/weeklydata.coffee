define ['app', 'controllers/base-controller'], (App, AppController, layoutTpl)->

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

			template : '<li>on{{formattedDate}} page per visits: {{ga:pageviewsPerVisit}}</li>'

			serializeData:->
				data = super()

				data.formattedDate = ->
					new Date @date

				data

		# create the composite view
		class WeeklyDataView extends Marionette.CompositeView

			template : '<div class="">on{{formattedDate}} single view {{ga:visits}}</div>
						<ul class="week-data"></ul>
						<div class="row statistics-visitor">
						<div class="col-md-8 statistics-tod-visitor">
							
							<h3>Today Visits</h3>
								<div class="today-visits">
								Sunday 
								<h1>5 </h1>
								<span>Visits</span>
								</div>
								<div class="row today-visitor-details">
									<div class="col-md-3"><span class="sm-txt per-data"><span class="glyphicon glyphicon-arrow-up"></span>10%</span></div>
									<div class="col-md-4">150 <span class="glyphicon glyphicon-file"></span> <span class="sm-txt">pageviews</span></div>
									<div class="col-md-5">00:45:00<span class="glyphicon glyphicon-time"></span><i class="fa fa-clock-o"></i> <span class="sm-txt">Avg visit duration</span></div>
								</div>
								<hr>
								<div class="row total-visits">
									<div class="col-md-3">Unique Visits <b>45</b></div>
									<div class="col-md-3">New visits <b>6%</b></div>
									<div class="col-md-3">Pages per visit <b>6.1</b></div>
									<div class="col-md-3">Bounce rate <b>4%</b></div>
								</div>
							
						</div>
						<div class="col-md-4">
							<ul class="list-unstyled weekly-list">
								<li><em>Sun </em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span> <b>12,13,40...</b></li>
								<li><em>Mon</em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-down"></span><b>12,13,40...</b></li>
								<li><em>Tue </em><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-down"></span><b>12,13,40...</b></li>
								<li><em>Wed </em><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span><b>12,13,40...</b></li>
								<li><em>Thu </em><span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span><b>12,13,40...</b></li>
								<li><em>Fri</em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-down"></span><b>12,13,40...</b></li>
								<li><em>Sat</em> <span class="glyphicon glyphicon-user"></span><span class="glyphicon glyphicon-arrow-up"></span><b>12,13,40...</b></li>
							</ul>
						</div>
						</div>
						
						'
						
			itemViewContainer : '.week-data'

			itemView : SingleDayData

			serializeData:->
				data = super()

				data.formattedDate = ->	
					new Date @date

				data

			onBeforeRender:->
				# pick out the model from collection
				return if not @collection
				
				# pop out the last model from collection
				@model = @collection.pop()


		App.commands.setHandler "show:weekly:data", (opt)->
			new WeeklyDataController opt
