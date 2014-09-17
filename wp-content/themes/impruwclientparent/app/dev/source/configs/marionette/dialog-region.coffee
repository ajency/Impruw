define ['marionette', 'mustache'], (Marionette, Mustache) ->
    class Marionette.Region.Dialog extends Marionette.Region

        template: '<div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" data-dismiss="modal" aria-hidden="true" class="close">&times;</button>
                          <h4 class="modal-title">{{modal_title}}</h4>
                        </div>
                        <div class="modal-body"></div>
                        <div class="modal-footer">
                          
                        </div>
                      </div>
                    </div>'

        # override open method
        open: (view)->
            options = if view.dialogOptions then view.dialogOptions else {}
            options = @_getOptions options
            wrapper = Mustache.to_html @template, options
            @$el.html(wrapper)
            @$el.find('.modal-body').append(view.el);
            @$el.addClass options.modal_size

        #initiate modal on show
        onShow: (view)->
            @setupBindings view

            @$el.modal()

            @$el.modal 'show'

            @$el.on 'hidden.bs.modal', ()=>
                @clearDialog()

        closeDialog: ->
            @$el.modal 'hide'

        # get options
        _getOptions: (options)->
            _.defaults options,
                modal_title: ''
                modal_size: 'wide-modal'


        setupBindings: (view)->
            @listenTo view, 'dialog:close', @closeDialog
            @listenTo view, 'dialog:resize', @resizeDialog


        clearDialog: ()->
            @close()
            @$el.empty()

			