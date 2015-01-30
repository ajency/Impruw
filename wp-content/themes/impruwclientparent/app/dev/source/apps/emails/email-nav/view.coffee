define ['app'], (App)->

            App.module 'EmailsApp.EmailNav.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.EmailNavView extends Marionette.ItemView  
                   
                    template : '<ul class="nav nav-pills"> 
                                <li class="active"> 
                                    <a data-toggle="tab" href="#users" id="users-emails">{{#polyglot}}Users{{/polyglot}}</a> 
                                </li> 
                                </ul>'

                    events:
                        'click a#users-emails' : 'loadUserEmails'

                    onShow:->
                        @trigger "user:email:list"

                    loadUserEmails: (e) ->
                        @trigger "user:email:list"

                class Views.EmailDisabledView extends Marionette.ItemView

                    template : '<div class="empty-info">You cannot use the emails feature currently.<br/><br/>This could be due to one of the following reasons:<br/>1.Email account feature is not enabled for the current selected plan.<br/>2. Your domain name is not updated. Update your domain name by going to Site Profile on the Dashboard. Once you have changed your domain name, you can come back here to add email accounts for that domain.</div>'

                    onShow:->
                        $('.aj-imp-widget-container').hide()



