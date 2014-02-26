
define ['app', 'controllers/base-controller'
		'apps/leftnav/show/views', 'entities/leftnav'], (App, AppController)->

	App.module 'LeftNav.Show', (Show, App, Backbone, Marionette, $, _)->

		class Show.Controller extends AppController

			initialize:()->
				@links = App.request 'leftnav:entities'


			showLeftNav : ()->
				view = new Show.View.LeftNav	
							collection : @links

				@show  view, (loading : true)	


	App.LeftNav.Show.Controller		