## The main dashboard App
define ['marionette', 'underscore'], (Marionette, _)->
    
    window.App = new Marionette.Application

    # Main app regions
    App.addRegions
        headerRegion: '#header-region'
        elementsBoxRegion: '#elements-box-region'
        builderWrapper: '#builder-region'
        settingsRegion: Marionette.Region.Settings.extend el: '#settings-region'
        loginRegion: Marionette.Region.Dialog.extend el: '#login-region'
        dialogRegion: Marionette.Region.Dialog.extend el: '#dialog-region'
        chooseThemeRegion: '#choose-theme-region'
        unusedElementsRegion: '#fl_menu'

    App.startNewInstance = ->
        instanceId = _.makeid()
        $.ajax
            type: 'GET'
            url: "#{AJAXURL}?action=set-app-instance"
            async: false
            data : 
                instance_id : instanceId
            success : (resp)->
                App.instanceId = resp.instance if resp.success is true
              

    # The default route for app
    App.rootRoute = ""

    # loginRoute in case session expires
    App.loginRoute = "login"

    # on app start
    App.on 'start', ()->
        _.logAppMsg "Application Started...."

    # Reqres handler to return a default region. If a controller is not explicitly specified a
    # region it will trigger default region handler
    App.reqres.setHandler "default:region", ->
        App.builderRegion

    # App command to handle async request and action to be performed after that
    # entities are the the dependencies which trigger a fetch to server.
    App.commands.setHandler "when:fetched", (entities, callback) ->
        xhrs = _.chain([entities]).flatten().pluck("_fetch").value()
        $.when(xhrs...).done ->
            callback()

    # Registers a controller instance
    App.commands.setHandler "register:instance", (instance, id) ->
        App.register instance, id

    # Unregisters a controller instance
    App.commands.setHandler "unregister:instance", (instance, id) ->
        App.unregister instance, id

    # Registers a controller instance
    App.commands.setHandler "register:builder:instance", (instance, id) ->
        App.registerElement instance, id

    # Unregisters a controller instance
    App.commands.setHandler "unregister:builder:instance", (instance, id) ->
        App.unregisterElement instance, id

    App.on "initialize:after", (options) ->
        Pace.on 'done', ->
            Pace.options =
                ajax: false
            $('body').addClass 'pace-min-theme'
            $('#initial-loader').fadeOut 'fast', ->
                $('#initial-loader').remove();

        # create a global site model
        user = App.request "get:user:model"

        App.execute "when:fetched", user, =>
            App.startHistory()
            @rootRoute = if ISTHEMESELECTED is 1 then '' else 'choose-theme'
            App.navigate(@rootRoute, trigger: true)
            

    # let the heart beat :P
    App.execute "heartbeat-api"
    App.startNewInstance()

    App
