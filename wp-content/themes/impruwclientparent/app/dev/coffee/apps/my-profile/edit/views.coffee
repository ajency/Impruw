define ['app'
		'tpl!apps/my-profile/edit/templates/mainview'],
		(App, mainviewTpl)->


			App.module 'MyProfileApp.Edit.View', (View, App, Backbone, Marionette, $, _)->

				class View.MainView extends Marionette.ItemView

					template : mainviewTpl

					onRender : ->
						@$el.find('input[type="checkbox"]').checkbox()
						@$el.find('input[type="radio"]').radio()
						@$el.find('select').selectpicker 
												style: 'btn-mini btn-default',
                                        		menuStyle: 'dropdown'
                                                    
					
				
			return App.MyProfileApp.Edit.View