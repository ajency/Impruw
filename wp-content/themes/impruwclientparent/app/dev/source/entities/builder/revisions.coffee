define ["app", 'backbone', 'moment','bootbox'], (App, Backbone, moment, bootbox) ->
    App.module "Entities.Revision", (Revision, App, Backbone, Marionette, $, _)->

        # Page Model
        class RevisionModel extends Backbone.Model

            idAttribute: 'ID'

            # defaults for
            defaults: ->
                post_title: ''

            name: 'revision'

            parse: (resp)->
                data = if resp.code is 'OK' then resp.data else resp
                data


        # Page collection
        class RevisionCollection extends Backbone.Collection

            # model
            model: RevisionModel

            comparator: (model)->
                -model.get 'ID'

            url: ->
                "#{AJAXURL}?action=fetch-revisions"

            parse: (resp)->
                data = if resp.code is 'OK' then resp.data else resp
                data


        # object to hold all revisions for different pages
        # format:
        # {
        #   pageId : RevisionCollection,
        #   pageId : RevisionCollection
        # }
        revisionsArray = {}

        # PUBLIC API FOR ENitity
        API =
            getPageRevisions: (pageId)->
                # revisionsCollection = revisionsArray[pageId] || false

                # if not revisionsCollection
                revisionsCollection = new RevisionCollection
                revisionsCollection.fetch
                    data:
                        page_id: pageId
                    # revisionsArray[pageId] = revisionsCollection

                revisionsCollection

            addNewRevision: (pageId, revisionData)->
                revision = new RevisionModel revisionData

                # add to revision collection
                revisionsCollection = revisionsArray[pageId] || false
                if not revisionsCollection
                    revisionsCollection = new RevisionCollection
                    revisionsArray[pageId] = revisionsCollection

                # removes the last model if lenght is already 5
                # revisionsCollection.pop() if revisionsCollection.length is 5

                revisionsCollection.add revision

            restoreRevision : (revData)->
                data = {}
                if revData.revId then data.revision_id = revData.revId
                if revData.siteBackupId then data.site_backup_id = revData.siteBackupId
                $.ajax
                    type: 'GET'
                    url: "#{AJAXURL}?action=restore-page"
                    async: false
                    data : data
                    success : (resp)->

                        if resp.code is 'OK'
                            bootbox.alert "Your page will be restored to the selected point. Please wait until the page reloads."
                            _.delay =>
                                window.location.reload()
                            ,2000
                        # App.instanceId = resp.instance if resp.success is true


            getPages: (param = {})->
                pages

            createNewPage: (data = {})->
                page = new Pages.PageModel data
                page

        # REQUEST HANDLERS
        App.reqres.setHandler "get:page:revisions", (pageId)->
            API.getPageRevisions pageId

        App.commands.setHandler "add:new:revision", (pageId, revisionData)->
            API.addNewRevision pageId, revisionData

        App.reqres.setHandler 'restore:revision', (data)->
            API.restoreRevision data

		