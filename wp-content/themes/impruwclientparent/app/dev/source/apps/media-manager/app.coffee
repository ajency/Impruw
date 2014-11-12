define ['app'
        'controllers/base-controller'
], (App, AppController)->
    App.module 'MediaManager', (MediaManager, App, Backbone, Marionette, $, _)->

        # defineall routers required for the app in MediaManager.Router class
        class MediaManager.Router extends Marionette.AppRouter
            appRoutes:
                'media-manager': 'show'


        # Define the initial controller for the media-manager. this controller will
        # be responsible for getting the initial layout, show the dialog in dialog region
        # also this controller will identify which all sub apps needs to be started
        class ShowController extends AppController

            # initialize
            initialize: (opt = {})->
                @choosedMedia = null

                @layout = layout = @_getLayout()

                @listenTo @layout, "show", =>
                    App.execute "start:media:upload:app", region: layout.uploadRegion
                    App.execute "start:media:grid:app", region: layout.gridRegion

                @show @layout

                # start media manager apps. conditional strating of apps is possible
                # each app needs a region as the argument. Each app will be functional only
                # for that region
                #App.execute "start:media:upload:app", region : layout.uploadRegion
                #App.execute "start:media:grid:app", region : layout.gridRegion


                @listenTo @layout.gridRegion, "media:element:selected", (media)=>
                    @choosedMedia = media
                    
#                    App.execute "show:edit:media",
#                      media,
#                      @layout.editMediaRegion

                @listenTo @layout.uploadRegion, "media:upload:complete", =>
                    App.execute "start:media:grid:app", region: @layout.gridRegion

                @listenTo @layout, "media:selected", =>
                    if not _.isNull @choosedMedia
                        App.vent.trigger "media:manager:choosed:media", @choosedMedia
                        @region.closeDialog()

            #App.getRegion('elementsBoxRegion').hide()

            onClose: ->
                # navigate back to original route. do not trigger the router
                # only navigate
                App.navigate '/'
            #App.getRegion('elementsBoxRegion').unhide()

            # gets the main login view
            _getLayout: ()->
                new OuterLayout


        # this is the outer layout for the media manager
        # this layout contians all the region for the manager.
        # define the region which can be later accessed with layout.{regionName} property
        # this is the main view for the dialog region. dialogOptions property is set to
        # set the modal title
        class OuterLayout extends Marionette.LayoutView

            template: '<ul class="nav nav-tabs">
                          <li class="active all-media-tab"><a href="#all-media-region" data-toggle="tab">{{#polyglot}}Gallery{{/polyglot}}</a></li>
                          <li class="upload-tab"><a href="#upload-region" data-toggle="tab">{{#polyglot}}Upload{{/polyglot}}</a></li>
                          
                          <!--li: a(href="#gallery-region" data-toggle="tab") Gallery-->
                        </ul>
                        <div class="tab-content clearfix">
                          
                          <div id="all-media-region" class="tab-pane active">
                            <div id="grid-region"></div>
                            <!--<div id="edit-media-region" class="col-md-3">-->
                              <!--<div class="pick-image"><span class="glyphicon glyphicon-hand-left"></span>-->
                                <!--<h4>{{#polyglot}}Select from library{{/polyglot}}</h4>-->
                              <!--</div>-->
                            <!--</div>-->
                          </div>
                          <div id="upload-region" class="tab-pane"></div>
                          <div id="gallery-region" class="tab-pane"></div>
                        </div>
                        <div class="media-select">
                          <button class="btn btn-default media-manager-select"><span class="glyphicon glyphicon-ok"></span>&nbsp;{{#polyglot}}Select{{/polyglot}}</button>
                        </div>'

            regions:
                uploadRegion: '#upload-region'
                gridRegion: '#grid-region'
                editMediaRegion: '#edit-media-region'

            dialogOptions:
                modal_title: _.polyglot.t 'Media Manager'
                modal_size: 'wide-modal'

            events:
                'click button.media-manager-select': ->
                    @trigger "media:selected"

            onClose: ->
                #stop listening to event
                App.vent.trigger "stop:listening:to:media:manager"


        #public API
        API =
            show: ()->
                new ShowController
                    region: App.dialogRegion
                    statApp: 'all-media'

            editMedia: (model, region)->


        MediaManager.on "start", ->
            new MediaManager.Router
                controller: API

        # stop listetning to media manager stop
        MediaManager.on "stop", ->
            App.vent.off "media:element:clicked"