define [ 'app', 'controllers/base-controller' ], ( App, AppController )->
    App.module 'StatisticsApp.Visits', ( Visits, App, Backbone, Marionette, $, _ )->
        class Visits.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                siteModel = opts.model

                trackingStatus = siteModel.get 'statistics_enabled'

                if trackingStatus == 'false'
                    @view = @getDisabledTrackingView()

                else
                    @view = @getVisitsView siteModel

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'statistics'

                @show @view,
                    loading : true

            getDisabledTrackingView : ->
                new TrackingDisabledView

            getVisitsView : ( model ) ->
                new VisitsView
                    model : model


        class VisitsView extends Marionette.ItemView

            template : '<div class="aj-imp-dash-content">
                            <header class="aj-imp-dash-header row">
                                <div class="aj-imp-dash-title col-xs-12">
                                    <h2 class="aj-imp-page-head">Visit Summary</h2>
                                </div>
                            </header>
                            <h4 class="aj-imp-sub-head"><small>Use this section to understand your audience visits by day, month and year.</small></h5>

                            <h5 class="aj-imp-sub-head-thin">Visits Overview (with graph)</h5>
                            <div id="widgetIframe">
                                <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitsSummary&actionToWidgetize=index&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
                                </iframe>
                            </div>

                            <h5 class="aj-imp-sub-head-thin">Visits by Day of Week</h5>
                            <div id="widgetIframe">
                                <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=VisitTime&actionToWidgetize=getByDayOfWeek&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
                                </iframe>
                            </div>

                            <h5 class="aj-imp-sub-head-thin">Visitor map</h5>
                            <div id="widgetIframe">
                                <iframe width="100%" height="350" src="{{piwik_path}}?module=Widgetize&action=iframe&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=visitorMap&idSite={{statistics_enabled}}&period=week&date=yesterday&disableLink=1&widget=1&token_auth={{piwik_token}}" scrolling="no" frameborder="0" marginheight="0" marginwidth="0">
                                </iframe>
                            </div>
                          </div>'

            serializeData : ->
                data = super()
                data.statistics_enabled = parseInt @model.get 'statistics_enabled'
                data

        class TrackingDisabledView extends Marionette.ItemView

            template : '<div class="aj-imp-dash-content">
                            <header class="aj-imp-dash-header row">
                                <div class="aj-imp-dash-title col-xs-12">
                                    <h2 class="aj-imp-page-head">Visit Summary</h2>
                                </div>
                            </header>
                            <h4 class="aj-imp-sub-head"><small>Use this section to understand your audience visits by day, month and year.</small></h5>

                            <h5 class="aj-imp-sub-head-thin">Visits Overview (with graph)</h5>
                            <div id="widgetIframe">
                                The requested website is not found. Please ensure you have enabled the analyics.
                            </div>

                            <h5 class="aj-imp-sub-head-thin">Visits by Day of Week</h5>
                            <div id="widgetIframe">
                                The requested website is not found. Please ensure you have enabled the analyics.
                            </div>

                            <h5 class="aj-imp-sub-head-thin">Visitor map</h5>
                            <div id="widgetIframe">
                                The requested website is not found. Please ensure you have enabled the analyics.
                            </div>
                          </div>'

        App.commands.setHandler "show:visits:view", ( opts ) ->
            new Visits.Controller opts





			
			