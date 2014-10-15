define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.Views', (Views, App, Backbone, Marionette, $, _)->

                class UserEmailItemView extends Marionette.ItemView

                    tagName : 'tr'

                    template : '<td>{{email}}</td>
                                <td>{{firstName}}</td>
                                <td>{{firstName}}</td>
                                <td>{{dateOfCreation}}</td>
                                <td class="action-links">
                                    <a class="blue-link edit-useremail-link" href="#"><span class="icon icon-edit"></span>&nbsp;Edit</a>
                                    <a class="orange-link suspenduseremail_link" href="#/emails/suspend/{{email}}"><span class="icon icon-blocked"></span>&nbsp;Suspend</a>
                                    <a class="red-link deleteuseremail_link" href="#/emails/delete/{{email}}"><span class="icon icon-trashcan "></span>&nbsp;Delete</a>
                                </td>'

                    events :
                        'click .deleteuseremail_link' : ( e )->
                           e.preventDefault()
                           if confirm _.polyglot.t "Delete this user email id?"
                              @model.destroy()

                        'click .suspenduseremail_link' : ( e )->
                           e.preventDefault()
                           if confirm _.polyglot.t "Suspend this user email id?"
                              @model.destroy()

                        'click .edit-useremail-link' : ( e )->
                           e.preventDefault()
                           App.execute "show:edit:user:email", model: @model

                class Views.UserEmailView extends Marionette.CompositeView 
                   
                    template : '<div class="tab-content">
                                <div id="users" class="tab-pane active">
                                    <h6 class="aj-imp-sub-head">{{#polyglot}}Create upto 10 company email accounts{{/polyglot}}</h6>
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>{{#polyglot}}Email Address{{/polyglot}}</th>
                                                    <th>{{#polyglot}}First Name{{/polyglot}}</th>
                                                    <th>{{#polyglot}}Last Name{{/polyglot}}</th>
                                                    <th>{{#polyglot}}Date Created{{/polyglot}}</th>
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

                    itemViewContainer : 'tbody'

                    events:
                        'click #add-new-user-email-btn' : 'addNewUserEmail'

                    addNewUserEmail: (e) ->
                        e.preventDefault()
                        @trigger "add:new:user:email"