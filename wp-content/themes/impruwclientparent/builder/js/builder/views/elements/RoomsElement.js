define(['builderelement', 'tpl!builder/templates/elements/BasicElement.tpl', 'global'],
    function(BuilderElement, template, global) {

        var RoomsElement = BuilderElement.extend({

            //class name for view
            className: 'aj-imp-elem-rooms element',

            //define template for control
            template: template,

            //element type
            elementType: 'RoomsElement',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 400,

            //
            events: {
                'mouseenter'                : 'elementMouseEnter',
                'mouseleave'                : 'elementMouseLeave',
                'click > .aj-imp-delete-btn': 'destroyElement',
                'click'                     : 'showModal',
                'contextmenu'               : 'showContextMenu'
            },

            /**
             * Initialize view
             *
             * @param {type} options
             * @returns {undefined}
             */
            initialize: function(options) {

                //drop mode
                if (_.isUndefined(options.config)) {
                    this.id = this.type + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                } else {
                    this.setProperties(options.config);
                }
                this.generateMarkup();
                this.setContextMenu();
            },

            /**
             * Prevents the modal from opening
             * @return {[type]} [description]
             */
            stopModalPopup : function(evt){

                //evt.preventDefault();
                evt.stopPropagation();

            },

            /**
             * SHow the modal and start listening to events
             * @return {[type]} [description]
             */
            showModal: function() {

                var sliderModal = _.bind(function(_, SliderManager) {

                    var slidermanager = SiteBuilder.ViewManager.findByCustom("slider-manager");

                    //ensure Menu manager is created just once
                    if (_.isUndefined(slidermanager)){
                        slidermanager = new SliderManager();
                        SiteBuilder.ViewManager.add(slidermanager, "slider-manager");
                    }

                    //start listening event
                    this.listenTo(SiteBuilder.vent, 'create-slider', this.createSlider);

                    //modal hide event
                    this.listenTo(SiteBuilder.vent, 'modal-closed', this.stopListeningEvents);

                    slidermanager.open();

                }, this); 

                require(['underscore', 'slidermanager'], sliderModal);

            },

            /**
             * Stop listening to modal events
             * @return {[type]} [description]
             */
            stopListeningEvents : function(modal){

                //can perform some actions to modal object if required
                this.stopListening(SiteBuilder.vent, 'create-slider', this.createSlider);
                this.stopListening(SiteBuilder.vent, 'modal-closed', this.stopListeningEvents);

            }


        });

        return RoomsElement;
    });