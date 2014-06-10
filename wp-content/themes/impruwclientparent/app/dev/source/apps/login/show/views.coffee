define ['app'
		'tpl!apps/login/show/templates/login'],
		(App, loginTpl)->
	
			App.module 'LoginApp.Show.View', (View, App)->

				class View.LoginView extends Marionette.ItemView

					className : 'modal-dialog'

					template : loginTpl

					dialog : 
						backdrop : 'static'
						keyboard : false