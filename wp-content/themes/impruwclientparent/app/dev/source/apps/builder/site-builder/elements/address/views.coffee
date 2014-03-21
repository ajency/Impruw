define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Address.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		#class Views.AddressView extends Marionette.ItemView

			#className : 'address'

		# layouts
		class Views.AddressView extends Marionette.ItemView
			# basic template
			template : 'test'

			className : 'address'

			onShow:->
				alert "dsds"
				@$el.addClass 'address'



