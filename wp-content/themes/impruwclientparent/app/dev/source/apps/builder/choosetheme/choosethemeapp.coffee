define ['app', 'controllers/base-controller', 'apps/builder/choosetheme/views'], (App, AppController)->
    App.module 'ChooseTheme', (ChooseTheme, App)->

        # define router
        class ChooseThemeRouter extends Marionette.AppRouter

            appRoutes:
                'choose-theme': 'chooseTheme'


        class ChooseThemeController extends AppController

            # initialize the controller
            initialize: ()->

                # get the themes
                themesCollection = App.request "get:themes:collection"

                @view = view = @_getChooseThemeView themesCollection

                @listenViewEvents view

                @show view, loading: true


            listenViewEvents :(view) ->
                @listenTo view, "itemview:choose:theme:clicked", @themeSelected
                @listenTo view, "cancel:theme:switch", @cancelThemeSwitch
                @listenTo view, "choose:site:language", @chooseSiteLanguage
                @listenTo view, "close", @resetRouter

            cancelThemeSwitch :() =>
                @view.close()

            chooseSiteLanguage :(language) =>
                # AJAX 
                $.post "#{AJAXURL}?action=choose-site-language",
                    (
                        site_language : language
                    ), @languageUpdated, 'json'

            languageUpdated:(response) =>
                @view.triggerMethod "site:language:updated"

            resetRouter:=>
                App.navigate ''

            themeSelected: (iv, model)=>
                data =
                    new_theme_id: model.get 'ID'

                if ISTHEMESELECTED is 1
                    data.clone_pages = false

                responseFn = ()=>
                    window.location.href = BUILDERURL
                    #@region.close()

                # assign the new theme to site
                $.post "#{AJAXURL}?action=assign-theme-to-site", data, responseFn, 'json'

            # get the choose theme view
            # accepts a collection object
            _getChooseThemeView: (themesCollection)->
                new ChooseTheme.Views.ChooseThemeView
                    collection: themesCollection


        # set the commands handler for show choose theme
        App.commands.setHandler "show:choose:theme", (opt = {})->
            if not opt.region
                opt.region = App.chooseThemeRegion

            new ChooseThemeController opt


        Controller =
            chooseTheme: ->
                new ChooseThemeController
                    region: App.chooseThemeRegion


        # start the router
        ChooseTheme.on 'start', =>
            new ChooseThemeRouter
                controller: Controller




