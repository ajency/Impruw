define ['app'
		'tpl!apps/my-profile/edit/templates/mainview'],
		(App, mainviewTpl)->


			App.module 'MyProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.ItemView

					# Main edit profile template
					template : mainviewTpl

					# events hash
					events : 
						'click button[name="btn_saveusergeneral"]' : 'submitUserGeneral'

					# set the flatui checkbox radio and bootstrap select ui 
					onRender : ->
						@$el.find('input[type="checkbox"]').checkbox()
						@$el.find('input[type="radio"]').radio()
						@$el.find('select').selectpicker 
												style: 'btn-mini btn-default',
												menuStyle: 'dropdown'

						@setupFormValidation()

					# setup form validation
					setupFormValidation : ->

						forms = @$el.find('form')

						$.each forms, (index, form)->
							$(form).validate()
							return

					# submit user general
					submitUserGeneral :(evt) ->

						form = $(evt.target).closest 'form'
						console.log form
						if $(form).valid()
							form.submit()
						


			App.MyProfileApp.Edit.View