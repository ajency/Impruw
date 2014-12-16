define ['app'
        'controllers/base-controller'
        'apps/site-profile/edit/views'
        'apps/site-profile/edit/map-view'
        'entities/site'
], ( App, AppController )->
    App.module 'SiteProfileApp.Edit', ( Edit, App, Backbone, Marionette, $, _ )->
        class Edit.Controller extends AppController

            initialize : ( options )->
                @siteProfile = App.request "get:site:model"


            showSiteProfile : ()->
                @view = @getMainView @siteProfile

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'site-profile'

                @show @view, (loading : true)

                #updating the site profile entries
                @listenTo @view, "save:site:profile", @saveSiteProfile

                #trigger media manager popup and start listening to "media:manager:choosed:media" event
                @listenTo @view, "show:media:manager", =>
                    App.navigate "media-manager", trigger : true
                    @listenTo App.vent, "media:manager:choosed:media", ( media )=>
                        @view.triggerMethod "set:logo", media
                        @stopListening App.vent, "media:manager:choosed:media"

                    @listenTo App.vent, "stop:listening:to:media:manager", =>
                        @stopListening App.vent, "media:manager:choosed:media"

                @listenTo @view, 'show:map:view',(address)=>
                    $.get AJAXURL, action : 'get-address-coordinates',(data)=>
                        console.log data
                        @mapModel = new Backbone.Model 
                            address : address
                            latitude : data.latitude
                            longitude : data.longitude
                            position : _.toBoolean data.position
                        console.log @mapModel
                        if not @mapView
                            @mapView = @getMapView @mapModel

                        console.log @
                        @view.triggerMethod 'show:map',@mapView

                        @view.listenTo @mapView, 'save:coordinates',=>
                            data = @mapModel.toJSON()
                            data.action = 'update-address-coordinates'
                            $.post AJAXURL, data

                @listenTo @view, 'refresh:map:view',(address)=>
                    console.log address
                    @mapModel.set 'address', address
                    @mapView.triggerMethod 'render:map'

                #listen to domain mappping event
                @listenTo @view, "update:domain:mapping:name", @addDomainNameForMapping


            saveSiteProfile : ( data ) ->
                @siteProfile.set data
                @siteProfile.save null,
                    wait : true
                    onlyChanged : true
                    success : @siteProfileSuccess

            getMapView : (model)->
                new Edit.View.MapView 
                    model : model

            getMainView : ( model )->
                new Edit.View.MainView
                    model : model

            siteProfileSuccess : () =>
                @view.triggerMethod "site:profile:added"

            addDomainNameForMapping : ( domainName )->
                options =
                    method : 'POST'
                    url : AJAXURL
                    data :
                        'name' : domainName
                        'action' : 'update-domain-name'

                $.ajax( options ).done ( response )=>
                    if response.code == "OK"
                        window.DOMAIN_NAME = domainName
                        @view.triggerMethod "domain:update","Domain added succesfully"
                    else
                        @view.triggerMethod "domain:update", response.msg

