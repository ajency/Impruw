define ['app', 'controllers/base-controller', 'apps/statistics/siteanalytics/views'], (App, AppController)->
    App.module 'DashboardApp.Statistics.SiteAnalytics', (SiteAnalytics, App, Backbone, Marionette, $, _)->
        class SiteAnalyticsController extends AppController

            initialize: ->

                # get the weekly collection
                date = new Date()
                endDate = Date.UTC date.getFullYear(), date.getMonth(), date.getDate()

                #set start date one month ago
                startDate = endDate - (30 * 86400000)

                @collection = App.request "get:site:analytics:data", startDate, endDate

                @layout = layout = @_getLayout()

                @listenTo layout, "show", =>
                    @renderCharts startDate, endDate

                @listenTo layout, "date:range:changed", @renderCharts

                @show layout

            renderCharts: (startDate, endDate)=>
                @collection = App.request "get:site:analytics:data", startDate, endDate

                # show over view chart
                overviewChart = new SiteAnalytics.Views.OverviewChartView
                    collection: @collection
                @layout.overviewChartRegion.show overviewChart

                # show traffic list
                trafficViewChart = new SiteAnalytics.Views.TrafficViewChart
                    collection: @collection
                @layout.trafficChartRegion.show trafficViewChart


            _getLayout: ->
                new SiteAnalyticsLayout


        class SiteAnalyticsLayout extends Marionette.Layout

            className: 'row'

            template: '<div class="row chart-datepicker">
            							<div class="col-md-3">
            								<div class="left-inner-addon ">
            									<span class="glyphicon glyphicon-calendar"></span>
            									<input type="text" class="datepicker "/>
            								</div>
            							</div>
            							<div class="col-md-8 ">
            								<ul class="list-inline select-type duration">
            									<li data-duration="7">Week</li>
            									<li class="active" data-duration="30">Month</li>
            									<li data-duration="180">6 Months</li>
            								</ul>
            							</div>
            						</div>
            						<div id="overview-chart-region"></div>
            						<div id="traffic-chart-region"></div>'

            events:
                'change .datepicker': ->
                    date = new Date()
                    endDate = Date.UTC date.getFullYear(), date.getMonth(), date.getDate()
                    #duration 	= parseInt $(e.target).attr 'data-duration'
                    startDate = endDate - (30 * 86400000)
                    @trigger "date:range:changed", start, end

                'click .duration > li': (e)->

                    # set active class
                    $(e.target).addClass 'active'
                    .siblings().removeClass 'active'

                    date = new Date()
                    endDate = Date.UTC date.getFullYear(), date.getMonth(), date.getDate()
                    duration = parseInt $(e.target).attr 'data-duration'
                    startDate = endDate - (duration * 86400000)
                    @trigger "date:range:changed", startDate, endDate



            regions:
                overviewChartRegion: '#overview-chart-region'
                trafficChartRegion: '#traffic-chart-region'

            onShow: ->
                @$el.find('.datepicker').datepicker()
        # to = new Date()
        # from = new Date(to.getTime() - 1000 * 60 * 60 * 24 * 14)
        # @$el.find('.datepicker').DatePicker
        # 	  	inline: true
        # 	  	date: [from, to]
        # 	  	calendars: 2
        # 	  	mode: 'range'
        # 	  	current: new Date(to.getFullYear(), to.getMonth() - 1, 1)
        # 	  	onChange:(dates,el)->
        # 			date = 	dates[0].getDate()+' '+dates[0].getMonthName(true)+', '+
        # 	      		dates[0].getFullYear()+' - '+
        # 	      		dates[1].getDate()+' '+dates[1].getMonthName(true)+', '+
        # 	      		dates[1].getFullYear()

        # 			$('#date-range-field span').text date


        App.commands.setHandler "show:site:analytics:data", (opt)->
            new SiteAnalyticsController opt
