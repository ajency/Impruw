define ['app'
        'backbone'], (App, Backbone)->
    App.module "Entities.Facilities", (Facilities, App, Backbone, Marionette, $, _)->

        #Facility model
        class Facilities.Facility extends Backbone.Model

            idAttribute: 'term_id'

            name: 'facility'


        #Facilities Collection class
        class Facilities.FacilityCollection extends Backbone.Collection

            model: Facilities.Facility

            url: (models = []) ->
                if models.length is 0
                    "#{AJAXURL}?action=fetch-facilities"
                else
                    ids = []
                    ids.push facility.get('term_id') for facility in models
                    ids = ids.join()
                    "#{AJAXURL}?action=facilities&ids=#{ids}"

        facilities = new Facilities.FacilityCollection
        facilities.fetch()
        #Public API
        API =
            getFacilities: ()->
                facilities

            createFacilityModel: (data)->
                new Facilities.Facility data

        #App request handlers
        App.reqres.setHandler "get:all:facilities", (options)->
            API.getFacilities()

        App.reqres.setHandler "create:new:facility:model", (data)->
            API.createFacilityModel data
