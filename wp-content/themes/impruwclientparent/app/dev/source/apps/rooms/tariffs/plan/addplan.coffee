define ['app', 'controllers/base-controller',
        'text!apps/rooms/tariffs/plan/templates/addPlan.html'], (App, AppController, addPlanTpl)->
    App.module "RoomsApp.RoomsTariff.Plan.Add", (Add, App)->
        class AddPlanController extends AppController

            initialize: (opt)->
                @planView = planView = @_getAddPlanView()

                @listenTo planView, "add:plan:details", (data)=>
                    plan = App.request "create:plan:model", data
                    plan.save null,
                        wait: true
                        success: @planSaved


                @show planView

            planSaved: (plan)=>
                pcollection = App.request "get:plans:collection"
                pcollection.add plan
                @planView.triggerMethod "saved:plan"

            # get the packages view
            _getAddPlanView: (plan)->
                new AddPlanView
                    model: plan

        # Edti plan view
        class AddPlanView extends Marionette.ItemView

            tagName: 'form'

            className: 'form-horizontal'

            template: addPlanTpl

            dialogOptions:
                modal_title: 'Add Plan'
                modal_size: 'medium-modal'

            events:
                'click #btn_addplan': ->
                    if @$el.valid()
                        data = Backbone.Syphon.serialize @
                        @trigger "add:plan:details", data

            onSavedPlan: ->
                @$el.parent().find('.alert').remove()
                @$el.parent().prepend '<div class="alert alert-success">You have created a new plan.
                										 Update your tariff by clicking on the plan</div>'
                @$el.find('input').val ''
                @$el.find('textarea').val ''

            # show checkbox
            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()


        # handler
        App.commands.setHandler "show:add:plan", ()->
            new AddPlanController
                region: App.dialogRegion