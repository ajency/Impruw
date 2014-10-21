define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.AddUserEmail.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.AddUserEmailView extends Marionette.ItemView

                  tagName : 'form'

                  className : 'form-horizontal'

                  template : '<div class="form-group">
                                  <label for="email-emailid" class="col-sm-3 control-label">{{#polyglot}}Email Address:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                      <div class="input-group">
                                        <input id="email_username" name="email_username" type="text" value="" class="form-control" required placeholder="username" maxlength="20" minlength="3">
                                          <span class="input-group-addon">@{{domain_name}}</span>
                                      </div> 
                                  </div>
                                  <input id="email_domain" name="email_domain" type="hidden" value="{{domain_name}}" class="form-control">
                                </div>
                                <div class="form-group">
                                  <label for="email-firstName" class="col-sm-3 control-label">{{#polyglot}}First name:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-firstName" name="firstName" type="text" value="{{firstName}}" class="form-control" required>
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label for="email-lastName" class="col-sm-3 control-label">{{#polyglot}}Last name:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-lastName" name="lastName" type="text" value="{{lastName}}" class="form-control" required>
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label for="email-password" class="col-sm-3 control-label">{{#polyglot}}Password:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-password" name="password" type="password" value="{{password}}" class="form-control" required>
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
                            data.email_id = data.email_username+'@'+@model.get('domain_name')
                            # console.log data.email_id
                            if @validateEmail(data.email_id)
                              @$el.parent().find('.alert').remove()
                              @trigger "add:user:email", data
                            else
                              @$el.parent().find('.alert').remove()
                              @$el.parent().prepend "<div class=\"alert alert-error\">" + _.polyglot.t("Email address is not in correct format") + "</div>"
                              @$el.find('input').val ''
                            

                  onSavedUserEmail:(response) ->
                    if response.code is 'OK'
                      msg = _.polyglot.t("New user email created")
                    else if response.code is 'ERROR'
                      msg = _.polyglot.t response.msg
                    
                    # console.log @$el.parent()
                    @$el.parent().find('.alert').remove()
                    @$el.parent().prepend "<div class=\"alert alert-success\">" + msg + "</div>"
                    @$el.find('input').val ''

                  validateEmail :(email) ->
                    emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
                    valid = emailReg.test(email)
                    unless valid
                      false
                    else
                      true
