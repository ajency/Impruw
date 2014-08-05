define ['app'], (App)->

            App.module 'LanguageApp.LanguagePageRooms.ChoosePlans.Views', (Views, App, Backbone, Marionette, $, _)->

                class Views.ChoosePlansView extends Marionette.ItemView 

                    template: "<form class='form-horizontal'>
                                Pick a Plan: 
                                <select class='js-plan-select' id='js-plan-select'>
                                    <option value='-1'>Choose a Plan</option>
                                </select>
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

                        @trigger 'load:original:plans', selectedPlanId  
                        @trigger 'load:translated:plans', selectedPlanId 

