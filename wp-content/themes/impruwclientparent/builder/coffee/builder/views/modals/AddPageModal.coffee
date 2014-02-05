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

				#
				initialize:(options = {})->

					html = @outerTemplate
									title : 'Add New Page'

					@$el.html html

					$('body').append @$el

					@$el.modal()

					markup = this.template()

					@$el.find('.modal-content').append markup

					#@$el.find('.modal-body').html roomsview.$el

					#this.listenTo getAppInstance().vent,'room-selected', this.hide

