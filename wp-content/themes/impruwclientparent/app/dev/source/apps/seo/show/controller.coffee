define [ 'app', 'controllers/base-controller'
         'apps/seo/show/view' ], ( App, AppController )->

    App.module 'SeoApp.Show', ( Show, App, Backbone, Marionette, $, _ )->

        class Show.Controller extends AppController

            initialize : ( options )->

                @view = @getMainView()

                @show @view,
                    loading : true

            getMainView : ->
                new Show.View.SeoView



        App.commands.setHandler "show:seo", ( opts ) ->
                new Show.Controller opts




