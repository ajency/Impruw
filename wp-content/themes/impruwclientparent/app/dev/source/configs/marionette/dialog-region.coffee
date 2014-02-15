
define ['marionette'], (Marionette) ->

	class Marionette.Region.Dialog extends Marionette.Region

		# override open method
		open:(view)->
			@$el.find('.modal-body').empty().append(view.el);

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


		closeDialog:()->
			@close()
			@$el.find('.modal-body').empty()

			