
define ['marionette','mustache', 'text!configs/marionette/templates/modal.html'], (Marionette, Mustache ,modalTpl) ->

	class Marionette.Region.Dialog extends Marionette.Region

		template : modalTpl

		# override open method
		open:(view)->
			options = if view.dialogOptions then view.dialogOptions else {}
			wrapper = Mustache.to_html modalTpl, @_getOptions options
			@$el.html(wrapper)
			@$el.find('.modal-body').append(view.el);

		#initiate modal on show
		onShow :(view)->

			@setupBindings view

			@$el.modal()

			@$el.modal 'show'

			@$el.on 'hidden.bs.modal', ()=>
				@closeDialog()

		# get options
		_getOptions:(options)->

			_.defaults options,
						modal_title : ''


		setupBindings :(view)->

			@listenTo view, 'dialog:close', @closeDialog
			@listenTo view, 'dialog:resize', @resizeDialog


		closeDialog:()->
			@close()
			@$el.empty()

			