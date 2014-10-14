define ['app'], (App)->

            App.module 'EmailsApp.UserEmails.Views', (Views, App, Backbone, Marionette, $, _)->

                class UserEmailItemView extends Marionette.ItemView

                    tagName : 'tr'

                    template : '<td>johndoe@mycompany.com</td>
                                <td>John</td>
                                <td>Doe</td>
                                <td>24/9/2014</td>
                                <td class="action-links">
                                    <a class="blue-link" href="#"><span class="icon icon-edit"></span>&nbsp;Edit</a>
                                    <a class="orange-link" href="#"><span class="icon icon-blocked"></span>&nbsp;Suspend</a>
                                    <a class="red-link" href="#"><span class="icon icon-trashcan"></span>&nbsp;Delete</a>
                                </td>'

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