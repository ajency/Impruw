define ['app', 'controllers/base-controller'
        'apps/my-profile/show/views', 'entities/user'], (App, AppController)->
    App.module 'MyProfileApp.Show', (Show, App, Backbone, Marionette, $, _)->
        class Show.Controller extends AppController

            # initiliaze controller
            initialize: ()->
                userProfile = @userProfile = App.request "get:user:model"

                @layout = @getLayout()

                @listenTo @layout, "show", =>
                    App.execute "show:general:form",
                        region: @layout.generalFormRegion
                        model: @userProfile

                    App.execute "show:password:form",
                        region: @layout.passwordFormRegion
                        model: @userProfile

                    App.execute "show:language:form",
                        region: @layout.languageFormRegion
                        model: @userProfile

                # trigger set:active:menu event
                App.vent.trigger "set:active:menu", 'my-profile'

                # show main layout
                @show @layout


            # get layout
            getLayout: ->
                new Show.View.Layout


            getGeneralFormView: (model) ->
                new Show.View.GeneralForm
                    model: model


            getPasswordFormView: ->
                new Show.View.PasswordForm

            test: ->
                console.log 'hi'


    App.MyProfileApp.Show.Controller