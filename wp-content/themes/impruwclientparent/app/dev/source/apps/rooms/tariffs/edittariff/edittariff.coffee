define  ['app','controllers/base-controller', 'text!apps/rooms/tariffs/edittariff/templates/edittariff.html'],(App, AppController, editTariffTpl)->

	App.module "RoomsApp.RoomsTariff.Show", (Show, App)->	

		class EditTariffController extends AppController

			initialize:(opt)->

				if not opt.model
					tariff = App.request "get:tariff", opt.tariffId
				else 
					tariff = opt.model

				@tariffView = tariffView = @_getEditTariffView tariff

				@listenTo tariffView, "update:tariff:details", (data)=>
					tariff.set data
					tariff.save null,
							wait : true
							success : @tariffSaved

				@show tariffView, 
						loading : true

			tariffSaved:=>
				@tariffView.triggerMethod "saved:tariff"

			# get the packages view
			_getEditTariffView :(tariff)->
				new EditTariffView
						model : tariff

		# Edti tariff view
		class EditTariffView extends Marionette.ItemView

			tagName : 'form'

			className : 'form-horizontal'

			template : editTariffTpl

			dialogOptions : 
				modal_title : 'Edit Tariff'
				modal_size  : 'medium-modal'

			events:
				'click .update-tariff' : ->
					if @$el.valid()
						data = Backbone.Syphon.serialize @
						@trigger "update:tariff:details", data

			onSavedTariff:->
				@$el.parent().prepend '<div class="alert alert-success">Saved successfully</div>'

			# show checkbox
			onShow:->
				@$el.find('input[type="checkbox"]').checkbox()


		# handler
		App.commands.setHandler "show:edit:tariff", (opt)->

			opts = 
				region : App.dialogRegion

			if opt.tariffModel
				opts.model = opt.tariffModel
			else 
				opts.tariffId = opt.tariffId

			new EditTariffController opts