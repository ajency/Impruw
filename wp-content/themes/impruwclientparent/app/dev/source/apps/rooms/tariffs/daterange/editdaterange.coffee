define  ['app','controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/editDaterange.html'],(App, AppController, editDateRangeTpl)->

	App.module "RoomsApp.RoomsTariff.DateRange.Edit", (Edit, App)->	

		class EditDateRangeController extends AppController

			initialize:(opt)->

				{model} = opt

				@dateRangeView = dateRangeView = @_getEditDateRangeView model

				@listenTo dateRangeView, "update:daterange:details", (data)=>
					model.save data
					model.save null,
							wait : true
							success : @dateRangeUpdated
				
				@listenTo dateRangeView, "delete:daterange",(data) =>
					model.destroy
							allData: false
							wait:true
							success : @daterangeDeleted

				@show dateRangeView, 
						loading : true

			daterangeDeleted :=>
				@dateRangeView.triggerMethod "deleted:daterange" 

			dateRangeUpdated:(dateRange)=>
				@dateRangeView.triggerMethod "updated:daterange"


			# get the packages view
			_getEditDateRangeView :(dateRange)->
				new EditDateRangeView
						model : dateRange

		# Edti DateRange view
		class EditDateRangeView extends Marionette.ItemView

			tagName : 'form'

			className : 'form-horizontal'

			template : editDateRangeTpl

			dialogOptions : 
				modal_title : 'Edit DateRange'
				modal_size  : 'medium-modal'

			events:
				'click #btn_updatedaterange' : ->
					if @$el.valid()
						data = Backbone.Syphon.serialize @
						@trigger "update:daterange:details", data

				'click #btn_deletedaterange' :(e) ->
					if confirm 'Delete the Date range?'
							e.preventDefault()
							@trigger "delete:daterange", @model

			serializeData: ->
				data = super()
				data.from_date = moment(data.from_date).format "YYYY-MM-DD"
				data.to_date = moment(data.to_date).format "YYYY-MM-DD"
				data
		
			onUpdatedDaterange:->
				@$el.parent().find('.alert').remove()
				@$el.parent().prepend '<div class="alert alert-success">Updated successfully</div>'

			onDeletedDaterange : ->
				@trigger "dialog:close"

			# show checkbox
			onShow:->
				@$el.find('input[type="checkbox"]').checkbox()
				@$el.find('#daterange_color').minicolors()
				@$el.find('.dated').datepicker
										showOtherMonths: true
										selectOtherMonths: true
										dateFormat: "yy-mm-dd"
										
					.prev('.btn').on 'click' , (e) => 
									e && e.preventDefault();
									$(datepickerSelector).focus();
				

		# handler
		App.commands.setHandler "show:edit:daterange", (opts)->
			
			opts = 
				region : App.dialogRegion
				model : opts.model
			
			new EditDateRangeController opts