define ['app'
        'text!apps/emails/show/templates/emailsview.html'], (App, emailsviewTpl)->

            App.module 'EmailsApp.Show.Views', (Views, App, Backbone, Marionette, $, _)->


                class Views.EmailView extends Marionette.Layout

                    template : emailsviewTpl

                    regions: 
                        emailsNav: "#js-email-nav",
                        emailsDisplay: "#js-email-display",