define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.UserEmails", (UserEmails, App, Backbone, Marionette, $, _)->

        # plan model
        class window.UserEmail extends Backbone.Model

            name: 'user-email'
            idAttribute: 'email'

            defaults: ->
                firstName: 'N/A'
                lastName: 'N/A'
                # dateOfCreation: 'N/A'

            sync: (method, entity, options = {})->
                window._bsync method, entity, options

            url: ->
                return SITEURL+'/api/email'


        # package collection
        class EmailCollection extends Backbone.Collection

            model: UserEmail

            url: ->
                SITEURL+"/api/email/domain/"+DOMAIN_NAME


        API =
            getUserEmailCollection: ->
                userEmailCollection = new EmailCollection
                userEmailCollection.fetch()
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
