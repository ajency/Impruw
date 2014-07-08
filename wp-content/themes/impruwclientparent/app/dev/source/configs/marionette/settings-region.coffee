define [ 'marionette' ], ( Marionette ) ->
   class Marionette.Region.Settings extends Marionette.Region

      #initiate modal on show
      onShow : ( view )->
         @$el.draggable
            handle : ".settings-header",
            addClasses : false

         @$el.center( false )

         if  ISTHEMEEDITOR is 'no'
            view.$el.find( 'form .form-group' ).hide()
            view.$el.find( 'form .form-group.edit-by-user' ).show()

      onClose : ->
         @$el.draggable 'destroy'