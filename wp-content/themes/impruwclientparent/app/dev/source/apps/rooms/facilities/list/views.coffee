define ['app'], (App)->

    # Row views
    App.module 'FacilitiesApp.List.Views', (Views, App, Backbone, Marionette, $, _)->

        #empty view
        class FacilityItem extends Marionette.ItemView

            className: 'facility'

            tagName: 'div'

            template: '<div class="display_facility">
            							<label for="checkbox2" class="checkbox ">
            								<input type="checkbox" {{#selected}}checked="true"{{/selected}} data-toggle="checkbox" name="facility[{{term_id}}]" value="{{term_id}}">
            								<span class="facility-name">{{name}}</span>
            							</label>
            							<div class="action">
            								<a href="javascript:void(0)" class="edit">{{#polyglot}}Edit{{/polyglot}}</a>&nbsp;
            								<a href="javascript:void(0)" class="delete">{{#polyglot}}Delete{{/polyglot}}</a>
            							</div>
            						</div>
            						<div class="update_facility hidden">
            							<div class="facility_update">
            								<input type="text" name="facility_name" class="form-control input-sm" value="{{name}}" />
            								<div class="facility_actions">
            									<a href="javascript:void(0)" class="update">{{#polyglot}}Update{{/polyglot}}</a>
            									<a href="javascript:void(0)" class="cancel" >{{#polyglot}}Cancel{{/polyglot}}</a>
            								</div>
            							</div>
            						</div>'

            serializeData: ->
                data = super()
                data.selected = Marionette.getOption @, 'selected'
                data

            onShow: ->
                @$el.attr 'id': "facility-#{@model.get 'term_id'}"
                @$el.find('input[type="checkbox"]').checkbox()


            events:
                'click a.delete': ->
                    if confirm(_.polyglot.t 'Are you sure?')
                        @trigger "delete:facility:clicked", @model

                'click a.edit': ->
                    # set the value to test field
                    facility_name = @$el.find('.display_facility .facility-name').html()
                    @$el.find('input[name="facility_name"]').val facility_name
                    #@$el.find('input[name="facility_name"]').val @model.get 'name'
                    @$el.find('.display_facility').addClass 'hidden'
                    @$el.find('.update_facility').removeClass 'hidden'


                'click a.cancel': ->
                    @$el.find('.update_facility').addClass 'hidden'
                    @$el.find('.display_facility').removeClass 'hidden'

                'click a.update': ->
                    @trigger "update:facility:clicked", Backbone.Syphon.serialize @


        #empty view
        class EmptyView extends Marionette.ItemView

            className: 'empty-info empty-roomfacilities'

            tagName: 'div'

            template: 'No Facilities Found. Add Facilities to your Room here.'


        # Composite view
        class Views.FacilitiesView extends Marionette.CompositeView

            template: '<div class="facilities-list clearfix"></div>'

            itemView: FacilityItem

            emptyView: EmptyView

            itemViewContainer: '.facilities-list'

            itemViewOptions: (item, index)->
                prefacilities = Marionette.getOption @, 'prefacilities'
                id = parseInt item.get 'term_id'
                selected = false
                ids = _.values _.invert prefacilities
                v = _.filter ids, (d)->
                    parseInt(d) is id

                selected = true if v.length > 0
                selected: selected


            onUpdateView: (model)->
                term_id = model.get 'term_id'
                facility_name = model.get 'facility_name'
                #console.log(model)
                @$el.find("#facility-#{term_id} .display_facility").removeClass 'hidden'
                @$el.find("#facility-#{term_id} .update_facility").addClass 'hidden'
                @$el.find("#facility-#{term_id} .facility-name").text facility_name

