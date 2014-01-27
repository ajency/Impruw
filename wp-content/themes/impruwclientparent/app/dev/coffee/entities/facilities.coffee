define ['app'
		'backbone'], (App, Backbone)->

		App.module "Entities.Facilities", (Facilities, App)->

			#Facility model
			class Facilities.Facility extends Backbone.RelationalModel


			#Facilities Collection class
			class Facilities.FacilityCollection extends Backbone.Collection

				model : Facilities.Facility


			#Public API
			API = 
				getFacilities :(param = {})->

					facilities = new Facilities.FacilityCollection
					facilities.fetch
						data : param
					facilities
					
			#App request handlers	
			App.reqres.setHandler "get:all:facilities",(options)->
				API.getFacilities();
