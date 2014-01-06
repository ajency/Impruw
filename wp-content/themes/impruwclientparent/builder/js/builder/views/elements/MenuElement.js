define(['builder/views/elements/BuilderElement', 'text!builder/templates/elements/MenuElement.hbs', 'global'],
    function(BuilderElement, template, global) {

        var MenuElement = BuilderElement.extend({

            //class name for view
            className: 'aj-imp-elem-menu element',

            //define template for control
            template: template,

            //element type
            elementType: 'MenuElement',

            //identify element type
            type: 'menu',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 60,

            //
            events: {
                'mouseenter': 'elementMouseEnter',
                'mouseleave': 'elementMouseLeave',
                'click > .aj-imp-delete-btn': 'destroyElement',
                'contextmenu': 'showContextMenu',
                'click': 'showModal'
            },

            /**
             * Initialize view
             *
             * @param {type} options
             * @returns {undefined}
             */
            initialize: function(options) {

                _.bindAll(this, 'refetchHtml','stopListeningEvents');

                //drop mode
                if (_.isUndefined(options.config)) {
                    this.id = this.type + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                } else {
                    this.setProperties(options.config);
                    if (!_.isUndefined(options.config.className))
                        this.contentClasses = options.config.className;
                }
                this.generateMarkup();
                this.setParent(options.parent);
                this.setContextMenu();

            },

            /**
             * Generates the markup for column
             * and triggers the column droppable function
             *
             * @param {type} col
             * @returns {_L2.Anonym$0}
             */
            render: function(col) {

                return this;
            },

            showModal: function() {

                var self = this;

                require(['underscore', 'menumanager'], function(_, MenuManager) {

                    var menumanager = SiteBuilder.ViewManager.findByCustom("menu-manager");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(menumanager)){
                        menumanager = new MenuManager();
                        SiteBuilder.ViewManager.add(menumanager, "menu-manager");
                    }

                    //start listening to menu modal events
                    
                    //new menu added event
                    self.listenTo(SiteBuilder.vent, 'new-menu-added', self.refetchHtml);

                    //new menu order change
                    self.listenTo(SiteBuilder.vent, 'menu-order-changed', self.refetchHtml);

                    //menu remove event
                    self.listenTo(SiteBuilder.vent, 'menu-removed', self.refetchHtml);

                    //modal hide event
                    self.listenTo(SiteBuilder.vent, 'modal-closed', self.stopListeningEvents);

                    menumanager.open();

                });

            },

            /**
             * Refetch for menu
             * @return {[type]} [description]
             */
            refetchHtml : function(){

                var self = this;

                var json = this.generateJSON();

                json.dataSource = {
                                    menuName : 'Main Menu'
                                };

                $.get(AJAXURL,{
                        action : 'get_element_markup',
                        json   : json
                      },
                      function(response){

                        if(response.code === 'OK'){
                            self.$el.find('.content').html(response.html);
                        }

                      },'json');


            },

            /**
             * Stop listening to modal events
             * @return {[type]} [description]
             */
            stopListeningEvents : function(modal){

                //can perform some actions to modal object if required
                this.stopListening(SiteBuilder.vent, 'new-menu-added', this.refetchHtml);
                this.stopListening(SiteBuilder.vent, 'menu-order-changed', this.refetchHtml);
                this.stopListening(SiteBuilder.vent, 'menu-removed', this.refetchHtml);
                this.stopListening(SiteBuilder.vent, 'modal-closed', this.stopListeningEvents);

            }

        });

        return MenuElement;
    });