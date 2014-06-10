define ['app'
		'controllers/base-controller'
		'apps/media/upload/controller'
		'apps/media/grid/controller'
		'apps/media/selected/controller'
		'apps/media/edit-media/controller'], (App, AppController, outerTpl)->

			App.module 'Media', (Media, App, Backbone, Marionette, $, _)->