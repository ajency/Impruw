define  ['app','controllers/base-controller', 'text!apps/rooms/tariffs/addtariff/templates/addtariff.html'],(App, AppController, addTariffTpl)->

	App.module "RoomsApp.RoomsTariff.Add", (Add, App)->	

		class AddTariffController extends AppController

			initialize:(opt)->

				if not opt.model
					tariff = App.request "get:tariff", opt.tariffId
				else 
					tariff = opt.model

				@tariffView = tariffView = @_getAddTariffView tariff

				@listenTo tariffView, "add:tariff", (data)=>
					tariff.set data
					tariff.save null,
							wait : true
							success : @tariffSaved

				@show tariffView, 
						loading : true

			tariffSaved:=>
				@tariffView.triggerMethod "saved:tariff"

			# get the packages view
			_getAddTariffView :(tariff)->
				new AddTariffView

		# Edti tariff view
		class AddTariffView extends Marionette.ItemView

			tagName : 'form'

			className : 'form-horizontal'

			template : addTariffTpl

			dialogOptions : 
				modal_title : 'Add Tariff'
				modal_size  : 'medium-modal'

			events:
				'click .update-tariff' : ->
					if @$el.valid()
						data = Backbone.Syphon.serialize @
						@trigger "add:tariff", data

			onSavedTariff:->
				@$el.parent().prepend '<div class="alert alert-success">
								Tariff added succesfully for the plan</div>'

			# show checkbox
			onShow:->
				@$el.find('input[type="checkbox"]').checkbox()


		# handler
		App.commands.setHandler "show:add:tariff", (opt)->

			opts = 
				region : App.dialogRegion
				model : opt.model

			new AddTariffController opts