jQuery(document).ready(function ($) {

    $("#inputPass,#inputEmail" ).keypress(function(e){
        if(e.which == 13){
            $("#login_btn").click();
        }
    });

    $("#login_btn").click(function () {

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
        $.post(AJAXURL, data, function (response) {

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
    $('#forgot_password_btn').click(function () {
        $('#display-msg').empty();

        $(".login_loader").show();

        $.post(AJAXURL, {
                action: 'reset-password',
                email: $('#forgotPasswordEmail').val()
            },
            function (response) {

                if (response.code == "ERROR") {
                    displayMsg( response.msg );
                    return false;
                }
                else if (response.code == "OK") {
                    displayMsg( response.msg );
                    return true;
                }

            }, 'json')

    });

    function displayMsg( msg ) {
        $(".login_loader").hide();

        var html = '<div class="alert alert-error">' +
            '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
            msg + '</div>';

        $('#display-msg').append(html);

    }

    /**
     *   Forgot password action
     */
    $('#reset-pass').click(function () {
        $('#display-msg').empty();

        $(".login_loader").show();

        $.post(AJAXURL, {
                action: 'change-password',
                newPassword: $('#newPassword').val(),
                confirmPassword: $('#confirmPassword').val(),
                userEmail: $('#email').val()
            },
            function (response) {

                if (response.code == "ERROR") {
                    displayMsg( response.msg );
                    return false;
                }
                else if (response.code == "OK") {
                    $(".login_loader").hide();
                    var link = response.url + '/sign-in?email='+response.email
                    var html = '<div class="alert alert-error">' +
                        '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                        response.msg + '<a href=" '+link+' ">Login</a></div>';

                    $('#display-msg').append(html);

                    $('#reset-form').click();

                    return true;
                }

            }, 'json')

    });
});

