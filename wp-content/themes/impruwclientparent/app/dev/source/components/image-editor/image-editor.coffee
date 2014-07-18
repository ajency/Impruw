define ['app', 'marionette'], ( App, Marionette )->
   class InvalidMediaView extends Marionette.ItemView
      template : 'Invalid media argument passed'

   class ImageEditorView extends Marionette.ItemView
      className : 'wp_attachment_holder'

      template : '<p style="text-align: center;margin: 10px">loading... Please wait</p>'

      initialize : ( options )->
         super options
         App.execute "when:fetched", [@model], @showImageEditor

      # empty implementation to avoid wordpress error
      back : ->
      save : ->
      refresh : ->

      showImageEditor : =>
         @$el.attr 'id', "image-editor-#{@model.get( 'id' )}"
         window.imageEdit.open @model.get( 'id' ), @model.get( 'nonces' ).edit, @


   imageCropView = ( mediaId = 0 )->
      if mediaId is 0
         return new InvalidMediaView

      if _.isNumber parseInt mediaId
         media = App.request "get:media:by:id", mediaId
      else if _.isObject mediaId
         media = mediaId
      imageEditorView = new ImageEditorView model : media
      imageEditorView


   App.reqres.setHandler "get:image:crop:view", imageCropView