define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.OriginalRoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

                class OriginalRoomFacilitiesItemView extends Marionette.ItemView

                	template : ' <div class="form-group">
                					<label class="col-sm-3 control-label label-head" for="">{{#polyglot}}Facilities{{/polyglot}}</label>
                					<div class="col-sm-9 col-sm-offset-3">
                						<div class="original title">{{name}}
                						</div>
                					</div>
                				</div>'


                class Views.OriginalRoomFacilitiesView extends Marionette.CollectionView

                    tagName : 'div'

                    className : 'col-sm-7'

                    itemView : OriginalRoomFacilitiesItemView
