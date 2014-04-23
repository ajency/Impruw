define ['app','text!apps/my-profile/password/templates/passwordform.html'],(App, passwordformTpl)->


			App.module 'MyProfileApp.Password.View', (View, App, Backbone, Marionette, $, _)->

				# Password form
				class View.PasswordForm extends Marionette.ItemView

					tagName : 'form'

					template : passwordformTpl

					className : 'form-horizontal password-form'

					events:
						'click #btn-update-password' : (e)->
							a=@$el.find('.password-form').validate
								 rules: 
									  newpass1: "required",
									  newpass2: 
												equalTo: "#newpass1"
							console.log a
							#if @$el.valid()
								#data = Backbone.Syphon.serialize @
								#@trigger "update:password:clicked", data

					onPasswordAjaxResponse :(response)->
						if response == 0
							@$el.find('.alert').remove()
							@$el.prepend('<div class="alert alert-success">Password mismatch</div>')
							@$el.find('#btn-update-password').attr('disabled':'disabled')
						else
							@$el.find('.alert').remove()
							@$el.prepend('<div class="alert alert-success">Password Updated.Login again</div>')
							
