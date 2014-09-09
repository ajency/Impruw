define [
    'app'
    'apps/statistics/show/controller'
    'apps/statistics/realtime/controller'
    'apps/statistics/visits/controller'
    'apps/statistics/traffic/controller'
], (App)->
    App.module 'StatisticsApp', (StatisticsApp, App, Backbone, Marionette, $, _)->
        class StatisticsApp.Router extends Marionette.AppRouter

            appRoutes:
                'statistics': 'show'
                'statistics/realtime': 'realtime'
                'statistics/visits': 'visits'
                'statistics/traffic': 'traffic'


        #public API
        API =
            getSiteModel: ->
                siteProfileModel = App.request "get:site:model"
                siteProfileModel

            show: ()->
                sitemodel = App.request "get:site:model"
                #wait till site model fetched
                App.execute "when:fetched",sitemodel,=>
                    new StatisticsApp.Show.Controller
                        region: App.rightRegion
                        model: sitemodel

            realtime: () ->
                sitemodel = App.request "get:site:model"
                App.execute "when:fetched",sitemodel,=>
                    App.execute "show:realtime:view",
                        region: App.rightRegion
                        model: sitemodel
            visits: () ->
                sitemodel = App.request "get:site:model"
                App.execute "when:fetched",sitemodel,=>
                    App.execute "show:visits:view",
                        region: App.rightRegion
                        model: sitemodel
            traffic: () ->
                sitemodel = App.request "get:site:model"
                App.execute "when:fetched",sitemodel,=>
                    App.execute "show:traffic:view",
                        region: App.rightRegion
                        model: sitemodel


        StatisticsApp.on 'start': ->
            new StatisticsApp.Router
                controller: API