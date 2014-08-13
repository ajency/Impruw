define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.TranslatedPolicy.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.TranslatedPolicyView extends Marionette.ItemView
                    tagName : 'div'

                    className : 'col-sm-5'

                    template : '<form class="form-horizontal edit_additional_policy">
                                <div class="form-group">
                                    <div class="col-sm-12">
                                        <input type="text" placeholder="{{#polyglot}}Add Translation{{/polyglot}}"  class="form-control" value ="{{additional_policy}}" data-siteoption= "additional-policy">
                                    </div>
                                </div> 
                                </form>
                                <div>
                                <button class="btn btn-xs aj-imp-orange-btn" name="btn_update-additional_policy" id="btn_update-additional_policy"> Update </button>
                                </div>
                                '

                    events:
                        "click #btn_update-additional_policy" : "updatePolicy"

                    updatePolicy: (e) ->
                        e.preventDefault()
                        siteTranslation = []
                        @$el.find("input").each ->
                            siteTranslation.push
                              translated_option: $(this).val()
                              translation_of_option: $(this).attr("data-siteoption")
                            return

                        @trigger 'update:translated:policy', siteTranslation

                    onPolicyUpdated :() ->
                      @$el.find('.alert').remove()
                      @$el.append('<div class="alert alert-success">'+_.polyglot.t('Policy translation updated successfully')+'</div>')
                      @$el.find('.alert').fadeOut 5000