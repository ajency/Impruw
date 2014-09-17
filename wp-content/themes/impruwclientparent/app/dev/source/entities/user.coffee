define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Users", (Users, App, Backbone, Marionette, $, _)->

        # User model
        class Users.UserModel extends Backbone.Model

            name: 'user'
            idAttribute: 'ID'
            user_lang: ''


        user = new Users.UserModel
        user.set USER

        #PUBLIC API
        API =
            getUserProfile: ()->
                user


        #REQUEST HANDLERS
        App.reqres.setHandler "get:user:model", (options = {}) ->
            API.getUserProfile()