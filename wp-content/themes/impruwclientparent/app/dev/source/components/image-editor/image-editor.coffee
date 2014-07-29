define ['app', 'marionette'], ( App, Marionette )->


	class InvalidMediaView extends Marionette.ItemView
		template : 'Invalid media argument passed'

	class ImageEditorView extends Marionette.ItemView

		className : 'wp_attachment_holder'

		template : '<p class="loading t-a-c">{{#polyglot}}Loading... Please wait...{{/polyglot}}</p>'

		initialize : ( options )->
			super options
			if @model._fetch
				App.execute "when:fetched", [@model], @showImageEditor
			else
				@listenTo @, 'show', @showImageEditor


		# empty implementation to avoid wordpress error
		back : ->
			@trigger "image:editing:cancelled"
			@close()

		save : ->
			@model.fetch()

		refresh : ->
			@model.fetch()

		showImageEditor : =>
			@$el.attr 'id', "image-editor-#{@model.get( 'id' )}"
			window.imageEdit.open @model.get( 'id' ), @model.get( 'nonces' ).edit, @
			_.delay @_addConstraints, 400

		_addConstraints : =>
			img = $ "#image-preview-#{@model.get 'id'}"
			options = Marionette.getOption @, 'options'
			options.onInit = @_iasInit
			@model.on 'change', @showImageEditor
			img.load ->
				_.delay ->
					iasOptions = window.imageEdit.iasapi.getOptions()
					iasOptions.parent.children().unbind 'mousedown'
					_.defaults options, iasOptions
					$(img).imgAreaSelect remove :true
					window.imageEdit.iasapi = $(img).imgAreaSelect options

				, 200

		_iasInit : (img)=>
			$img = $( img )
			$img.next().css( 'position', 'absolute' ).nextAll( '.imgareaselect-outer' ).css( 'position', 'absolute' )
			$('.imgedit-settings').hide()


		onClose : ->
			# img = $ "#image-preview-#{@model.get 'id'}"
			# $(img).imgAreaSelect remove :true


	imageCropView = ( mediaId = 0, options = {} )->
		if mediaId is 0
			return new InvalidMediaView

		if _.isObject mediaId
			media = mediaId
		else if _.isNumber parseInt mediaId
			media = App.request "get:media:by:id", mediaId

		imageEditorView = new ImageEditorView 
									model : media
									options : options
		imageEditorView


	App.reqres.setHandler "get:image:editor:view", imageCropView