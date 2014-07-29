define ['app'
        'text!apps/billing/account-summary/templates/purchaseHistory.html'], (App, viewTpl)->

    App.module 'BillingApp.PurchaseHistory.View', (View, App, Backbone, Marionette, $, _)->

        class SingleTranscation extends Marionette.ItemView
            template : '
                            <td>{{date}}</td>
                            <td>{{plan_name}}</td>
                            <td>{{description}}</td>
                            <td>&pound; {{amount}}</td>'
            tagName : 'tr'



        class View.Transaction extends Marionette.CompositeView

            template: viewTpl

            itemViewContainer : 'tbody'

            itemView : SingleTranscation

            onShow: ->
                @$el.find('input[type="checkbox"]').checkbox()
                @$el.find('select').selectpicker()



