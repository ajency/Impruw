/**
 *  Menu Manager .js
 *  Contains all logic to handle menu configurations
 *  Add/Editing/Deleting Menu
 */
define(['builder/views/modals/Modal', 'tpl!builder/templates/modal/menumanager.tpl',
        'menumodel', 'menucollection', 'global', 'nestable', 'parsley'
    ],

    function(Modal, template, MenuModel, MenuCollection, global) {


        var MenuManager = Modal.extend({

            id: 'menu-manager',

            template: template,

            events: {
                'click .refetch-menus': 'fetchMenus',
                'click .add-new-menu-item': 'addNewMenuItem',
                'click .update-new-menu-item': 'addNewMenuItem',
                'click .remove-menu-item': 'removeMenuItem',
                'click #update-menu-order': 'updateMenuOrder'
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                //bind 

                var html = this.outerTemplate({
                    title: 'Menu Manager'
                });

                this.$el.html(html);

                //append to body
                $('body').append(this.$el);

                this.$el.modal();

                this.$el.on('hidden.bs.modal', function(evt) {
                    //trigger the elements update self
                    getAppInstance().vent.trigger('modal-closed', self);

                });

                //set collection
                this.menu = new MenuModel({
                     menuName : 'Main Menu'
                });

                this.fetchMenu();
            },

            /**
             * Update menu order
             */
            updateMenuOrder: function(evt) {

                var hierarchy = this.$el.find('.sortable-menu').nestedSortable('toHierarchy', {
                    startDepthCount: 0
                });

                this.menu.updateMenuOrder(hierarchy, {
                    success: function(response) {

                        var span = $('<span> Menu order updated successfully</span>');

                        $(evt.target).after($(span));

                        setTimeout(function() {
                            $(span).remove();
                        }, 2000);

                        //trigger the menu order changed event
                        SiteBuilder.vent.trigger('menu-order-changed');

                    },
                    error: function(response) {
                        var span = $('<span>&nbsp;Failed to update order. Please try again</span>');

                        $(evt.target).after($(span));

                        setTimeout(function() {
                            $(span).remove();
                        }, 2000);
                    }
                });

            },

            /**
             * adds the new menu item
             */
            addNewMenuItemToList: function(item) {

                var cID = 'menu-item-' + item.ID;

                var cloned = ($('#' + cID).length > 0) ? $('#' + cID) : this.$el.find('li.list-group-item').first().clone();

                //set properties
                $(cloned).attr('id', cID).css('list-style', 'none');
                $(cloned).find('.menu-name').text(item.title);
                var _id = this.menu.get('slug') + '-item-' + item.ID;
                $(cloned).find('.menu-edit a').attr('href', '#' + _id);
                $(cloned).find('.menu-item-edit').attr('id', _id);
                $(cloned).find('input[name="item-title"]').val(item.title);
                $(cloned).find('input[name="item-url"]').val(item.url);
                $(cloned).find('input[name="item-id"]').val(item.ID);

                if ($('#' + cID).length == 0) {
                    $(cloned).hide();
                    this.$el.find('.sortable-menu').append($(cloned).show());
                    $(cloned).effect('highlight');
                } else {
                    setTimeout(function() {
                        $(cloned).effect('highlight');
                    }, 400);
                }

                getAppInstance().vent.trigger('new-menu-added');

            },

            /**
             * Remove menu items
             */
            removeMenuItem: function(evt) {

                if (!confirm("Are you sure you want to remove this menu?"))
                    return;

                var _itemId = $(evt.target).closest('.action-div').children('input[name="item-id"]').val();
                var _menuId = $(evt.target).closest('.action-div').children('input[name="menu-id"]').val();
                 
                $(evt.target).closest('.action-div').find('span.error').remove();

                $.post(AJAXURL, {
                        action: 'remove_menu_item',
                        menuId: _menuId,
                        itemId: _itemId
                    },
                    function(response) {

                        if (response.code === 'OK') {
                            var parent = $(evt.target).closest('.list-group-item');

                            parent.find('*[data-toggle="collapse"]').click();

                            setTimeout(function() {

                                $(parent).slideUp('fast', function() {
                                    $(parent).remove();
                                });
                                
                                getAppInstance().vent.trigger('menu-removed');

                            }, 400);

                        } else {

                            $(evt.target).parent().after('&nbsp;&nbsp;&nbsp;<span class="error">' + response.message + '</span>');
                        }

                    }, 'json');
            },

            /**
             * Add new menu item to menu
             */
            addNewMenuItem: function(evt) {

                var form = $(evt.target).closest('form');

                if (!$(form).parsley('validate'))
                    return;

                var self = this;

                var data = $(form).serializeArray();

                var _data = {
                    action: 'save_menu_item'
                };

                _.each(data, function(ele, index) {

                    _data[ele.name] = ele.value;

                });

                $(evt.target).attr('disabled', true).text('Saving...');
                $(evt.target).parent().find('span.error').remove();

                $.post(AJAXURL,
                    _data,
                    function(response) {

                        $(evt.target).removeAttr('disabled').text('Save');
                        if (response.code === 'OK') {

                            if (_data['item-id'] == 0)
                                $(form).find('input').val('');

                            var data = {
                                ID: response.itemID,
                                menuOrder: 100,
                                title: _data['item-title'],
                                url: _data['item-url']
                            };

                            self.menu.updateMenuItem(data);
                            self.addNewMenuItemToList(data);
                        } else if (response.code === 'ERROR') {
                            if ($(evt.target).hasClass('add-new-menu-item'))
                                $(evt.target).closest('form').parent().effect('shake');
                            else
                                $(evt.target).closest('form').effect('shake');
                        }

                    }, 'json');

            },



            /**
             * Triggers the fetch of MenuCollection
             * Check if the collection is already fetched. If yes, ignores
             * @returns {undefined}
             */
            fetchMenu: function() {

                if (this.menu.isFetched())
                    return;

                var self = this;

                //show initial fetch loader
                this.$el.find('.modal-body').html('fetching menus... please wait...');

                var _fetchSuccessFn = _.bind(function(model, response) {

                    this.menu.setFetched(true);
                    markup = this.template({
                        menu: model
                    });

                    this.$el.find('.modal-content').append(markup);

                    //make collapsable
                    this.$el.find('*[data-toggle="collapse"]').collapse();

                    // activate Nestable for list 1
                    this.$el.find('.sortable-menu').nestedSortable({
                        handle              : 'div',
                        items               : 'li',
                        toleranceElement    : '> div',
                        maxLevels           : 2
                    });

                }, this);

                this.menu.fetch({
                    success: _fetchSuccessFn,
                    error: function() {
                        self.$el.find('.modal-body').html('Failed to fetch menus from server. <a href="#" class="refetch-menus">Click here</a>Please try again.');
                    }
                })

            }

        });

        return MenuManager;

    });