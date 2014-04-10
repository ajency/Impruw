define  ['app','controllers/base-controller', 'text!apps/rooms/tariffs/plan/templates/editPlan.html'],(App, AppController, editPlanTpl)->

	App.module "RoomsApp.RoomsTariff.Plan.Edit", (Edit, App)->	

		class EditPlanController extends AppController

			initialize:(opt)->
				
				{model} = opt

				@planView = planView = @_getEditPlanView model

				@listenTo planView, "update:plan:details", (data)=>
					model.set data
					model.save null,
							wait : true
							success : @planSaved
				
				@listenTo planView, "delete:plan", (model) =>
					model.destroy
							allData : false
							wait : true	
							success : @planDeleted				

				@show planView

			planSaved:()=>
				@planView.triggerMethod "saved:plan"
			
			planDeleted:()=>
				@planView.triggerMethod "deleted:plan"

			# get the packages view
			_getEditPlanView :(plan)->
				new EditPlanView
						model : plan

		# Edti plan view
		class EditPlanView extends Marionette.ItemView

			tagName : 'form'

			className : 'form-horizontal'

			template : editPlanTpl

			dialogOptions : 
				modal_title : 'Edit Plan'
				modal_size  : 'medium-modal'

			events:
				'click #btn_updateplan' : ->
					if @$el.valid()
						data = Backbone.Syphon.serialize @
						@trigger "update:plan:details", data

				'click #btn_deleteplan' :(e) ->
					e.preventDefault()
					if confirm 'The plan will not exist for all the date ranges.
								 Are you sure you want to continue?'
						@trigger "delete:plan", @model

			onSavedPlan:->
				@$el.parent().find('.alert').remove()
				@$el.parent().prepend '<div class="alert alert-success">Updated successfully</div>'
			
			onDeletedPlan:->
				@trigger "dialog:close"

			# show checkbox
			onShow:->
				@$el.find('input[type="checkbox"]').checkbox()


		# handler
		App.commands.setHandler "show:edit:plan", (opts)->
			
			opts = 
				region : App.dialogRegion
				model : opts.model

			new EditPlanController opts