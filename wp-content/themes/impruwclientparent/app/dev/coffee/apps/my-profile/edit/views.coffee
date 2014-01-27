define ['app'
		'tpl!apps/my-profile/edit/templates/mainview'],
		(App, mainviewTpl)->


			App.module 'MyProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.ItemView

					template : mainviewTpl
					
				
			return App.MyProfileApp.Edit.View