define ["app", 'backbone'], (App, Backbone) ->
    App.module "Entities.LanguageFacilities", (LanguageFacilities, App, Backbone, Marionette, $, _)->

    	#Page model
        class LanguageFacilities.FacilityModel extends Backbone.Model
            name: 'languagfacility'
            idAttribute: 'term_id' 

		#Page Collection class
        class LanguageFacilities.FacilityCollection extends Backbone.Collection

            model: LanguageFacilities.FacilityModel

            url: ->
                AJAXURL + '?fetch-language-facility'   

        facilityModel = new LanguageFacilities.FacilityModel 
        facilityCollection = new LanguageFacilities.FacilityCollection
        
        #Public API
        API =

            getFacilities: (editlanguage)->
                facilityCollection.fetch
                    data:
                        editlanguage : editlanguage
                facilityCollection


        App.reqres.setHandler "get:lang:facilities", (editlanguage) ->
            API.getFacilities(editlanguage)             	