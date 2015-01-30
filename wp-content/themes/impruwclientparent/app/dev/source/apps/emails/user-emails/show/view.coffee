define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.Views', (Views, App, Backbone, Marionette, $, _)->

                 #empty view
                class EmptyView extends Marionette.ItemView

                    className: 'empty-info'

                    tagName: 'tr'

                    template: '<td colspan="5">'+_.polyglot.t("no_user_email_accounts", {domain_name: DOMAIN_NAME})+'</td>'


                class UserEmailItemView extends Marionette.ItemView

                    tagName : 'tr'

                    template : '<td>{{email}}</td>
                                <td>{{name}}</td>
                                <td class="action-links">
                                    <a class="blue-link edit-useremail-link" href="#"><span class="icon icon-edit"></span>&nbsp;{{#polyglot}}Edit{{/polyglot}}</a>
                                        <a class="red-link deleteuseremail_link" href="#/emails/delete/{{email}}"><span class="icon icon-trashcan "></span>&nbsp;{{#polyglot}}Delete{{/polyglot}}</a>
                                    {{#enabled}}<!--a class="orange-link suspenduseremail_link" href="#/emails/suspend/{{email}}"><span class="icon icon-blocked"></span>&nbsp;{{#polyglot}}Disable{{/polyglot}}</a-->{{/enabled}}
                                    {{^enabled}}<a class="orange-link enableuseremail_link" href="#/emails/enable/{{email}}"><span class="icon icon-checked"></span>&nbsp;{{#polyglot}}Enable{{/polyglot}}</a>{{/enabled}}
                                </td>'

                    modelEvents:
                        'change': 'render'

                    events :
                        'click .deleteuseremail_link' : ( e )->
                           e.preventDefault()
                           email_id = @model.get 'email'
                           if confirm _.polyglot.t "Delete this user email id?"
                                @trigger "delete:user:email", email_id

                        'click .enableuseremail_link' : ( e )->
                           e.preventDefault()
                           email_id = @model.get 'email'
                           if confirm _.polyglot.t "To re-enable email account please, reset the password"
                                @model.set 'reenableAccount' , 1
                                App.execute "show:edit:user:email", model: @model
                              

                        'click .suspenduseremail_link' : ( e )->
                           e.preventDefault()
                           email_id = @model.get 'email'
                           if confirm _.polyglot.t "Suspend this user email id?"
                                @trigger "disable:user:email", email_id

                        'click .edit-useremail-link' : ( e )->
                           e.preventDefault()
                           App.execute "show:edit:user:email", model: @model

                    mixinTemplateHelpers: (data)->
                        data = super data

                        data.enabled = ->
                            if data.has_password is "0"
                                return false
                            else
                                return true
                        data

                    onRender:->
                        emailIndex =  Marionette.getOption @, 'emailIndex'
                        # Hide email accounts that are previously disabled and the exceed the maximum allowed count
                        if emailIndex+1 > PLAN_FEATURE_COUNT['email_account'][0]['allowed_count']
                            @$el.closest( "tr" ).find(' .enableuseremail_link').remove()
                            @$el.closest( "tr" ).hide()
                class Views.UserEmailView extends Marionette.CompositeView 
                   
                    template : '<div class="tab-content">
                                <div id="users" class="tab-pane active">
                                    <h6 class="aj-imp-sub-head">{{#polyglot}}Create upto '+PLAN_FEATURE_COUNT["email_account"][0]["allowed_count"]+' company email accounts{{/polyglot}}</h6>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>{{#polyglot}}Email Address{{/polyglot}}</th>
                                                    <th>{{#polyglot}}Name{{/polyglot}}</th>
                                                    <th>{{#polyglot}}Actions{{/polyglot}}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="actions">
                                        <button class="btn btn-sm aj-imp-orange-btn" id="add-new-user-email-btn">
                                            <span class="glyphicon glyphicon-user"></span>&nbsp;{{#polyglot}}Add User{{/polyglot}}
                                        </button>
                                    </div>
                                </div>
                            </div> '

                    addChildView: ->

                    collectionEvents: 
                      "remove": "render"
                      "add" : "render"


                    itemView : UserEmailItemView

                    emptyView : EmptyView

                    itemViewContainer : 'tbody'

                    events:
                        'click #add-new-user-email-btn' : 'addNewUserEmail'

                    itemViewOptions :(model,index)->
                        emailIndex : index

                    onRender:->
                        # disable add user button if emails are more than or equal to 10
                        if @collection.length >= PLAN_FEATURE_COUNT['email_account'][0]['allowed_count']
                            @$el.find('#add-new-user-email-btn').prop('disabled', true)

                        if PLAN_FEATURE_COUNT['email_account'][0]['allowed_count'] is 99999
                            count_display = "unlimited"
                            msg = _.polyglot.t 'Create '+count_display+' company email accounts'
                            @$el.find('#users h6').html(msg)
                        


                    addNewUserEmail: (e) ->
                        e.preventDefault()
                        @trigger "add:new:user:email"

                    onSuspendEmail:(msg)->
                        console.log msg

                    onDeleteEmail:(msg)->
                        console.log msg