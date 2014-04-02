define  ['app','controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/addDaterange.html'],(App, AppController, addDateRangeTpl)->

	App.module "RoomsApp.RoomsTariff.DateRange.Add", (Add, App)->	

		class AddDateRangeController extends AppController

			initialize:(opt)->

				@dateRangeView = dateRangeView = @_getAddDateRangeView()

				@listenTo dateRangeView, "add:daterange:details", (data)=>
					dateRange = App.request "create:new:daterange:model", data
					#console.log dateRange
					dateRange.save null,
					 		wait : true
					 		success : @dateRangeSaved

				@show dateRangeView, 
						loading : true

			dateRangeSaved:=>
				@dateRangeView.triggerMethod "saved:daterange"


			# get the packages view
			_getAddDateRangeView :(dateRange)->
				new AddDateRangeView
						model : dateRange

		# Edti DateRange view
		class AddDateRangeView extends Marionette.ItemView

			tagName : 'form'

			className : 'form-horizontal'

			template : addDateRangeTpl

			dialogOptions : 
				modal_title : 'Add DateRange'
				modal_size  : 'medium-modal'

			events:
				'click #btn_savedaterange' : ->
					if @$el.valid()
						data = Backbone.Syphon.serialize @
						@trigger "add:daterange:details", data

		
			onSavedDaterange:->
				@$el.parent().find('.alert').remove()
				@$el.parent().prepend '<div class="alert alert-success">Saved successfully</div>'
				@$el.find('input').val ''

			# show checkbox
			onShow:->
				@$el.find('input[type="checkbox"]').checkbox()
				@$el.find('.dated').datepicker
										showOtherMonths: true
										selectOtherMonths: true
										dateFormat: "d MM, yy"
										yearRange: '-1:+1'
					.prev('.btn').on 'click' , (e) => 
									e && e.preventDefault();
									$(datepickerSelector).focus();
				

		# handler
		App.commands.setHandler "show:add:daterange", ()->

			new AddDateRangeController
								region : App.dialogRegion