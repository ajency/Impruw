define ['dashboard-app'
		'tpl!apps/site-profile/edit/templates/mainview'
		'tpl!apps/site-profile/edit/templates/siteprofile'],
		(App, mainviewTpl, siteprofileTpl)->


			App.module 'SiteProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.SiteProfile extends Marionette.ItemView

					template : siteprofileTpl

					onRender :()->
						console.log @model


				class View.MainView extends Marionette.ItemView

					template : mainviewTpl
					
					#itemViewContainer: '#aj-imp-dash-content'

					#temView : View.SiteProfile

				
			return App.SiteProfileApp.Edit.View