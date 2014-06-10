define ['app'
        'text!apps/room-summary/policies/templates/policiesView.html'], (App, policiesformTpl)->
    App.module 'RoomSummaryApp.Policies.View', (View, App, Backbone, Marionette, $, _)->

        # Genral form
        class View.PoliciesForm extends Marionette.ItemView

            tagName: 'form'

            template: policiesformTpl

            className: 'form-horizontal clearfix'

            events:
                'click #update_policies': (e)->
                    e.preventDefault()
                    formdata = Backbone.Syphon.serialize @
                    @trigger "update:additional:policy:click", formdata

            onPolicyUpdated: ->
                @$el.find('.alert').remove()
                @$el.prepend('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t('Additional Policies Saved')+'</div>')

	
