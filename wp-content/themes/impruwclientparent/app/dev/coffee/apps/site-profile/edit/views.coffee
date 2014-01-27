define ['app'
		'tpl!apps/site-profile/edit/templates/mainview'
		'tpl!apps/site-profile/edit/templates/siteprofile'],
		(App, mainviewTpl, siteprofileTpl)->


			App.module 'SiteProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.SiteProfile extends Marionette.ItemView

					template : siteprofileTpl

					onRender :()->
						console.log @model

					events : 
						'click .save-site-profile' : -> @triggers "save:site:profile"


				class View.MainView extends Marionette.ItemView

					template : mainviewTpl
					
				
			return App.SiteProfileApp.Edit.View