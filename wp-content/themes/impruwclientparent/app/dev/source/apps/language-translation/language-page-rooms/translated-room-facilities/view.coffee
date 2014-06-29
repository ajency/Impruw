define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedRoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

                class TranslatedRoomFacilitiesItemView extends Marionette.ItemView

                    template : '<div class="form-group">
									<div class="col-sm-12">
										<input type="text" placeholder="{{#polyglot}}Add Translation{{/polyglot}}" id="" class="form-control" value="{{facilityName}}">
									</div>
								</div> '


                class Views.TranslatedRoomFacilitiesView extends Marionette.CollectionView

                    tagName : 'div'

                    className : 'col-sm-5'

                    itemView : TranslatedRoomFacilitiesItemView