define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.OriginalRoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

                class OriginalRoomFacilitiesItemView extends Marionette.ItemView

                	template : ' <div class="form-group">
                					<label class="col-sm-3 control-label" for="">{{#polyglot}}Facility{{/polyglot}}</label>
                					<div class="col-sm-9 col-sm-offset-3">
                						<p class="original title">{{facilityName}}
                						</p>
                					</div>
                				</div>'


                class Views.OriginalRoomFacilitiesView extends Marionette.CollectionView

                    tagName : 'div'

                    className : 'col-sm-7'

                    itemView : OriginalRoomFacilitiesItemView
