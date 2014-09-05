define ['app'], (App)->

    App.module 'LanguageApp.LanguagePageContent.OriginalTable.Views', (Views, App, Backbone, Marionette, $, _)->

        class Views.OriginalTableView extends Marionette.ItemView

            tagName : 'div'

            className : 'form-group legend-group'

            template : '<div class="col-sm-12">
                            <div class="form-group table-elements">
                                
                            </div>
                        </div>'

            onShow :->
                _.each @collection.models, (model,index)=>
                    element = model.get 'element'
                    element_name = _.polyglot.t element
                    content = _.stripslashes model.get 'content'
                    html = '<label class="col-sm-3 control-label" for="">'+element_name+'</label>
                                <div class="col-sm-9 col-sm-offset-3">
                                    <div class="original '+element+'" tabindex="1">
                                        '+content+'
                                    </div>
                                </div>'
                    @$el.find('.table-elements').append html
