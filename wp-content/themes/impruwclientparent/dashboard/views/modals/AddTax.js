/**
 *  Add Tax .js *  
 */
define(['views/modals/Modal', 'text!templates/modal/AddTaxTpl.tpl'   
    ], 
    function(Modal, template) {


        var MenuManager = Modal.extend({

            id: 'menu-manager',

            template: template,

            events: {
                
                'click .add-new-menu-item': 'addNewMenuItem' 
            },

            /**
             * Initialize the manager
             */
            initialize: function(args) {

                //bind 

                var html = _.template(this.outerTemplate, {
                    title: 'Add Tax'
                });

                this.$el.html(html);

                //append to body
                $('body').append(this.$el);

                this.$el.modal();

                this.$el.on('hidden.bs.modal', function(evt) {

                    if (!$('#controls-drag').is(':visible'))
                        $('#controls-drag').show();

                    //trigger the elements update self
                    SiteBuilder.vent.trigger('modal-closed', self);

                });

                //set collection
                this.menu = new MenuModel({
                     menuName : 'Main Menu'
                });

                this.fetchMenu();
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

                SiteBuilder.vent.trigger('new-menu-added');

            } 
             
             

        });

        return MenuManager;

    });
