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
					
					onShow :->
							@$el.validate
								rules: 
									newpassword: "required"
									confirmNewPassword: 
											equalTo: "#newpassword"
						

					onPasswordAjaxResponse :(response)=>
						if response == '0'
							@passwordErrorResponse()
						else
							@passwordSuccessResponse()
					
					passwordErrorResponse :->
						@$el.find('.alert').remove()
						@$el.prepend('<div class="alert alert-success">Password mismatch</div>')

					passwordSuccessResponse :->
						@$el.find('.alert').remove()
						@$el.prepend('<div class="alert alert-success">Password Updated.Login again</div>')