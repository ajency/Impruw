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
                'click': 'showModal',
                'click .content a' : 'avoidClick'
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
             * Avoid click of menu in builder 
             * @return {[type]} [description]
             */
            avoidClick : function(event){

                event.preventDefault();

                this.$el.click();

                return false;

            },

            showModal: function() {

                var menuManagerFn = _.bind(function(_, MenuManager) {

                    var menumanager = SiteBuilder.ViewManager.findByCustom("menu-manager");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(menumanager)){
                        menumanager = new MenuManager();
                        SiteBuilder.ViewManager.add(menumanager, "menu-manager");
                    }
                    
                    //start listening to menu modal events
                    
                    //new menu added event
                    this.listenTo(SiteBuilder.vent, 'new-menu-added', this.refetchHtml);

                    //new menu order change
                    this.listenTo(SiteBuilder.vent, 'menu-order-changed', this.refetchHtml);

                    //menu remove event
                    this.listenTo(SiteBuilder.vent, 'menu-removed', this.refetchHtml);

                    //modal hide event
                    this.listenTo(SiteBuilder.vent, 'menu-manager-closed', this.stopListeningEvents);

                    menumanager.open();

                },this);

                require(['underscore', 'menumanager'], menuManagerFn);

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
                this.stopListening(SiteBuilder.vent, 'menu-manager-closed', this.stopListeningEvents);

            }

        });

        return MenuElement;
    });