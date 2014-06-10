define ['app'
        'text!apps/room-summary/show/templates/mainview.html'], (App, mainviewTpl)->
    App.module 'RoomSummaryApp.Show.View', (View, App, Backbone, Marionette, $, _)->
        class View.Layout extends Marionette.Layout

            initialize: ->

            template: mainviewTpl

            regions:
                checkinRegion: '#check-in-region'
                policiesRegion: '#policies-region'
			

	