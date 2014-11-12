define ['app'
        'text!apps/billing/account-summary/templates/purchaseHistory.html'], (App, viewTpl)->

    App.module 'BillingApp.PurchaseHistory.View', (View, App, Backbone, Marionette, $, _)->

        class SingleTranscation extends Marionette.ItemView
            template : '
                            <td>{{date}}</td>
                            <td>{{plan_name}}</td>
                            <td>{{description}}</td>
                            <td>&pound; {{amount}}</td>
                            <td><a href="#">'+_.polyglot.t("Print")+'</a></td>'
            tagName : 'tr'

        class View.EmptyView extends Marionette.ItemView

            template: '<div class="empty-info">'+_.polyglot.t("No transaction history found.")+'</div>'

        class View.Transaction extends Marionette.CompositeView

            template: viewTpl

            childViewContainer : 'tbody'

            childView : SingleTranscation

            onShow: ->
                @$el.find('input[type="checkbox"]').radiocheck()
                @$el.find('select').selectpicker()



