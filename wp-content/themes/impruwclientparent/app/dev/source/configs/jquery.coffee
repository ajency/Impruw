## You can add your own jquery plugins here
## Or even mixin some extra functions
define ['jquery', 'underscore', 'jqueryvalidate', 'jqueryuii18n' , 'configs/polyglot'], ($, _)->

    # define helper functions
    $.fn.isEmptyColumn = (params = {})->
        @children('.element-wrapper').length is 0

    # check if a row is empty and can be deleted
    $.fn.canBeDeleted = ()->
        columns = @children('.column')
        empty = true
        _.each columns, (column, index)=>
            if not $(column).isEmptyColumn()
                empty = false

        empty


    $.datepicker.setDefaults $.datepicker.regional[WPML_DEFAULT_LANG]

    $.validator.setDefaults
        ignore: []
        errorElement: 'div'
        errorClass: 'field-error'
        validClass: 'field-valid'


    
    $.extend $.validator.messages,
        required: _.polyglot.t("This field is required.")
        remote: _.polyglot.t("Please fix this field.")
        email: _.polyglot.t("Please enter a valid email address.")
        url2: _.polyglot.t("Please enter a valid URL.")
        date: _.polyglot.t("Please enter a valid date.")
        dateISO: _.polyglot.t("Please enter a valid date (ISO).")
        number: _.polyglot.t("Please enter a valid number.")
        digits: _.polyglot.t("Please enter only digits.")
        creditcard: _.polyglot.t("Please enter a valid credit card number.")
        equalTo: _.polyglot.t("Please enter the same value again.")
        maxlength: $.validator.format(_.polyglot.t("Please enter no more than {0} characters."))
        minlength: $.validator.format(_.polyglot.t("Please enter at least {0} characters."))
        rangelength: $.validator.format(_.polyglot.t("Please enter a value between {0} and {1} characters long."))
        range: $.validator.format(_.polyglot.t("Please enter a value between {0} and {1}."))
        max: $.validator.format(_.polyglot.t("Please enter a value less than or equal to {0}."))
        min: $.validator.format(_.polyglot.t("Please enter a value greater than or equal to {0}."))


        # same as url, but TLD is optional
        $.validator.addMethod "url2", (value, element)->
            @.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value)
        , $.validator.messages.url

    $.fn.center = (parent) ->
        if parent
            parent = @parent()
        else
            parent = window

        @css
            position: "fixed"
            top: ((($(parent).height() - @outerHeight()) / 2) + $(parent).scrollTop() + "px")
            left: ((($(parent).width() - @outerWidth()) / 2) + $(parent).scrollLeft() + "px")

        $(window).on 'scroll', =>
            @css
                top: ((($(parent).height() - @outerHeight()) / 2) + $(parent).scrollTop() + "px")

        this

    #programatically select elements
    $.fn.selectSelectableElements = (elementsToSelect)->
        # remove the class ui-selected for the ones not selected
        $(".ui-selected", @).not(elementsToSelect).removeClass("ui-selected")
        # add ui-selected class to the elements to select
        $(elementsToSelect).not(".ui-selected").addClass("ui-selected")

    # scroll to top
    $.scrollTop = ->
        $('html, body').animate
            scrollTop: 0
        , 1000

    $.scrollTo = (ele)->
        $ele = $(ele)
        $('html, body').animate
            scrollTop: $ele.offset().top
        , 1000




    $.fn.removeAllAttr = ->
      attrs = ['class','tabindex','contenteditable','id','spellcheck','role','aria-label','title','aria-describedby','style']
      _.each @ ,(div)->
        # console.log div.attributes
        _.each attrs ,(attr)->
          $(div).removeAttr attr


    # adjust the dimesion of upper content and also the left section and right section
    # Uses jquery to get window dimensions and sets min-height css property so that if height
    # is greater it will not hide the content
    # @uses underscore's _.debounce to avoid repeated function calls on window resize
    adjustPageDim = _.debounce ()->
        height = $(window).height()

        navHeight = $('.aj-imp-left').height()

        minHeight = height - 40

        $('.aj-upper-content').css 'min-height', minHeight

        $('.aj-upper-content').children().css 'min-height', minHeight

        $('.aj-imp-right').css 'min-height', navHeight

        setTimeout (->
          $(window).trigger('resize')
          return
        ), 1000

    , 30

    #setup page initial dimesions
    $(document).ready ()->
        adjustPageDim()
        
    #adjust the page size and dimensions on resize
    $(window).resize adjustPageDim