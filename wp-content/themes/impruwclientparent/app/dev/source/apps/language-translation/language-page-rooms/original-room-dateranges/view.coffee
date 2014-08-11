define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.OriginalRoomDateranges.Views', (Views, App, Backbone, Marionette, $, _)->

                class OriginalRoomDaterangesItemView extends Marionette.ItemView

                	template : ' <div class="form-group">
                					<label class="col-sm-3 control-label label-head" for="">{{#polyglot}}Date Ranges{{/polyglot}}</label>
                					<div class="col-sm-9 col-sm-offset-3">
                						<p class="original title">{{daterange_name}}
                						</p>
                					</div>
                				</div>'


                class Views.OriginalRoomDaterangesView extends Marionette.CollectionView

                    tagName : 'div'

                    className : 'col-sm-7'

                    itemView : OriginalRoomDaterangesItemView
