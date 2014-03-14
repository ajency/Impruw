define ['app' 
		 'controllers/base-controller'], (App , AppController)->

			App.module 'FacilitiesApp.Add', (Add, App, Backbone, Marionette, $, _)->

				class AddFacilityController extends AppController

					initialize:(opt)->
						
						# get the composite view 
						@view = @_getAddFacilityView()

						# delete:facility:clicked
						@listenTo @view, "add:new:facility" , @addFacility

						# display the view on the region 
						@show @view

					# delete:facility:clicked
					addFacility :(data)->
						facility = App.request "create:new:facility:model", data
						console.log data
						facility.save null,
									wait : true
									success : @facilityAdded

					facilityAdded :(model)=>
						Marionette.triggerMethod.call @region, "new:facility:added", model
						@view.triggerMethod "facility:added"

					_getAddFacilityView:()->
						new AddFacilityView


				class AddFacilityView extends Marionette.ItemView

					tagName : 'form'

					className : 'facility add'

					template : '<input type="text" name="name" class="form-control input-sm ">
								<span class="input-group-btn add-facility">Add</span>'

					events : 
						'click .add-facility' : ->
							if @$el.valid()
								@trigger "add:new:facility", Backbone.Syphon.serialize @

					onFacilityAdded:->
						@$el.find('input').val ''





				App.commands.setHandler "show:add:facility", (opts) ->

					new AddFacilityController
									region : opts.region
					





