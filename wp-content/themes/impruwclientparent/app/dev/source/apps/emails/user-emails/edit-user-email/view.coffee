define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.EditUserEmail.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.EditUserEmailView extends Marionette.ItemView

                  tagName : 'form'

                  className : 'form-horizontal'

                  template : '<div class="form-group">
                                  <label for="email-emailid" class="col-sm-3 control-label">{{#polyglot}}Email Address:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <label>{{email}}</label>
                                    <input id="email_id" name="email_id" type="hidden" value="{{email}}" class="form-control">
                                  </div>
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
                                  <label for="email-password" class="col-sm-3 control-label">{{#polyglot}}Reset Password:{{/polyglot}}</label>
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <input id="email-password" name="password" type="password" value="" class="form-control" required>
                                  </div>
                                </div>
                                <div class="form-group">
                                  <div class="col-sm-9 col-sm-offset-3">
                                    <button class="btn btn-sm aj-imp-orange-btn js-edit-user-submit">{{#polyglot}}Update{{/polyglot}}</button>
                                  </div>
                                </div>'

                  dialogOptions :
                     modal_title : _.polyglot.t 'Edit a User'
                     modal_size : 'small-modal'

                  events :
                     'click .js-edit-user-submit' :(e) ->
                        e.preventDefault()
                        if @$el.valid()
                           data = Backbone.Syphon.serialize @
                           @trigger "edit:user:email", data

                  mixinTemplateHelpers: (data)->
                        data = super data

                        str = data.name
                        
                        data.firstName = ->
                          if str is null
                            firstname = ""
                          else
                            firstname = str.substr 0, str.indexOf(" ")
                          return firstname

                        data.lastName = ->
                          if str is null
                            lastname = ""
                          else
                            lastname = str.substr str.indexOf(" ") + 1
                          return lastname
                            
                        data

                  onSavedUserEmail: ->
                      @$el.parent().find('.alert').remove()
                      @$el.parent().prepend "<div class=\"alert alert-success\">" + _.polyglot.t("Email account details updated") + "</div>"
                      # App.execute "show:user:emails:app"

