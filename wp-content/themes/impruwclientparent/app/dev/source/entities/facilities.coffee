define ['app'
		'backbone'], (App, Backbone)->

		App.module "Entities.Facilities", (Facilities, App, Backbone, Marionette, $, _)->

			#Facility model
			class Facilities.Facility extends Backbone.Model

				idAttribute : 'term_id'

				name : 'facility'


			#Facilities Collection class
			class Facilities.FacilityCollection extends Backbone.Collection

				model : Facilities.Facility

				url :(models = []) ->

                    if models.length is 0 
                        "#{AJAXURL}?action=fetch-facilities"
                    else
                        ids = []
                        ids.push facility.get('term_id') for facility in models
                        ids = ids.join()
                        "#{AJAXURL}?action=facilities&ids=#{ids}"


			#Public API
			API = 
				getFacilities :(param = {})->
					facilities = new Facilities.FacilityCollection
					facilities.fetch
						data : param
					facilities

				createFacilityModel:(data)->
					new Facilities.Facility data
					
			#App request handlers	
			App.reqres.setHandler "get:all:facilities",(options)->
				API.getFacilities()

			App.reqres.setHandler "create:new:facility:model",(data)->
				API.createFacilityModel data
