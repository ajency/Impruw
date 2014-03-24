define  ['app','controllers/base-controller', 'text!apps/rooms/tariffs/daterange/templates/addDaterange.html'],(App, AppController, addDateRangeTpl)->

	App.module "RoomsApp.RoomsTariff.DateRange.Add", (Add, App)->	

		class AddDateRangeController extends AppController

			initialize:(opt)->

				@dateRangeView = dateRangeView = @_getAddDateRangeView()

				@listenTo dateRangeView, "update:daterange:details", (data)=>
					dateRange.set data
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
				'click .update-DateRange' : ->
					if @$el.valid()
						data = Backbone.Syphon.serialize @
						@trigger "update:daterange:details", data

			onSavedDaterange:->
				@$el.parent().prepend '<div class="alert alert-success">Saved successfully</div>'

			# show checkbox
			onShow:->
				@$el.find('input[type="checkbox"]').checkbox()


		# handler
		App.commands.setHandler "show:add:daterange", ()->

			new AddDateRangeController
								region : App.dialogRegion