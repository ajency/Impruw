define ['app'
		'text!apps/my-profile/edit/templates/mainview.html'
		'text!apps/my-profile/edit/templates/generalform.html'
		'text!apps/my-profile/edit/templates/passwordform.html'],
		(App, mainviewTpl, generalformTpl, passwordformTpl)->


			App.module 'MyProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.Layout extends Marionette.Layout

					initialize :->


					# Main edit profile template
					template : mainviewTpl

					# Layout regions
					regions :
						generalFormRegion : '#user-general-form'
						passwordFormRegion: '#form-userpass'

					events : 
						'click #btn_update_language' :(e)->
							data = $(e.target).closest('form').find('select').val()
							@trigger "update:user:language", 'user_language' : data

					# set the flatui checkbox radio and bootstrap select ui 
					onShow : ->
						@$el.find('input[type="checkbox"]').checkbox()
						@$el.find('select').selectpicker()

				# Genral form
				class View.GeneralForm extends Marionette.ItemView

					tagName : 'form'

					template : generalformTpl

					className : 'form-horizontal'

					# set the flatui checkbox radio and bootstrap select ui 
					onRender : ->
						@$el.find('input[type="checkbox"]').checkbox()

					serializeData :=>
						data = super()
						console.log @model.get 'ID'
						data

					events:
						'click #btn-update-info' : (e)->
							if @$el.valid()
								data = Backbone.Syphon.serialize @
								@trigger "update:user:info:click", data

				# Password form
				class View.PasswordForm extends Marionette.ItemView

					tagName : 'form'

					template : passwordformTpl

					className : 'form-horizontal'

					events:
						'click #btn-update-password' : (e)->
							if @$el.valid()
								data = Backbone.Syphon.serialize @
								@trigger "update:user:password", data
