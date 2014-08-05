define ['app'], (App)->

    # Row views
    App.module 'SiteBuilderApp.Element.Table.Views', (Views, App, Backbone, Marionette, $, _)->

        # Menu item view
        class Views.TableView extends Marionette.CompositeView

        	className : 'imp-table'

        	template : '<table>
        					<thead>
        					{{#tableHeader}}
        						<th></th>
        					{{/tableHeader}}
        					</thead>
        					<tbody><tbody>
        				</table>'

        	itemContainer : 'tbody'

        	onShow :->
        		@$el.html _.stripslashes @model.get 'content'


		class ColumnView extends Marionette.ItemView



