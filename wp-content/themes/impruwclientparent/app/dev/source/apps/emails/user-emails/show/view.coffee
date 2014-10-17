define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.Views', (Views, App, Backbone, Marionette, $, _)->

                 #empty view
                class EmptyView extends Marionette.ItemView

                    className: 'empty-info'

                    tagName: 'tr'

                    template: '<td colspan="5">{{#polyglot}}No Email accounts found{{/polyglot}}</td>'


                class UserEmailItemView extends Marionette.ItemView

                    tagName : 'tr'

                    template : '<td>{{email}}</td>
                                <td>{{name}}</td>
                                <td class="action-links">
                                    <a class="blue-link edit-useremail-link" href="#"><span class="icon icon-edit"></span>&nbsp;Edit</a>
                                    <a class="orange-link suspenduseremail_link {{hideSuspend}}" href="#/emails/suspend/{{email}}"><span class="icon icon-blocked"></span>&nbsp;Suspend</a>
                                    <a class="red-link deleteuseremail_link" href="#/emails/delete/{{email}}"><span class="icon icon-trashcan "></span>&nbsp;Delete</a>
                                </td>'

                    modelEvents:
                        'change': 'render'

                    events :
                        'click .deleteuseremail_link' : ( e )->
                           e.preventDefault()
                           email_id = @model.get 'email'
                           if confirm _.polyglot.t "Delete this user email id?"
                                @trigger "delete:user:email", email_id
                              

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

                        data.hideSuspend = ->
                            if data.has_password is "0"
                                return "hide"
                            else
                                return ""
                        data

                class Views.UserEmailView extends Marionette.CompositeView 
                   
                    template : '<div class="tab-content">
                                <div id="users" class="tab-pane active">
                                    <h6 class="aj-imp-sub-head">{{#polyglot}}Create upto 10 company email accounts{{/polyglot}}</h6>
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

                    itemView : UserEmailItemView

                    emptyView : EmptyView

                    itemViewContainer : 'tbody'

                    events:
                        'click #add-new-user-email-btn' : 'addNewUserEmail'

                    onShow:->
                        # disable add user button if emails are more than or equal to 10
                        if @collection.length >= 10
                            @$el.find('#add-new-user-email-btn').prop('disabled', true)


                    addNewUserEmail: (e) ->
                        e.preventDefault()
                        @trigger "add:new:user:email"

                    onSuspendEmail:(msg)->
                        console.log msg

                    onDeleteEmail:(msg)->
                        console.log msg