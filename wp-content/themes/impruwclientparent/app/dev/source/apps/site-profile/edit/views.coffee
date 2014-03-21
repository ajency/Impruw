define ['app'
		'text!apps/site-profile/edit/templates/mainview.html'
		'text!apps/site-profile/edit/templates/siteprofile.html'],
		(App, mainviewTpl, siteprofileTpl)->


			App.module 'SiteProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.SiteProfile extends Marionette.ItemView

					template : siteprofileTpl

					events : 
						'click .save-site-profile' : -> @triggers "save:site:profile"


				class View.MainView extends Marionette.ItemView

					template : mainviewTpl
					
					