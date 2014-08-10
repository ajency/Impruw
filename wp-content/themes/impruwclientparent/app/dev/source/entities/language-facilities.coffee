define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.LanguageFacilities", (LanguageFacilities, App, Backbone, Marionette, $, _)->

    	#Facility model
        class LanguageFacilities.FacilityModel extends Backbone.Model
            name: 'languagefacility'
            idAttribute: 'term_id'

		#Collection class
        class LanguageFacilities.FacilityCollection extends Backbone.Collection

            model: LanguageFacilities.FacilityModel

            url: ->
                AJAXURL + '?action=fetch-default-facilities'   

        facilityCollection = new LanguageFacilities.FacilityCollection
        
        
        #Public API
        API =

            getDefaultFacilities:()->
                facilityCollection.fetch()
                facilityCollection

            getEditedLanguageFacilities:(editLang)->
                languageFacilities = new LanguageFacilities.FacilityCollection
                languageFacilities.fetch
                    data:
                        editLang : editLang
                languageFacilities


        #App request handlers
        App.reqres.setHandler "get:default:facilities",->
            API.getDefaultFacilities() 

        App.reqres.setHandler "get:edited:language:facilities",(editLang)->
            API.getEditedLanguageFacilities(editLang)             	