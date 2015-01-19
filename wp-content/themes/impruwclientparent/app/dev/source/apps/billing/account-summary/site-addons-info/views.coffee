define ['app'
        'text!apps/billing/account-summary/templates/siteAddOnsInfo.html'], (App, viewTpl)->

    App.module 'BillingApp.SiteAddOnsInfo.View', (View, App, Backbone, Marionette, $, _)->

        class SiteAddOnsInfoItemView extends Marionette.ItemView

            template: '<div class="form-group">
                        <label for="checkbox2" class="checkbox"><input type="checkbox" data-toggle="checkbox" value="{{element}}" {{#selectStatus}}checked{{/selectStatus}}> 
                            {{title}}
                        </label>
                       </div>'
            className: 'col-sm-3'

            onShow: ->
                @$el.find('input[type="checkbox"]').radiocheck()

            mixinTemplateHelpers:(data)->
                data = super data

                data.selectStatus =->
                    selectStatus = false
                    maxAllowedCount = PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count']

                    if maxAllowedCount is 99999 
                        selectStatus = true

                    else if SELECTED_SITE_ADDONS.length <= maxAllowedCount
                        _.each SELECTED_SITE_ADDONS, (site_add_on, key) ->
                            if site_add_on is data.element
                                selectStatus = true
                    
                    selectStatus
                        
                data



        class View.SiteAddOnsInfoView extends Marionette.CompositeView

            template: viewTpl

            itemView: SiteAddOnsInfoItemView

            itemViewContainer: '#selected-site-addons'

            emptyView : EmptyBillingInfoView

            events:
                'click #btn_update-selected-addons': 'setSelectedAddOns'
                'click .checkbox' : 'checkMaximumAllowedCount'

            onShow :->
                @checkMaximumAllowedCount()

            checkMaximumAllowedCount:() ->
                maxAllowedCount = PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count']
                lengthOfSelectedAddOns = $("input:checked").length
                if lengthOfSelectedAddOns >= maxAllowedCount
                    @$el.find(":checkbox:not(:checked)").prop "disabled", true
                else
                    @$el.find(":checkbox:not(:checked)").prop "disabled", false

            setSelectedAddOns: (e)->
                e.preventDefault()

                siteaddonCheckedCount = $('div#selected-site-addons :checkbox:checked').length
                
                maxAllowedCount = PLAN_FEATURE_COUNT['site_add_ons'][0]['allowed_count']

                if siteaddonCheckedCount > maxAllowedCount
                    @$el.parent().find('.alert').remove()
                    @$el.parent().append "<div class=\"alert alert-error\"><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" + _.polyglot.t("Can select at the most "+maxAllowedCount+" site add on/add ons") + "</div>"
                    return
                

                arr = @$el.find("div#selected-site-addons input[type='checkbox']")
                selectedaddOns = new Array()
                jQuery.each arr, ->
                    selectedaddOns.push @value  if @checked
                    return

                @trigger 'update:selected:addons', selectedaddOns

            onSelectedAddonsUpdated:(response) ->
                if response.code is 'OK'
                    msg = _.polyglot.t("The selected addons were successfully updated")
                    @$el.parent().find('.alert').remove()
                    @$el.parent().append "<div class=\"alert alert-success\"><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" + msg + "</div>"
                else if response.code is 'ERROR'
                    msg = _.polyglot.t("The selected addons were not successfully updated")
                    @$el.parent().find('.alert').remove()
                    @$el.parent().append "<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" + msg + "</div>"



        class EmptyBillingInfoView extends Marionette.ItemView

            template: '<div class="row">
                            <div class="col-sm-12">
                                <div class="empty-info">'+_.polyglot.t("No site add ons are enabled yet.")+'</div>
                            </div>
                        </div>'

        class View.DisabledSiteAddOnsInfo extends Marionette.ItemView

            template: '<div class="row">
                            <div class="col-sm-12">
                                <div class="empty-info">'+_.polyglot.t("Site add ons are currently not available for your current chosen plan")+'</div>
                            </div>
                        </div>'