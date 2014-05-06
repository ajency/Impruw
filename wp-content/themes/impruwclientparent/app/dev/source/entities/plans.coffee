define ["app", 'backbone'], (App, Backbone) ->

    # App state entity
    App.module "Entities.Plans", (Plans, App, Backbone, Marionette, $, _)->

        # plan model
        class Plan extends Backbone.Model

            name: 'plan'

            defaults: ->
                plan_name: ''
                plan_description: ''


        # package collection
        class PlanCollection extends Backbone.Collection

            model: Plan

            url: ->
                "#{AJAXURL}?action=fetch-plans"


        # create  a package collection
        planCollection = new PlanCollection

        # format pla data
        _.each PLANS, (ele, index)->
            ele['id'] = parseInt ele['id']

        # set plans collection
        planCollection.set PLANS

        API =
            getPlansCollection: ->
                planCollection

            createPlanModel: (data = {})->
                plan = new Plan data
                plan

            getPlanById: (id)->
                plan = planCollection.get parseInt id
                plan

        App.reqres.setHandler "get:plans:collection", ->
            API.getPlansCollection()

        App.reqres.setHandler "create:plan:model", (data)->
            API.createPlanModel data

        App.reqres.setHandler "get:plan:by:id", (id)->
            API.getPlanById id
