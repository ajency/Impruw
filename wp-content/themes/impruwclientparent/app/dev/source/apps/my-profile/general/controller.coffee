define ['app', 'controllers/base-controller'
        'apps/my-profile/general/views'], (App, AppController)->
    App.module 'MyProfileApp.General', (General, App, Backbone, Marionette, $, _)->
        class General.Controller extends AppController

            # initiliaze controller
            initialize: (opts)->
                {model} = opts

                @model = model

                @view = @getGeneralFormView model

                @listenTo @view, "update:user:info:click", @updateUserInfo

                @show @view,
                    loading: true



            getGeneralFormView: (model) ->
                new General.View.GeneralForm
                    model: model

            updateUserInfo: (data) =>
                @model.set data
                @model.save null,
                    wait: true
                    success: @userInfoUpdated

            userInfoUpdated: =>
                @view.triggerMethod "user:info:updated"

        App.commands.setHandler "show:general:form", (opts) ->
            new General.Controller opts

			