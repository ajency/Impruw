define  ['app','controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/editDaterange.html'],(App, AppController, editDateRangeTpl)->

	App.module "RoomsApp.RoomsTariff.DateRange.Edit", (Edit, App)->	

		class EditDateRangeController extends AppController

			initialize:(opt)->

				{model} = opt

				@dateRangeView = dateRangeView = @_getEditDateRangeView model

				@listenTo dateRangeView, "add:daterange:details", (data)=>
					dateRange = App.request "create:new:daterange:model", data
					#console.log dateRange
					dateRange.save null,
							wait : true
							success : @dateRangeSaved

				@show dateRangeView, 
						loading : true

			dateRangeSaved:(dateRange)=>
				App.execute "add:daterange", dateRange
				@dateRangeView.triggerMethod "saved:daterange"


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