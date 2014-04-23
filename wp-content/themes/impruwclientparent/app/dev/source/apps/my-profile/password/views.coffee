define ['app','text!apps/my-profile/password/templates/passwordform.html'],(App, passwordformTpl)->


			App.module 'MyProfileApp.Password.View', (View, App, Backbone, Marionette, $, _)->

				# Password form
				class View.PasswordForm extends Marionette.ItemView

					tagName : 'form'

					template : passwordformTpl

					className : 'form-horizontal password-form'

					events:
						'click #btn-update-password' : (e)->
							if @$el.valid()
								data = Backbone.Syphon.serialize @
								@trigger "update:password:clicked", data

						'blur #currentpass' : ->
							enteredPassword= @$el.find('#currentpass').val()
							@trigger "check:password:current", enteredPassword

					onPasswordCheckResponse :(response)->
						data = response.data
						if data == 0
							@$el.find('.alert').remove()
							@$el.prepend('<div class="alert alert-success">Password mismatch</div>')
							@$el.find('#btn-update-password').attr('disabled':'disabled')
						else
							@$el.find('.alert').remove()
							
