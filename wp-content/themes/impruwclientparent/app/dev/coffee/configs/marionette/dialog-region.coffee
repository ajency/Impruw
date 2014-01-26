
define ['marionette'], (Marionette) ->

	class Marionette.Region.Dialog extends Marionette.Region

		constructor : ->

			console.log "Into constructor"


		onShow :(view)->

			@setupBindings view

			@$el.modal()

			@$el.modal 'show'

			@$el.on 'hidden.bs.modal', ()=>
				@closeDialog()


		setupBindings :(view)->

			@listenTo view, 'dialog:close', @closeDialog
			@listenTo view, 'dialog:resize', @resizeDialog


		closeDialog : ()->
			@close()
			@$el.empty()

			