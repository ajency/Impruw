define ['app'], (App)->

            App.module 'EmailsApp.EmailNav.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.EmailNavView extends Marionette.ItemView  
                   
                    template : '<ul class="nav nav-pills"> 
                                <li class="active"> 
                                    <a data-toggle="tab" href="#users">{{#polyglot}}Users{{/polyglot}}</a> 
                                </li> 
                                </ul>'

                    events:
                        'click a#users' : 'loadUserEmails'

                    loadUserEmails: (e) ->
                        @trigger "user:email:list"

