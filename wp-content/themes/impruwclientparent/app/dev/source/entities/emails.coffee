define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.UserEmails", (UserEmails, App, Backbone, Marionette, $, _)->

        # plan model
        class UserEmail extends Backbone.Model

            name: 'user-email'
            idAttribute: 'user-email-id'

            defaults: ->
                firstName: 'N/A'
                lastName: 'N/A'


        # package collection
        class EmailCollection extends Backbone.Collection

            model: UserEmail

            url: ->
                "#{AJAXURL}?action=fetch-user-emails"


        API =
            getUserEmailCollection: ->
                userEmailCollection = new EmailCollection
                userEmailCollection

            createUserEmailModel: (data = {})->
                userEmail = new UserEmail data
                userEmail

            getUserEmailById: (emailId)->
                userEmailCollection = new EmailCollection
                userEmail = userEmailCollection.get emailId
                userEmail

        App.reqres.setHandler "get:user:email:collection", ->
            API.getUserEmailCollection()

        App.reqres.setHandler "create:user:email:model", (data)->
            API.createUserEmailModel data

        App.reqres.setHandler "get:user:email:by:id", (emailId)->
            API.getUserEmailById emailId
