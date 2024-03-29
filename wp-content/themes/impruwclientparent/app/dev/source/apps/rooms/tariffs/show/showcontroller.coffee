define [ 'app', 'controllers/base-controller', 'apps/rooms/tariffs/show/views' ], ( App, AppController )->
   App.module "RoomsApp.RoomsTariff.Show", ( Show, App )->
      class ShowController extends AppController

         initialize : ( opt )->
            {@roomId} = opt

            if not @roomId
               throw new Error "Invalid room id: #{@roomId}"

            pcollection = App.request "get:plans:collection"
            dcollection = App.request "get:daterange:collection"
            tcollection = App.request "get:tariffs:collection", @roomId

            #get the currency
            sitemodel = App.request "get:site:model"
            currentCurrency = sitemodel.get 'currency'

            @layout = @_getGridLayout tcollection

            # get the packages view
            @packagesView = @_getPackagesView pcollection

            @dateRangeView = @_getDateRangeView dcollection , currentCurrency

            pcollection.on 'add remove', =>
               @dateRangeView = @_getDateRangeView dcollection , currentCurrency
               @layout.tariffRegion.show @dateRangeView

            @listenTo @layout, "show", =>
               @layout.packagesRegion.show @packagesView
               @layout.tariffRegion.show @dateRangeView



            @show @layout,
               loading : true

         # get the packages view
         _getPackagesView : ( pCollection )->
            new Show.Views.PackagesView
               collection : pCollection

         # get the tariffs view
         _getDateRangeView : ( dCollection , currentCurrency )->
            new Show.Views.DateRangeCollectionView
               collection : dCollection
               roomId : @roomId
               currency : currentCurrency

         # grid layout
         _getGridLayout : ( tcollection )->
            new GridLayout
               collection : tcollection


      class GridLayout extends Marionette.Layout

         template : '	<div id="packages-region"></div>
                     						<div id="tariff-region"></div>'

         regions :
            packagesRegion : '#packages-region'
            tariffRegion : '#tariff-region'


      App.commands.setHandler "show:tariff:grid", ( opt )->
         new ShowController opt
				
				
			