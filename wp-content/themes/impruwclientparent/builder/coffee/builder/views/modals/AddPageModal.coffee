##
## Map Element
##

define ['builder/views/modals/Modal'
		'tpl!builder/templates/modal/addpage.tpl'
		'global'], (Modal,template, global)->

			class AddPageModal extends Modal

				# id for modal
				id: 'add-page'

				# template
				template : template

				# class Name
				className : 'modal'

				# events
				events:
					'click button.add-new-page' : 'saveNewPage'

				# Initialize
				initialize:(options = {})->

					html = @outerTemplate
									title : 'Add New Page'

					@$el.html html

					$('body').append @$el

					@$el.modal()

					@$el.on 'hidden.bs.modal', (evt)=>
						@$el.find('form').find('div.alert').remove()
						@$el.find('form').find('input[type="reset"]').click()
						
					markup = this.template()

					@$el.find('.modal-content').append markup

					@$el.find('.selectable-layout').selectable
														selected:( event, ui )=>
															@$el.find('input[name="layout_page"]').val $(ui.selected).attr 'data-layout'

				# save new page to DB
				saveNewPage:(evt)->

					form 	= $(evt.target).closest 'form'
					button 	= $ evt.target

					if form.parsley 'validate'
						
						name 	= $(form).find('input[name="page_name"]').val()
						layout 	= $(form).find('input[name="layout_page"]').val()

						params = 
							action 		: 'add-new-page'
							page_name	: _.str.capitalize name
							layout  	: layout

						responseFn = (response)->
							button.text 'Add Page'
							if response.code is 'OK'
								form.prepend '<div class="alert alert-success">New Page added successfully</div>'
								getAppInstance().vent.trigger "new:page:added", response
								form.find('input[type="reset"]').click()
							else
								form.prepend '<div class="alert alert-danger">Failed!! Please try again</div>'

						button.text 'Adding... Please Wait'
						form.find('div.alert').remove()

						$.post AJAXURL, params, responseFn, 'json'