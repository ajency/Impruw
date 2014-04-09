/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

jQuery(document).ready(function($) {

    $('#contact-form-save').click(function() {

        if (!$(this).closest('form').valid())
            return;

        var data = getFormData($(this).closest('form'));

        data['action'] = 'send-contact-form-message';

        $.post(AJAXURL,
                data,
                function(response) {

                    $('#contact-form-save').closest('form').parent().find('.alert').remove();

                    if (response.code === 'OK') {

                        $('#contact-form-reset').click();
                        var html = '<div class="alert alert-success alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Success!</strong> Message sent successfully\
									</div>';

                        $('#contact-form-save').closest('form').before(html);
                        $('#contact-form-save').closest('form').find('input[type="reset"]').click()
                    }
                    else if (response.code === 'ERROR') {

                        $('#contact-form-reset').click();
                        var html = '<div class="alert alert-danger alert-dismissable">\
									  <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
									  <strong>Error!</strong>' + response.message + '\
									</div>';
                        $('#contact-form-save').closest('form').before(html);
                    }

                }, 'json');
    });

    var getFormData = function(form) {

        var serializedData = $(form).serializeArray();

        var data = {};

        $.each(serializedData, function(key, ele) {
            data[ele.name] = ele.value;
        });

        return data;

    }

    // generate the datepicker  for the room booking 
    $('#room-booking-calendar').datepicker({
        inline: true,
        numberOfMonths: 2,
        dateFormat: 'yy-mm-dd',
        beforeShowDay: showDateRangeClass

    });

    //$('.ui-datepicker-current-day').click();

    //getColour();
    // removeHightlight();

    /**
     * @param {type} date
     * @returns {Array}
     * 
     * Get the class names for each daterange dates
     */
    function showDateRangeClass(date) {

        var date_range_slug = getDateRangeClassName(date);

        var status = getAvailabilityClassName(date);

        var class_name = ['true', date_range_slug + ' ' + status];

        return class_name;
    }
    /**
     * 
     * @param {type} date
     * @returns {String}
     *
     *get the class name based on the daterange name
     */
    function getDateRangeClassName(date) {
        var date_range_name = 'h';

        var ar = DateInRange(date);
        
        if (ar === -1)
            return date_range_name

        var class_name = DATERANGE[ar].daterange_name;

        var class_name_slug = slugify(class_name);

        date_range_name = class_name_slug;

        return date_range_name;
    }

    /**
     * 
     * @param {type} date
     * @returns {Number}
     * 
     * Check if date is in range of the dateranges
     */
    function DateInRange(date) {
        console.log(date)
        var arr = -1;
        for (var i = 0; i < DATERANGE.length; i++) {

            var from_date = new Date(DATERANGE[i].from_date);
            console.log(from_date);
            var to_date = new Date(DATERANGE[i].to_date);

            var current_date = new Date(date);

            var range = moment().range(from_date, to_date);

            if (range.contains(current_date)) {

                var arr = i;
                return arr;
                break;
            }

        }
        return arr;
    }

   /**
    * 
    * @param {type} str
    * @returns slug of daterange name
    */
    function slugify(str) {
        var $slug = '';
        var trimmed = $.trim(str);
        $slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
                replace(/-+/g, '-').
                replace(/^-|-$/g, '');
        return $slug.toLowerCase();
    }



    // get class name based on avaialbilty status
    function getAvailabilityClassName(date) {

        var status = 'available';

        for (var i = 0; i < BOOKING.length; i++) {

            var check = moment(BOOKING[i].bdate).isSame(date);

            if (check) {
                status = BOOKING[i].status;
                break;
            }

        }

        return status;
    }







    // remove the current date highlight css 
    function removeHightlight() {


        $("#room-booking-calendar td.ui-datepicker-today\n\
             a.ui-state-highlight").removeClass('ui-state-highlight');

        $("#room-booking-calendar td.ui-datepicker-today \n\
             a.ui-state-active").removeClass('ui-state-active');

    }



    // display the colour on the calender for date ranges 
    function getColour() {

        var classNames = ['green', 'red', 'orange', 'blue', 'pink', 'yellow'];

        var arr = [];
        for (var i = 0; i < DATERANGE.length; i++) {

            var date_range_name = DATERANGE[i].daterange_name;

            var slug_name = slugify(date_range_name);

            arr.push(slug_name);
        }

        $.each(arr, function(key, val) {
            $("." + val).addClass("booking-" + classNames[key]);
        });
    }

    // display the color of daterange on month selection change
    function displayColorMonthChange(year, month, inst) {

        setTimeout(function() {
            getColour();
            removeHightlight();
        }, 10);
    }

    function showCarousel() {
        $('#myCarousel').carousel({
            interval: false
        });
    }

    // display the carousel navigation buttons
    function displayCarouselNav() {
        $('.carousel-control').hide()

        var nav_display = $('.carousel-inner')
                .find('.room-booking-plan .booking-detail').length

        if (nav_display != 0)
            $('.carousel-control').show()
    }

    // display the selected date and corresponding plans for the date
    function showData(date) {

        displaySelectedDate(date);

        var html = showPlans(date);

        $('#plans-details-region').find('.carousel-inner').empty();

        $('#plans-details-region').find('.carousel-inner').append(html);

        displayCarouselNav();

        setTimeout(function() {
            getColour();
            showCarousel();
        }, 10);

    }

    // display the date selected along with availabilty status
    function displaySelectedDate(date) {

        var selected_date = moment(date).format('D MMM');

        $('.date-range').find('b').text(selected_date);

        $('.status').text(getAvailabilityClassName(date));

    }


    function showPlans(date) {
        var html = '';

        for (var i = 0; i < DATERANGE.length; i++) {

            var from_date = new Date(DATERANGE[i].from_date);

            var to_date = new Date(DATERANGE[i].to_date);

            var selected_date = new Date(date);

            var range = moment().range(from_date, to_date);

            if (range.contains(selected_date)) {

                html = checkTariffForPlanId(DATERANGE[i].id);

                break;
            }

            else {

                html = '  <div class="item active">\n\
                            <div class="room-booking-plan"><h5>\n\
                            No plans exsists for selected date</h5></div></div>';
            }

        }

        return html;
    }

    function checkTariffForPlanId(daterange_id) {
        var html = '';
        var temp = 0;

        if (TARIFF.length === 0)
            return ' <div class="room-booking-plan"><h5>No plans \n\
                    exsists for selected date</h5></div>';

        for (var i = 0; i < TARIFF.length; i++) {

            if (TARIFF[i].daterange_id == daterange_id) {

                var plans = getPlans(TARIFF[i].plan_id);

                var weekday = TARIFF[i].weekday;

                var weekend = TARIFF[i].weekend;

                if (plans != '') {

                    if (temp == 0) {

                        html += '<div class=" active item">';
                        temp = 1;
                    }
                    else {
                        html += '<div class="item">';
                    }

                    html += '<div class="room-booking-plan">' + plans;

                    html += '<div class="booking-detail">Max Adults Weekdays:<span>' +
                            weekday.max_adults + '</span></div>';

                    html += '<div class="booking-detail">Max Children Weekdays:<span>' +
                            weekday.max_children + '</span></div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="plan-bg">'

                    html += '<h6>Additional Charge Weekdays</h6>' +
                            '<div class="booking-detail">per extra Adult:$'
                            + weekday.extra_adult + '</div>';

                    html += '<div class="booking-detail">per extra Child:$'
                            + weekday.extra_child + '</div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="booking-price">WEEKDAYS <b>$' + weekday.charge + '</b></div>';

                    html += '</div>';

                    html += '<div class="booking-detail">Max Adults Weekend:<span>' +
                            weekend.max_adults + '</span></div>';

                    html += '<div class="booking-detail">Max Children Weekend:<span>' +
                            weekend.max_children + '</span></div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="plan-bg">';

                    html += '<h6>Additional Charge Weekend</h6>' +
                            '<div class="booking-detail">per extra Adult:$'
                            + weekend.extra_adult + '</div>';

                    html += '<div class="booking-detail">per extra Child:$'
                            + weekend.extra_child + '</div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="booking-price">WEEKEND <b>$' + weekend.charge + '</b></div>';

                    html += '</div></div></div>';

                }

            }
            else {
                var plans_name = getPlans(TARIFF[i].plan_id);
                html += '<div class="item">\n\
                                <div class="room-booking-plan">' + plans_name +
                        '</div>\n\
                                <div class="booking-detail">\n\
                                    No tariff data available for selected date\n\
                                </div>\n\
                                </div>';


            }
        }

        return html;

    }

    function getPlans(plan_id) {
        var html = '';

        for (var i = 0; i < PLANS.length; i++) {

            if (PLANS[i].id == plan_id) {

                var plan_name = PLANS[i].plan_name;

                var plan_description = PLANS[i].plan_description;

                html = ' <h5>' + plan_name +
                        '</h5><p>' + plan_description + '</p>';
            }
        }

        return html;
    }


    /* Slimmenu */
    $('.slimmenu').slimmenu({
        resizeWidth: '767',
        collapserTitle: 'Menu',
        animSpeed: 'medium',
        indentChildren: false,
        childrenIndenter: '&nbsp;'
    });
});