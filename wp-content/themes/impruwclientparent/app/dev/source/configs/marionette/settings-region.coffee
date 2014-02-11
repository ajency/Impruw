
define ['marionette'], (Marionette) ->

	class Marionette.Region.Settings extends Marionette.Region

		#initiate modal on show
		onShow :(view)->
			@$el.dialog
				title : 'Settings'
				close :(e,ui) =>
					@closeDialog()

		closeDialog:->
			@close()
			@$el.dialog "destroy"	