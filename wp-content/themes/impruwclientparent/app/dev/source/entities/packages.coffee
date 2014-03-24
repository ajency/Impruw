define ["app", 'backbone'], (App, Backbone) ->

	# App state entity
	App.module "Entities.Packages", (Packages, App, Backbone, Marionette, $, _)->

		# package model
		class Package extends Backbone.Model

			name : 'package'

			defaults : ->
				package_name : ''
				package_description : ''

		# package collection
		class PackageCollection extends Backbone.Collection

			model : Package

			url : ->
				"#{AJAXURL}?action=fetch-packages"


		# create  a package collection
		packageCollection = new PackageCollection


		API = 
			getPackagesCollection:->
				packageCollection
				packageCollection.fetch()
				packageCollection

			createPlanModel:(data = {})->
				new Package data



		App.reqres.setHandler "get:packages:collection", ->
			API.getPackagesCollection()

		App.reqres.setHandler "create:plan:model", (data)->
			API.createPlanModel data