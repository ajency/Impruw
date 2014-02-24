define ['app'],(App)->

	# Row views
	App.module 'SiteBuilderApp.Element.Title.Views', (Views, App, Backbone, Marionette, $, _)->

		# Menu item view
		class Views.TitleView extends Marionette.ItemView

			tagName : 'h2'

			template : ''

			# avoid and anchor tag click events
			# listen to blur event for the text element so that we can save the new edited markup
			# to server. The element will triggger a title:element:blur event on blur and pass the 
			# current markupup as argument
			events:
				'click a'	: (e)-> e.preventDefault()
				'blur'		: -> @trigger "title:element:blur", @$el.html()
						

			# initialize the CKEditor for the text element on show
			# used setData instead of showing in template. this works well
			# using template to load content add the html tags in content
			# hold the editor instance as the element property so that
			# we can destroy it on close of element
			onShow:->
				@$el.attr('contenteditable','true').attr 'id', _.uniqueId 'title-'
				@editor = CKEDITOR.inline document.getElementById @$el.attr 'id'
				@editor.setData _.stripslashes @model.get 'content'

			# destroy the Ckeditor instance to avoiid memory leaks on close of element
			# this.editor will hold the reference to the editor instance
			# Ckeditor has a destroy method to remove a editor instance
			onClose:->
				@editor.destroy()