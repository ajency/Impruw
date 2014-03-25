define ["app", 'backbone'], (App, Backbone) ->

	# App state entity
	App.module "Entities.Plans", (Plans, App, Backbone, Marionette, $, _)->

		# plan model
		class Plans extends Backbone.Model

			name : 'plan'

			defaults : ->
				plan_name : ''
				plan_description : ''

		# package collection
		class PlanCollection extends Backbone.Collection

			model : Plans

			url : ->
				"#{AJAXURL}?action=fetch-plans"


		# create  a package collection
		planCollection = new PlanCollection


		API = 
			getPlansCollection:->
				planCollection
				planCollection.fetch()
				planCollection

			createPlanModel:(data = {})->
				
				plan = new Plans data
				
				plan



		App.reqres.setHandler "get:plans:collection", ->
			API.getPlansCollection()

		App.reqres.setHandler "create:plan:model", (data)->
			API.createPlanModel data