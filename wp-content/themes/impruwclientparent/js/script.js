/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

var $ = jQuery.noConflict();
var polyglot;
/*********** contact-form.js ***************/
jQuery(document).ready(function($) {


    //Function to send mail from the Contact Form

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
                } else if (response.code === 'ERROR') {

                    $('#contact-form-reset').click();
                    var html = '<div class="alert alert-danger alert-dismissable">\
                                      <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
                                      <strong>Error!</strong>' + response.message + '\
                                    </div>';
                    $('#contact-form-save').closest('form').before(html);
                }

            }, 'json');
    });

    // Function tp get all formdata from the contact form
    var getFormData = function(form) {

        var serializedData = $(form).serializeArray();

        var data = {};

        $.each(serializedData, function(key, ele) {
            data[ele.name] = ele.value;
        });

        return data;

    }
});

/*************** booking.js ******************/
jQuery(document).ready(function(){
    
    // generate the datepicker  for the room booking
    if ($('#room-booking-calendar').length === 0)
        return;
    
    var polyglot = new Polyglot({
        phrases: PHRASES
    });

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
    showData(new Date());
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

            $("." + slug_name).css({
                'background-color': DATERANGE[i].daterange_colour
            });
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

        $('.display-label').prepend(polyglot.t("You have selected"));

        $('.date-range').find('b').text(selected_date);

        $('.status').text(polyglot.t(getAvailabilityClassName(date)));

    }

    /**
     *
     * @param {type} date
     * @returns {String}
     * Display all the plans for the selected date
     */
    function showPlans(date) {
        var html = '<div class="item active"><div class="room-booking-plan"><h5>' + polyglot.t("Selected date does not exsists in any of the available dateranges") + '</h5></div></div>';

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
        var defaultCurrency = CURRENCY;

        if (TARIFF.length === 0)
            return ' <div class="room-booking-plan"><h5>' + polyglot.t("No tariff/plans exsists for selected date") + '</h5></div>';

        for (var i = 0; i < TARIFF.length; i++) {

            if (TARIFF[i].daterange_id == daterange_id) {

                var plans = getPlans(TARIFF[i].plan_id);

                var weekday = TARIFF[i].weekday;

                var weekend = TARIFF[i].weekend;

                if (plans != '') {

                    if (temp == 0) {

                        html += '<div class=" active item">';
                        temp = 1;
                    } else {
                        html += '<div class="item">';
                    }

                    html += '<div class="room-booking-plan">' + plans;

                    html += '<div class="booking-detail">' + polyglot.t("Max Adults Weekdays:") + '<span>' +
                        weekday.max_adults + '</span></div>';

                    html += '<div class="booking-detail">' + polyglot.t("Max Children Weekdays:") + '<span>' +
                        weekday.max_children + '</span></div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="plan-bg">'

                    html += '<h6>' + polyglot.t("Additional Charge Weekdays") + '</h6>' +
                        '<div class="booking-detail">' + polyglot.t("per extra Adult:") + '' + defaultCurrency + '' + weekday.extra_adult + '</div>';

                    html += '<div class="booking-detail">' + polyglot.t("per extra Child:") + '' + defaultCurrency + '' + weekday.extra_child + '</div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="booking-price">' + polyglot.t("WEEKDAYS") + ' <b>' + defaultCurrency + '' + weekday.charge + '</b></div>';

                    html += '</div>';

                    html += '<div class="booking-detail">' + polyglot.t("Max Adults Weekend:") + '<span>' +
                        weekend.max_adults + '</span></div>';

                    html += '<div class="booking-detail">' + polyglot.t("Max Children Weekend:") + '<span>' +
                        weekend.max_children + '</span></div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="plan-bg">';

                    html += '<h6>' + polyglot.t("Additional Charge Weekend") + '</h6>' +
                        '<div class="booking-detail">' + polyglot.t("per extra Adult:") + '' + defaultCurrency + '' + weekend.extra_adult + '</div>';

                    html += '<div class="booking-detail">' + polyglot.t("per extra Child:") + '' + defaultCurrency + '' + weekend.extra_child + '</div>';

                    html += '<div class="clearfix"></div>';

                    html += '<div class="booking-price">' + polyglot.t("WEEKEND") + ' <b>' + defaultCurrency + '' + weekend.charge + '</b></div>';

                    html += '</div></div></div>';

                }

            } else {
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
});

/*********** image.js *********************/
jQuery(document).ready(function(){
    var imageLoaded = function(ele) {
        $ = jQuery;
        if ($(ele).attr('data-height') != 'auto') {
            $(ele).parent().height($(ele).parent().width() * parseFloat($(ele).attr('data-height')));
        }
        $(ele).css('top', $(ele).parent().width() * parseFloat($(ele).attr('data-top')) + 'px');
    }
    $('img').each(function(){
        imageLoaded(this);
    });
    $("img").error(function () {
        $(this).unbind("error").attr("src", THEMEURL+"/images/imageNotFound.jpg");
    });
});


/************ slider.js ***************/

jQuery(document).ready(function(){
    $('.tp-caption .caption-hover').parent().addClass('caption-hover');
    $('.tp-caption .caption-hover').removeClass('caption-hover');

    $('.tp-caption .no-caption').parent().remove();
})

/************ slimenu.js ***************/
jQuery(document).ready(function () {
    
    if(jQuery('.slimmenu').length === 0)
        return;
    
    jQuery('.slimmenu').slimmenu({
        resizeWidth: '767',
        collapserTitle: 'Menu',
        animSpeed: 'medium',
        indentChildren: false,
        childrenIndenter: '&nbsp;'
    });
});

/************ isotope.js *******************/
jQuery(document).ready(function () {
    if (jQuery('ul.gallery li').length === 0)
        return;

    var $container = jQuery('ul.gallery').imagesLoaded(function () {
        $container.isotope({
            // options
            itemSelector: '.isotope-element'
        });
        setTimeout(function () {
            jQuery(window).resize();
        }, 200);
    });
});


/************ tabs.js *****************/
jQuery(document).ready(function(){
    jQuery('.tab-container').each(function(index,container){
        jQuery(container).children('.nav-tabs').first().find('a').each(function(ind,tab){
            if(ind == 0){
                jQuery(tab).parent().addClass('active');
                jQuery(container).children('.tab-content').first().children('div:eq('+(ind)+')').addClass('active')
            }
            jQuery(tab).attr('href','#tab-'+index+'-'+ind);
            jQuery(container).children('.tab-content').first().children('div:eq('+(ind)+')').attr('id','tab-'+index+'-'+ind);
        });
        // jQuery(container).tabs()
    });
});


/************ map.js *******************/
jQuery(document).ready(function() {

    if (jQuery('#map_canvas').length === 0)
        return;

    var map, geocoder;

    window.initializeMap = function() {

        geocoder = new google.maps.Geocoder();

        var mapOptions = {
            zoom: 17,
            center: new google.maps.LatLng(-34.397, 150.644)
        };

        geocoder.geocode({
            'address': HOTELADDRESS
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                if (jQuery('#map_canvas').height() === 0)
                    jQuery('#map_canvas').height(300);
            } else {
                jQuery('#map_canvas').html('<div class="empty-view"><span class="glyphicon glyphicon-map-marker"></span>Please add an address for your site.</div>');
            }
        });
    }
    jQuery.getScript('https://maps.googleapis.com/maps/api/js?sensor=false&callback=initializeMap');
});

/**************** poweredby.js ***********************/
jQuery(document).ready(function() {
    var $powered = jQuery('.power-up').clone().removeClass('hide').addClass('text');
    jQuery('.site-footer').append($powered);
    if( jQuery('.site-footer').css('background-color') == 'transparent' && jQuery('body').css('background-color') == 'rgb(255, 255, 255)' ) {
        jQuery('.power-up').css('color', '#aaaaaa');
        console.log('powered');
    };
    
});

/**************** login/forgotpassword/reset.js ************/
jQuery(document).ready(function($) {

    $("#inputPass,#inputEmail").keypress(function(e) {
        if (e.which == 13) {
            $("#login_btn").click();
        }
    });

    $("#login_btn").click(function() {

        if (!$('#frm_login').parsley('validate'))
            return;

        $(".login_loader").show();

        var data = {
            action: 'user_login',
            pdemail: $("#inputEmail").val(),
            pdpass: $("#inputPass").val(),
            ajax_nonce: ajax_nonce
        };


        // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
        $.post(AJAXURL, data, function(response) {

            if (response.code == 'OK') {

                $(".login_loader").hide();
                $("#login_success").show();
                $("#login_status").html('<div class="alert alert-success t-a-c">' +
                    '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                    response.msg + '</div>')

                window.location.href = response.blog_url + '/dashboard';
                return true;
            } else if ((response.code == 'ERROR') || (response.code == 'FAILED')) {

                $(".login_loader").hide();
                $("#login_status_div").show()
                $("#login_status").html('<div class="alert alert-error t-a-c">' +
                    '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                    response.msg + '</div>')

                return false;
            }
        });

    });

    /**
     *   Forgot password action
     */
    $('#forgot_password_btn').click(function() {
        $('#display-msg').empty();

        $(".login_loader").show();

        $.post(AJAXURL, {
                action: 'reset-password',
                email: $('#forgotPasswordEmail').val()
            },
            function(response) {

                if (response.code == "ERROR") {
                    displayMsg(response.msg);
                    return false;
                } else if (response.code == "OK") {
                    displayMsg(response.msg);
                    return true;
                }

            }, 'json')

    });

    function displayMsg(msg) {
        $(".login_loader").hide();

        var html = '<div class="alert alert-error">' +
            '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
            msg + '</div>';

        $('#display-msg').html(html);

    }

    /**
     *   Forgot password action
     */
    $('#reset-pass').click(function() {
        $('#display-msg').empty();

        $(".login_loader").show();

        $.post(AJAXURL, {
                action: 'change-password',
                newPassword: $('#newPassword').val(),
                confirmPassword: $('#confirmPassword').val(),
                userEmail: $('#email').val()
            },
            function(response) {

                if (response.code == "ERROR") {
                    displayMsg(response.msg);
                    return false;
                } else if (response.code == "OK") {
                    $(".login_loader").hide();
                    var link = response.url + '/sign-in?email=' + response.email
                    var html = '<div class="alert alert-error">' +
                        '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                        response.msg + '<a href=" ' + link + ' ">Login</a></div>';

                    $('#display-msg').append(html);

                    $('#reset-form').click();

                    return true;
                }

            }, 'json')

    });
});

/**************** color-change.js *********************/
jQuery(document).ready(function($) {

    if(jQuery('.options-div').length === 0)
        return;

    jQuery('.options-div').tabSlideOut({
        tabHandle: '.handle', //class of the element that will become your tab
        tabLocation: 'left', //side of screen where tab lives, top, right, bottom, or left
        speed: 100, //speed of animation
        action: 'click', //options: 'click' or 'hover', action to trigger animation
        topPos: '150px', //position from the top/ use if tabLocation is left or right
        fixedPosition: true //options: true makes it stick(fixed position) on scroll
    });

    jQuery('a[data-color]').click(function(e) {
        e.preventDefault();
        color_scheme_name = jQuery(this).attr('data-color');
        $.cookie('color_scheme', color_scheme_name, {
            path: '/'
        });
        applyStyle();
        $(this).closest('.option-colors').find('a').removeClass('active');
        $(this).addClass('active');
        $('.handle').trigger('click');
    });

    var stylesPromises = [];

    function applyStyle() {
        var styleURL = CHILDTHEMEURL + '/css/theme-style.css';
        var scheme = '';
        scheme = $.cookie('color_scheme')
        if (scheme !== undefined) {
            scheme = '-' + replaceAll(" ", "-", scheme).toLowerCase();
            styleURL = CHILDTHEMEURL + '/color_scheme_css/theme-style' + scheme + '.css';
        }

        if (!stylesPromises[styleURL]) {
            stylesPromises[styleURL] = $.ajax({
                url: styleURL,
                success: function(data, textStatus, jqxhr) {
                    setHref(styleURL);
                }
            });
        } else {
            setHref(styleURL);
        }

        function setHref(href) {
            var linkTag = '<link class="theme-style" href="' + href + '" type="text/css" rel="stylesheet"/>';
            $('.theme-style').first().after(linkTag);

            setTimeout(function() {
                $('.theme-style').first().remove();
                $('body').css({
                    visibility: 'visible'
                });
            }, 300);
        }

    }
    applyStyle();
});

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}
