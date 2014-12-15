define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.Site", (Site, App, Backbone, Marionette, $, _)->

        # Site Model
        class SiteModel extends Backbone.Model

            idAttribute: 'site_id'

            name: 'site'

        # create the empty site model
        siteModel = new SiteModel


        # PUBLIC API FOR ENitity
        API =
        # get site model
            getSiteModel: ()->
                siteModel = new SiteModel
                siteModel.fetch
                    data :
                        'action' : 'read-language-based-site'
                siteModel

            getLanguageBasedSite : ( language )->
                siteModelByLang = new SiteModel
                siteModelByLang.fetch
                    data :
                        'language' : language
                        'action' : 'read-language-based-site'
                siteModelByLang                

        # get site social
            getSiteSocial: ->
                new Backbone.Collection [
                    (sociallink: '#facebook', socialname: 'facebook')
                    (sociallink: '#twitter', socialname: 'twitter')
                ]

            updateSiteFeatureCount:(siteid,feature_component,plus_minus) ->
                url = SITEURL+'/api/ajbilling/site_feature_count/'+siteid+'/site/'+feature_component+'/'+plus_minus
                
                options =
                    method : 'PUT'
                    url : url

                $.ajax( options ).done ( response )=>
                    new_feature_count = response.updated_feature_count
                    feature_count = window.PLAN_FEATURE_COUNT
                    feature_count[feature_component][0]['current_count'] =  new_feature_count
                    window.PLAN_FEATURE_COUNT = feature_count

            getSiteProfile: ->


                # REQUEST HANDLERS
        App.reqres.setHandler "get:site:model", ->
            API.getSiteModel()

        App.reqres.setHandler "get:language:based:site",(language) ->
            API.getLanguageBasedSite(language)            

        App.reqres.setHandler "get:site:social", ->
            API.getSiteSocial()

        App.reqres.setHandler "get:site:profile", ->
            API.getSiteProfile()

        App.reqres.setHandler "update:site:feature:count",(siteid,feature_component,plus_minus) ->
            API.updateSiteFeatureCount(siteid,feature_component,plus_minus)


