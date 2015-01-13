define [ 'app'
         'text!apps/billing/site-transaction-history/templates/transaction-history-layout.html'
         'text!apps/billing/site-transaction-history/templates/transaction-listing.html'], ( App, transactionHistoryLayoutViewTpl,transactionListingTpl)->

    App.module 'BillingApp.SiteTransactionHistory.View', ( View, App, Backbone, Marionette, $, _ )->
        
        # Main payment page layout
        class View.Layout extends Marionette.Layout

            template : transactionHistoryLayoutViewTpl

            regions :
                transactionListingRegion : '#transaction-listing'

            onRender :->
                @$el.find( '.spinner-markup' ).spin @_getOptions()

            # spinner options
            _getOptions : ->
                lines : 10
                length : 6
                width : 2.5
                radius : 7
                corners : 1
                rotate : 9
                direction : 1
                color : '#ff9e2c'
                speed : 1
                trail : 60
                shadow : false
                hwaccel : true
                className : 'spinner'
                zIndex : 2e9
                top : '0px'
                left : '40px'


        class SingleTranscation extends Marionette.ItemView
            template : '    <td>{{createdAt}}</td>
                            <td>{{timezone}}</td>
                            <td>{{type}}</td>
                            <td>{{status}}</td>
                            <td>{{cardholderName}}</td>
                            <td><img alt="{{cardType}}" src="{{imageUrl}}" height="20" width="30"> {{maskedNumber}}</td>
                            <td>{{currencySymbol}} {{amount}}</td>'
            tagName : 'tr'

            serializeData : ->
                data = super()
                data.timezone = BT_TIMEZONE
                data

        class View.EmptyView extends Marionette.ItemView

            template: '<div class="empty-info">'+_.polyglot.t("No transaction history found.")+'</div>'

        class View.TransactionListView extends Marionette.CompositeView

            template: transactionListingTpl

            itemViewContainer : 'tbody'

            itemView : SingleTranscation

            onShow: ->
                @$el.find('input[type="checkbox"]').radiocheck()
                @$el.find('select').selectpicker()











