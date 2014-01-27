
define ['marionette'], (Marionette) ->

	class Marionette.Region.Dialog extends Marionette.Region

		#initiate modal on show
		onShow :(view)->

			@setupBindings view

			options = if view.dialog then view.dialog else {}
			
			_.defaults options,{}

			@$el.modal(options)

			@$el.modal 'show'

			@$el.on 'hidden.bs.modal', ()=>
				@closeDialog()


		setupBindings :(view)->

			@listenTo view, 'dialog:close', @closeDialog
			@listenTo view, 'dialog:resize', @resizeDialog


		closeDialog : ()->
			@close()
			@$el.empty()

			