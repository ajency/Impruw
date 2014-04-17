define ['app'
		'text!apps/menu-manager/add/templates/addmenu.html'], (App, addmenuTpl)->
	
			App.module 'MenuManager.Add.Views', (Views, App)->

				class Views.MenuItemView extends Marionette.ItemView

					template : addmenuTpl

					className : 'aj-imp-menu-edit'

					
					events: 
						
						'click .add-menu-item' :->
							formdata = Backbone.Syphon.serialize @
							@trigger "add:menu:item:clicked" , formdata
						
						'change select#aj-imp-page-sel' :-> 
							console.log 'hi'
							#@trigger 'editable:page:changed', $(evt.target).val()
							 console.log $(evt.target).val()    
				
					onNewMenuCreated :->
						@$el.find('.alert').remove()
						@$el.find('.add-menu-form').prepend '<div class="alert alert-success">New menu added </div>'
						@$el.find('#btn_resetmenu').click()

					onShow :->
						pages = App.request "get:editable:pages"
						console.log pages
						_.each pages.models , (model,index) ->
							page_name = model.get 'post_title'
							page_url = model.get 'guid'
							html = "<li rel='#{index}'>
                  						<a style='' class='' >
                  							<span class='text'>#{page_name}</span>
                  						  	<i class='glyphicon glyphicon-ok icon-ok check-mark'></i>
                  						</a>
                					</li>"
							$('#menu-item-page-url').append(html)

						#@$el.find('select#aj-imp-page-sel').val()
						@$el.find('#aj-imp-page-sel').selectpicker
												style 		: 'btn-mini btn-default'
												menuStyle	: 'dropdown'
