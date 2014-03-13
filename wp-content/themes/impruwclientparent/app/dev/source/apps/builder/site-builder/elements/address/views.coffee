define ['app', 'holder'],(App, Holder)->

	# Row views
	App.module 'SiteBuilderApp.Element.Address.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		#class Views.AddressView extends Marionette.ItemView

			#className : 'address'

		# layouts
	    class Views.AddressView extends Marionette.Layout
	    	# basic template
					template : '<div class="main-test"><div id="test"></div></div>'

					tagName : 'div'

					regions: 			
							elementRegion : '#test'



