
define ['marionette'], (Marionette) ->

	class Marionette.Region.Settings extends Marionette.Region

		#initiate modal on show
		onShow :(view)->
			@$el.draggable
					handle: ".settings-header",
					addClasses: false

			@$el.center(false)

		onClose:->
			@$el.draggable 'destroy'