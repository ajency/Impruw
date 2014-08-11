define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.ChoosePlans.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.EmptyView extends Marionette.ItemView

                    template: '<div class="empty-info">No Plans found for translation.</div>' 

                class Views.ChoosePlansView extends Marionette.ItemView 

                    template: "<form class='form-horizontal'>
                                    <div class='form-group'>
                                        <label class='col-sm-3 control-label label-head'>Plans</label> 
                                        <div class='col-sm-9 col-sm-offset-3'>
                                            <select class='js-plan-select' id='js-plan-select'>
                                                <option value='-1'>Choose a Plan</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>"

                    events: "click div.js-plan-select ul.selectpicker li" : "loadPlanApps"  

                    onShow :->
                       
                        _.each @collection.models, (model,index)=>
                            plan_id = model.get 'id'
                            plan_name = model.get 'plan_name'
                            html = "<option value='"+plan_id+"' >"+plan_name+"</option>"
                            @$el.find('#js-plan-select').append html

                        @$el.find( "#js-plan-select option[value='-1']" ).attr 'selected' : 'selected'
                        @$el.find('#js-plan-select').selectpicker()

                    loadPlanApps: (e) ->
                        #get the selectedIndex from the li element
                        selectedIndex = $(e.currentTarget).attr('rel')

                        #The the option's value based on the selectedIndex
                        selectedPlanId = $('select#js-plan-select option:eq(' + selectedIndex + ')').attr('value')

                        unless selectedPlanId is '-1'
                            @trigger 'load:original:plans', selectedPlanId   
                            @trigger 'load:translated:plans', selectedPlanId 
                        else
                            @$el.find('.alert').remove()
                            @$el.append('<div class="alert alert-success">'+_.polyglot.t("Please select a plan to translate")+'</div>')
                            @$el.find('.alert').fadeOut 5000  

