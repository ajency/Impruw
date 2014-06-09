define ['app'
        'text!apps/my-profile/general/templates/generalform.html'], (App, generalformTpl)->
    App.module 'MyProfileApp.General.View', (View, App, Backbone, Marionette, $, _)->

        # Genral form
        class View.GeneralForm extends Marionette.ItemView

            tagName: 'form'

            template: generalformTpl

            className: 'form-horizontal'


            # set the flatui checkbox radio and bootstrap select ui
            onRender: ->
                @$el.find('input[type="checkbox"]').checkbox()

            onShow: ->
                val = @model.get 'new_feature_alert'
                if val == 'true'
                    @$el.find('.checkbox').addClass('checked')
                else
                    @$el.find('.checkbox').removeClass('checked')


            serializeData: ->
                data = super()
                data = @model.get 'data'
                data

            events:
                'click #btn-update-info': (e)->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "update:user:info:click", data

            onUserInfoUpdated: ->
                @$el.find('.alert').remove()
                @$el.prepend('<div class="alert alert-success">'+_.polyglot.t("User info updated")+'</div>')

	
