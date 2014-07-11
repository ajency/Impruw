jQuery(document).ready(function ($) {

    $("#login_btn").click(function () {

        $("#login_loader").show();

        var data = {
            action: 'user_login',
            pdemail: $("#inputEmail").val(),
            pdpass: $("#inputPass").val(),
            ajax_nonce: ajax_nonce
        };


        // since 2.8 ajaxurl is always defined in the admin header and points to admin-ajax.php
        $.post(AJAXURL, data, function (response) {

            if (response.code == 'OK') {

                $("#login_loader").hide();
                $("#login_success").show();
                $("#login_status").html('<div class="alert alert-success">' +
                    '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
                    response.msg + '</div>')

                window.location.href = response.blog_url + '/dashboard';
                return true;
            } else if ((response.code == 'ERROR') || (response.code == 'FAILED')) {

                $("#login_loader").hide();
                $("#login_status_div").show()
                $("#login_status").html('<div class="alert alert-error">' +
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

        var html = '<div class="alert alert-error">' +
            '<button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>' +
            msg + '</div>';

        $('#display-msg').append(html);
    }

});