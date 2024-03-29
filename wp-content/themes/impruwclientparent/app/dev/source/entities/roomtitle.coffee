define ['app'
        'backbone'], (App, Backbone)->
    App.module "Entities.Room", (Facilities, App, Backbone, Marionette, $, _)->

        #Facility model
        class Facilities.Facility extends Backbone.Model


            #Facilities Collection class
        class Facilities.FacilityCollection extends Backbone.Collection

            model: Facilities.Facility

            url: (models = []) ->
                if models.length is 0
                    "#{AJAXURL}?action=fetch-facilities"
                else
                    ids = []
                    ids.push facility.get('id') for facility in models
                    ids = ids.join()
                    "#{AJAXURL}?action=facilities&ids=#{ids}"


        #Public API
        API =
            getFacilities: (param = {})->
                facilities = new Facilities.FacilityCollection
                facilities.fetch
                    data: param
                facilities

        #App request handlers
        App.reqres.setHandler "get:all:facilities", (options)->
            API.getFacilities();
