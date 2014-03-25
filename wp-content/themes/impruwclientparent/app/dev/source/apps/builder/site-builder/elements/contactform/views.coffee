define ['app'
		'text!apps/builder/site-builder/elements/contactform/templates/contactform.html'],(App,  contactformTpl)->

			# Row views
			App.module 'SiteBuilderApp.Element.ContactForm.Views', (Views, App, Backbone, Marionette, $, _)->

				# Menu item view
				class Views.ContactFormView extends Marionette.ItemView

					className : 'contactform'

					template : contactformTpl

					# set the class name before element is rendered
					onBeforeRender:->
						@className += " " + Marionette.getOption this,'clsName'

					onShow:->
						clsName = Marionette.getOption @,'clsName'
						@$el.addClass clsName