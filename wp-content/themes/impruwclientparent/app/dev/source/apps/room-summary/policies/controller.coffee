define ['app', 'controllers/base-controller'
		'apps/room-summary/policies/views'], (App, AppController)->

	App.module 'RoomSummaryApp.Policies', (Policies, App, Backbone, Marionette, $, _)->

		class Policies.Controller extends AppController

			# initiliaze controller
			initialize:(opts)->
				
				@sitemodel = sitemodel = opts.model

				console.log @sitemodel 

				@view = @getPoliciesFormView sitemodel

				@listenTo @view,"update:additional:policy:click", @updateAdditionalPolicy
			
				@show @view,
					loading: true
		

			getPoliciesFormView :(model) ->
				new Policies.View.PoliciesForm 
						model : model

			updateAdditionalPolicy :(data) =>
				@sitemodel.set data
				@sitemodel.save null,
							wait:true
							onlyChanged: true
							success	: @policyUpdated
					
			policyUpdated :=>
				@view.triggerMethod "policy:updated"


		App.commands.setHandler "show:policies:form",(opts) ->
			new Policies.Controller opts

			