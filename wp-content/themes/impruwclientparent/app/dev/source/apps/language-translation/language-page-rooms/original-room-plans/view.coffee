define ['app'
        'text!apps/language-translation/language-page-rooms/original-language-rooms/templates/originalroomsview.html'], (App, originalroomsviewTpl)->

            App.module 'LanguageApp.LanguagePageRooms.OriginalPlans.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.OriginalPlanItemView extends Marionette.ItemView

                    template : '<div class="form-group legend-group">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="">{{#polyglot}}Plan Name{{/polyglot}}</label>
                                        <div class="col-sm-9 col-sm-offset-3">
                                            <p class="original title">
                                                {{plan_name}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group legend-group">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <label class="col-sm-3 control-label" for="">{{#polyglot}}Plan Description{{/polyglot}}</label>
                                        <div class="col-sm-9 col-sm-offset-3">
                                            <p class="original">
                                                {{plan_description}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>'
