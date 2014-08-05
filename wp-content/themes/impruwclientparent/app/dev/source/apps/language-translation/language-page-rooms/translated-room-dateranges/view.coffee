define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedRoomDateranges.Views', (Views, App, Backbone, Marionette, $, _)->

                class TranslatedRoomDaterangesItemView extends Marionette.ItemView

                    template : '<div class="form-group">
                                    <div class="col-sm-12">
                                        <input type="text" placeholder="{{#polyglot}}Add Translation{{/polyglot}}" id="translated_facility_names" class="form-control" value="{{daterange_name}}" data-daterange="{{id}}">
                        </div>
                                </div> '


                class Views.TranslatedRoomDaterangesView extends Marionette.CompositeView

                    template: '<form class="form-horizontal edit_daterange_translation">
                                </form>
                                <div>
                                <button class="btn btn-xs aj-imp-orange-btn" name="btn_update-daterange-translation" id="btn_update-daterange-translation"> Update </button>
                                </div>'

                    tagName : 'div'

                    className : 'col-sm-5'

                    itemView : TranslatedRoomDaterangesItemView

                    itemViewContainer: '.edit_daterange_translation'

                    events:
                        "click #btn_update-daterange-translation" : "updateDaterange"

                    updateDaterange: (e) ->
                        e.preventDefault()
                        dateranges = []
                        @$el.find("input").each ->
                            dateranges.push
                              name: $(this).val()
                              id: $(this).attr("data-daterange")
                              translation_of: $(this).attr("data-originaldaterange")
                            return

                        @trigger 'update:translated:dateranges', dateranges

                    onDaterangeUpdated :() ->
                      @$el.find('.alert').remove()
                      @$el.append('<div class="alert alert-success">'+_.polyglot.t('Date range translation updated successfully')+'</div>')
                      @$el.find('.alert').fadeOut 5000