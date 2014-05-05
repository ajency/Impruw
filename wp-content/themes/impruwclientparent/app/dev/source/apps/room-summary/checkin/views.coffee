define ['app'
        'text!apps/room-summary/checkin/templates/checkinView.html'], (App, checkinformTpl)->
    App.module 'RoomSummaryApp.Checkin.View', (View, App, Backbone, Marionette, $, _)->

        # Genral form
        class View.CheckinForm extends Marionette.ItemView

            tagName: 'form'

            template: checkinformTpl

            className: 'form-horizontal clearfix'

            onShow: ->
                # set the timepicker
                @$el.find('#checkin-time').timepicker
                    'forceRoundTime': true
                    'step': 5

                #check for time format selection
                @$el.find('.radio').click =>
                    _.delay =>
                        @checkTimeFormatSelection()
                    , 10

            checkTimeFormatSelection: =>
                if @$el.find('#tweleve-hour').hasClass 'checked'
                    @$el.find('#checkin-time').timepicker 'remove'
                    @$el.find('#checkin-time').timepicker
                        'timeFormat': 'g:ia'
                        'forceRoundTime': true
                        'step': 5

                else
                    @$el.find('#checkin-time').timepicker 'remove'
                    @$el.find('#checkin-time').timepicker
                        'timeFormat': 'H:i'
                        'forceRoundTime': true
                        'step': 5
            events:
                'click #save-checkin': (e)->
                    e.preventDefault()
                    formdata = Backbone.Syphon.serialize @
                    @trigger "update:checkin:time:click", formdata

            onCheckinTimeUpdated: ->
                @$el.find('.alert').remove()
                @$el.prepend('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Check-in Time Saved.</div>')
						

	
