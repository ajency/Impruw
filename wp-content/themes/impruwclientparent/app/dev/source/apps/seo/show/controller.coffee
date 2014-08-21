define [ 'app', 'controllers/base-controller'
         'apps/seo/show/view' ], ( App, AppController )->

    App.module 'SeoApp.Show', ( Show, App, Backbone, Marionette, $, _ )->

        class Show.Controller extends AppController

            initialize : ( options )->

                @seoLayoutView = @getMainView()

                @show @seoLayoutView,
                    loading : true

                @listenTo @seoLayoutView, 'show', =>
                    App.execute 'seo:language:selection:app',
                        region: @seoLayoutView.seoLanguageSelection


                @listenTo @seoLayoutView.seoLanguageSelection, "load:seo:page:nav:bar", @_loadNavBar 
                @listenTo @seoLayoutView.seoPageNav, "load:seo:page:content", @_loadSeoPageContent 

            getMainView : ->
                new Show.View.SeoView

            _loadNavBar: (selectedLanguage) =>
                App.execute "show:seo:page:nav:app",
                    region: @seoLayoutView.seoPageNav
                    language: selectedLanguage 

            _loadSeoPageContent: (language, pageId)=>
                App.execute "show:seo:page:content:app",
                    region: @seoLayoutView.seoPageContent
                    language : language
                    pageId : pageId         



        App.commands.setHandler "show:seo", ( opts ) ->
                new Show.Controller opts




