define ['app'
        'text!apps/room-summary/checkin/templates/checkinView.html'], (App, checkinformTpl)->
    App.module 'RoomSummaryApp.Checkin.View', (View, App, Backbone, Marionette, $, _)->

        # Genral form
        class View.CheckinForm extends Marionette.ItemView

            tagName: 'form'

            template: checkinformTpl

            className: 'form-horizontal clearfix'

            onShow: ->
                @$el.find('input[type="radio"]').radiocheck()
                timeFormat = @model.get 'time_format'
                radioHtml = @$el.find('input:radio[name="time_format"]').filter("[value='#{timeFormat}']")
                radioHtml.attr('checked', 'checked')
                radioHtml.parent().parent().find('.radio').addClass('checked')

                # set the timepicker
                @$el.find('.check-time').timepicker
                    'forceRoundTime': true
                    'step': 5

                #check for time format selection
                @$el.find('.radio').click (evt)=>
                    eleId = $(evt.currentTarget).attr 'id'
                    _.delay =>
                        @checkTimeFormatSelection eleId
                    , 10

            checkTimeFormatSelection: (eleId)=>
                if eleId is 'tweleve-hour'
                    @$el.find('.check-time').timepicker 'remove'
                    @$el.find('.check-time').timepicker
                        'timeFormat': 'g:ia'
                        'forceRoundTime': true
                        'step': 5

                else
                    @$el.find('.check-time').timepicker 'remove'
                    @$el.find('.check-time').timepicker
                        'timeFormat': 'H:i'
                        'forceRoundTime': true
                        'step': 5
            events:
                'click #save-checkin': (e)->
                    e.preventDefault()
                    formdata = Backbone.Syphon.serialize @
                    if @$el.valid()
                        @trigger "update:checkin:time:click", formdata

            onCheckinTimeUpdated: ->
                @$el.find('.alert').remove()
                @$el.prepend('<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+_.polyglot.t('Check-in and Check-out time saved')+'</div>')
						

	
