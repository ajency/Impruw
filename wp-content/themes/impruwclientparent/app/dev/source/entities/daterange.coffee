define ["app", 'backbone', 'moment'], (App, Backbone, moment) ->

    # App state entity
    App.module "Entities.DateRange", (DateRange, App, Backbone, Marionette, $, _)->

        # daterange model
        class DateRange extends Backbone.Model

            name: 'daterange'

            defaults: ->
                'from_date': 0
                'to_date': 0

        # daterange collection
        class DateRangeCollection extends Backbone.Collection

            model: DateRange

            # url to fetch dateranges
            url: ->
                "#{AJAXURL}?action=fetch-daterange"

            # returns all the date range names from the collection
            getDateRanges: ->
                return [] if @length is 0
                @map (model)->
                    name: model.get 'daterange_name'
                    class: _.slugify model.get 'daterange_name'


        # create  a daterange collection
        dateRangeCollection = new DateRangeCollection

        # format pla data
        _.each DATERANGE, (range, index)->
            range['id'] = parseInt range['id']


        # set the daterange collection
        dateRangeCollection.set DATERANGE

        API =
            getDateRangeCollection: ->
                dateRangeCollection

            getDateRangeNameForDate: (date)->
                time = date.getTime()
                checkDateRange = (daterange)->
                    from = daterange.get 'from_date'
                    to = daterange.get 'to_date'

                    from = moment(from).subtract('days', 1)
                    to = moment(to).add('days', 1)

                    moment(time).isAfter(from) and moment(time).isBefore(to)

                # find the daterange model
                models = dateRangeCollection.filter checkDateRange

                if models.length > 0
                    return _.slugify models[0].get 'daterange_name'
                else
                    return ''

            createDateRangeModel: (data = {})->
                daterange = new DateRange data
                daterange

            addDateRange: (d)->
                dateRangeCollection.add d


        App.reqres.setHandler "get:daterange:collection", ->
            API.getDateRangeCollection()

        App.reqres.setHandler "create:new:daterange:model", (data) ->
            API.createDateRangeModel data

        App.reqres.setHandler "get:daterange:name:for:date", (date)->
            API.getDateRangeNameForDate date

        App.commands.setHandler "add:daterange", (daterange)->
            API.addDateRange daterange