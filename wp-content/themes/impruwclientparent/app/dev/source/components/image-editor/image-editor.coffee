define ['app', 'marionette'], ( App, Marionette )->
   class InvalidMediaView extends Marionette.ItemView
      template : 'Invalid media argument passed'

   class ImageEditorView extends Marionette.ItemView

      className : 'wp_attachment_holder'

      modelEvents :
         'change' : 'showImageEditor'

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

      save : ->
         @model.fetch()

      refresh : ->
         @model.fetch()

      showImageEditor : =>
         @$el.attr 'id', "image-editor-#{@model.get( 'id' )}"
         window.imageEdit.open @model.get( 'id' ), @model.get( 'nonces' ).edit, @


   imageCropView = ( mediaId = 0 )->
      if mediaId is 0
         return new InvalidMediaView

      if _.isObject mediaId
         media = mediaId
      else if _.isNumber parseInt mediaId
         media = App.request "get:media:by:id", mediaId

      imageEditorView = new ImageEditorView model : media
      imageEditorView


   App.reqres.setHandler "get:image:editor:view", imageCropView