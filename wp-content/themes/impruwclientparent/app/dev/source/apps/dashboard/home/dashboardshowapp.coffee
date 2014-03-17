define ['app', 'controllers/base-controller','text!apps/dashboard/home/templates/dashboard.html'], (App, AppController, dashboardTpl)->

	App.module 'Dashboard.Home', (Home, App, Backbone, Marionette, $, _)->

		# define router
		class DashboardRouter extends Marionette.AppRouter

			appRoutes: 
				'dashboard' : 'show'

			controller : 
				show : ->
					new DashboardHomeController

		# define controller
		class DashboardHomeController extends AppController

			initialize:(opt)->

				# get the layout
				@layout = layout = @_getDashboardLayout()

				# listen to show event
				@listenTo layout, 'show', @showDashboardSections

				# trigger set:active:menu event
				App.vent.trigger "set:active:menu", 'dashboard'

				@show layout

			_getDashboardLayout:->
				new DashboardLayout

			showDashboardSections:->
				#App.execute "show:"


		# define the layout 
		class DashboardLayout  extends Marionette.Layout 

			template : dashboardTpl


		Home.on 'start',->
			new DashboardRouter
