define ['app'
		'tpl!apps/my-profile/edit/templates/mainview'
		'tpl!apps/my-profile/edit/templates/generalform'
		'tpl!apps/my-profile/edit/templates/passwordform'],
		(App, mainviewTpl, generalformTpl, passwordformTpl)->


			App.module 'MyProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.Layout extends Marionette.Layout

					# Main edit profile template
					template : mainviewTpl

					# Layout regions
					regions :
						generalFormRegion : '#user-general-form'
						passwordFormRegion: '#form-userpass'

					# set the flatui checkbox radio and bootstrap select ui 
					onRender : ->
						@$el.find('input[type="checkbox"]').checkbox()
						@$el.find('input[type="radio"]').radio()
						@$el.find('select').selectpicker 
												style: 'btn-mini btn-default',
												menuStyle: 'dropdown'

				# Genral form
				class View.GeneralForm extends Marionette.FormView
					template : generalformTpl


				# Password form
				class View.PasswordForm extends Marionette.FormView
					template : passwordformTpl


			App.MyProfileApp.Edit.View