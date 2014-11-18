##
##
##
define ['underscore', 'underscorestring'], (_) ->

    # overwrite template settings defaults to use mustache style
    _.templateSettings =
        evaluate: /\{\[([\s\S]+?)\]\}/g,
        interpolate: /\{\{([\s\S]+?)\}\}/g

    _.mixin _.str.exports()

    # mixin to add additional functionality underscore
    _.mixin

    #multiple app log message in a single statement
        logAppMsg: (msg...)->
            _.each arguments, (l, index)->
                console.log(l)

    #multiple app error message in a single statement
        logAppErr: (msg...)->
            _.each arguments, (l, index)->
                console.log(l)

    # id order array
        idOrder: (arr)->
            newArray = []
            _.each arr, (ele, index)->
                i = ele.split '-'
                newArray.push parseInt i[1]

            newArray

        makeid: ()->
            text = ""
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for i in [0...8]
                text += possible.charAt(Math.floor(Math.random() * possible.length))

            return text

        stripslashes: (str) ->
            return str if not _.isString str
            return str.replace(/\\/g, '')
