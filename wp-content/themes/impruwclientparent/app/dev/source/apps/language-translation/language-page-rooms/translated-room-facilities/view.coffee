define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedRoomFacilities.Views', (Views, App, Backbone, Marionette, $, _)->

                class TranslatedRoomFacilitiesItemView extends Marionette.ItemView

                    template : '<div class="form-group">
									<div class="col-sm-12">
										<input type="text" placeholder="{{#polyglot}}Add Translation{{/polyglot}}" id="translated_facility_names" class="form-control" value="{{name}}" data-facility="{{term_id}}" data-originalfacility="{{original_term_id}}">
            			</div>
								</div> '


                class Views.TranslatedRoomFacilitiesView extends Marionette.CompositeView

                    template: '<form class="form-horizontal edit_term_translation">
                                </form>
                                <div>
                                <button class="btn btn-xs aj-imp-orange-btn" name="btn_update-term-translation" id="btn_update-term-translation"> Update </button>
                                </div>'

                    tagName : 'div'

                    className : 'col-sm-5'

                    itemView : TranslatedRoomFacilitiesItemView

                    itemViewContainer: '.edit_term_translation'

                    events:
                        "click #btn_update-term-translation" : "updateFacilityTerms"

                    updateFacilityTerms: (e) ->
                        e.preventDefault()
                        facilities = []
                        @$el.find("input").each ->
                            facilities.push
                              name: $(this).val()
                              id: $(this).attr("data-facility")
                              translation_of: $(this).attr("data-originalfacility")
                            return

                        @trigger 'update:translated:facilities', facilities

                    onFacilityTermsUpdated :(errorMsg,termId) ->
                      @$el.find('.alert').remove()
                      @$el.append('<div class="alert alert-success">'+_.polyglot.t(errorMsg)+'</div>')
                      @$el.find('.alert').fadeOut 5000