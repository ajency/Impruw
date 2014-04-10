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
    if($('#room-booking-calendar').length ===  0)
    	return;
    
    $('#room-booking-calendar').datepicker({
        inline: true,
        numberOfMonths: 2,
        dateFormat: 'yy-mm-dd',
        minDate: new Date(),
        beforeShowDay: showDateRangeClass,
        onChangeMonthYear: displayColorMonthChange,
        onSelect: showData

    });

    //$('.ui-datepicker-current-day').click();
    displayCarouselNav();
    getDateRangeColour();

    /**
     * @param {type} date
     * @returns {Array}
     * 
     * Get the class names for each daterange dates
     */
    function showDateRangeClass(date) {
        var range = true;

        var date_range_slug = getDateRangeClassName(date);

        var date_in_range = DateInRange(date);

        if (date_in_range == -1) {
            range = false;
        }
        var status = getAvailabilityClassName(date);

        var class_name = [range, date_range_slug + ' ' + status];

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
        var date_range_name = '';

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
        var arr = -1;
        for (var i = 0; i < DATERANGE.length; i++) {

            var from_date = DATERANGE[i].from_date;

            var to_date = DATERANGE[i].to_date;

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


    /**
     * 
     * @param {type} date
     * @returns {String}
     * 
     * Returns the availability status of the date
     */
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

    /**
     * Displays the colour of the daterange
     * 
     */
    function getDateRangeColour() {

        for (var i = 0; i < DATERANGE.length; i++) {

            var date_range_name = DATERANGE[i].daterange_name;

            var slug_name = slugify(date_range_name);

            $("." + slug_name).css({'background-color': DATERANGE[i].daterange_colour});
        }
    }
    /**
     * 
     * @param {type} year
     * @param {type} month
     * @param {type} inst
     * Display the color of daterange on month selection change
     */
    function displayColorMonthChange(year, month, inst) {

        setTimeout(function() {
            getDateRangeColour();
        }, 10);
    }

    /**
     * 
     * @param {type} date
     * 
     * Display the selected date and corresponding plans for the date
     */
    function showData(date) {

        displaySelectedDate(date);

        var html = showPlans(date);

        $('#plans-details-region').find('.carousel-inner').empty();

        $('#plans-details-region').find('.carousel-inner').append(html);

        displayCarouselNav();

        setTimeout(function() {
            getDateRangeColour();
            showCarousel();
        }, 10);

    }

    /**
     * 
     * @param {type} date
     * 
     * Display the date selected along with availabilty status
     */
    function displaySelectedDate(date) {

        var selected_date = moment(date).format('D MMM');
        
        $('.display-label').empty();
        
        $('.display-label').prepend("You have selected");
        
        $('.date-range').find('b').text(selected_date);

        $('.status').text(getAvailabilityClassName(date));

    }

    /**
     * 
     * @param {type} date
     * @returns {String}
     * Display all the plans for the selected date
     */
    function showPlans(date) {
        var html = '<div class="item active">\n\
                        <div class="room-booking-plan">\n\
                            <h5>\n\
                                Selected date does not exsists in any of the\n\
                                available dateranges\n\
                            </h5>\n\
                        </div>\n\
                   </div>';

        var range = DateInRange(date);

        if (range === -1)
            return html;

        html = checkTariffForPlanId(DATERANGE[range].id);

        return html;
    }
    
    /**
     * 
     * @param {type} daterange_id
     * @returns {String}
     */
    function checkTariffForPlanId(daterange_id) {
        var html = '';
        var temp = 0;

        if (TARIFF.length === 0)
            return ' <div class="room-booking-plan"><h5>No tariff/plans \n\
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
               /* var plans_name = getPlans(TARIFF[i].plan_id);
                html += '<div class="item">\n\
                                <div class="room-booking-plan">' + plans_name +
                        '</div>\n\
                                <div class="booking-detail">\n\
                                    No tariff data available for selected date\n\
                                </div>\n\
                                </div>';*/
                

            }
        }

        return html;

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