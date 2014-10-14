define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.AddUserEmail.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.AddUserEmailView extends Marionette.ItemView

                  tagName : 'form'

                  template : '<div class="control-group"> 
                                <div class="control-group">
                                  <label for="email-emailid" class="control-label">{{#polyglot}}Email Address:{{/polyglot}}*</label>
                                  <input id="email-emailid" name="emailId" type="text" value="{{emailId}}"/>
                                </div>
                                  <label for="email-firstName" class="control-label">{{#polyglot}}First name:{{/polyglot}}</label>
                                  <input id="email-firstName" name="firstName" type="text" value="{{firstName}}"/>
                                </div>
                                <div class="control-group">
                                  <label for="email-lastName" class="control-label">{{#polyglot}}Last name:{{/polyglot}}</label>
                                  <input id="email-lastName" name="lastName" type="text" value="{{lastName}}"/>
                                </div>
                                <div class="control-group">
                                  <label for="email-password" class="control-label">{{#polyglot}}Password:{{/polyglot}}</label>
                                  <input id="email-password" name="password" type="password" value="{{password}}"/>
                                </div>
                                <button class="btn js-add-user-submit">{{#polyglot}}Add User{{/polyglot}}</button>'

                  dialogOptions :
                     modal_title : _.polyglot.t 'Add a User'
                     modal_size : 'medium-modal'

                  events :
                     'click .js-add-user-submit' :(e) ->
                        e.preventDefault()
                        if @$el.valid()
                           data = Backbone.Syphon.serialize @
                           console.log data
                           @trigger "add:user:email", data

