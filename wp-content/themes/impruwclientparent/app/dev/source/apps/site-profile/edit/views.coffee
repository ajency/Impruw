define ['app'
		'text!apps/site-profile/edit/templates/mainview.html'
		'text!apps/site-profile/edit/templates/siteprofile.html'],
		(App, mainviewTpl, siteprofileTpl)->


			App.module 'SiteProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->


				class View.MainView extends Marionette.ItemView

					template : mainviewTpl

					onShow:->
						@$el.find('select').selectpicker()

						# set affix
						@$el.find('*[data-spy="affix"]').width @$el.width()
						@$el.find('*[data-spy="affix"]').affix()
					
					