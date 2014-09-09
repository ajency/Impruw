define [ 'app', 'controllers/base-controller' ], ( App, AppController )->
    App.module 'StatisticsApp.Show', ( Show, App, Backbone, Marionette, $, _ )->
        class Show.Controller extends AppController

            # initiliaze controller
            initialize : ( opts )->
                siteModel = opts.model

#                trackingStatus = STATISTICS
                trackingStatus = siteModel.get 'statistics_enabled'

                if trackingStatus == 'false'
                    @view = @getDisabledTrackingView()

                    @listenTo @view, "enable:tracking:for:site", @updateTracking

                else
                    @view = @getStatisticsView siteModel


                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'statistics'

                @show @view,
                    loading : true


            getDisabledTrackingView : ->
                new TrackingDisabledView

            getStatisticsView : ( model )->
                new StatisticsView
                        model : model

            updateTracking : ->
                options =
                    url : AJAXURL,
                    method : 'POST',
                    data :
                        action : 'update-tracking'

                $.ajax( options ).done ( response )=>
                    @trackingUpdated()

                .fail ( resp )->
                        console.log 'error'

            trackingUpdated : =>
                @view.triggerMethod "tracking:updated"


        class TrackingDisabledView extends Marionette.ItemView

            template : '<div id="tracking-container">
                            <div id="disabled_tracking" class="alert alert-info">
                                <p>' + _.polyglot.t( "Eeep" ) + '<br>' + _.polyglot.t( "How do I do that?" ) + '</p>
                                <button id="btn_enable_tracking" class="btn btn-sm btn-embossed aj-imp-orange-btn">Enable Tracking</button>
                            </div>
                       </div>'

            events :
                'click #btn_enable_tracking' : ->
                    @trigger "enable:tracking:for:site"

            onTrackingUpdated : ->
                @$el.find( '#disabled_tracking' ).remove()
                newHtml = '<div class="alert alert-success">' + _.polyglot.t( "You are right on track" ) + '</div>'
                @$el.find( '#tracking-container' ).append( newHtml )

        class StatisticsView extends Marionette.ItemView

            template : '<div style="height:700px">
            						<iframe src="{{piwik_path}}?module=Widgetize&action=iframe&moduleToWidgetize=Dashboard&actionToWidgetize=index&idSite={{statistics_enabled}}&period=week&date=yesterday&token_auth={{piwik_token}}" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="100%"></iframe>
            						</div>'

            serializeData : ->
                data = super()
                data.statistics_enabled = parseInt @model.get 'statistics_enabled'
                data


    App.StatisticsApp.Show.Controller