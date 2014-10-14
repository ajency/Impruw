define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.AddUserEmail.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.AddUserEmailView extends Marionette.ItemView

                  tagName : 'form'

                  className : 'form-horizontal'

                  template : '<div class="form-group">
                                  <label for="email-emailid" class="col-sm-3 control-label">{{#polyglot}}Email Address:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-emailid" name="emailId" type="text" value="{{emailId}}" class="form-control">
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label for="email-firstName" class="col-sm-3 control-label">{{#polyglot}}First name:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-firstName" name="firstName" type="text" value="{{firstName}}" class="form-control">
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label for="email-lastName" class="col-sm-3 control-label">{{#polyglot}}Last name:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-lastName" name="lastName" type="text" value="{{lastName}}" class="form-control">
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label for="email-password" class="col-sm-3 control-label">{{#polyglot}}Password:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-password" name="password" type="password" value="{{password}}" class="form-control">
                                  </div>
                                </div>
                                <div class="form-group">
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <button class="btn btn-sm aj-imp-orange-btn js-add-user-submit">{{#polyglot}}Add User{{/polyglot}}</button>
                                  </div>
                                </div>'

                  dialogOptions :
                     modal_title : _.polyglot.t 'Add a User'
                     modal_size : 'small-modal'

                  events :
                     'click .js-add-user-submit' :(e) ->
                        e.preventDefault()
                        if @$el.valid()
                           data = Backbone.Syphon.serialize @
                           console.log data
                           @trigger "add:user:email", data

