define(['builder/views/elements/BuilderElement', 'text!builder/templates/elements/SliderElement.hbs', 'global'],
    function(BuilderElement, template, global) {

        var SliderElement = BuilderElement.extend({

            //class name for view
            className: 'aj-imp-elem-slider element',

            //define template for control
            template: template,

            //element type
            elementType: 'SliderElement',

            //identify element type
            type: 'slider',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 400,

            //
            events: {
                'mouseenter'                : 'elementMouseEnter',
                'mouseleave'                : 'elementMouseLeave',
                'click > .aj-imp-delete-btn': 'destroyElement',
                'click'                     : 'showModal',
                'contextmenu'               : 'showContextMenu',
                'click a.carousel-control'  : 'stopModalPopup'
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
                this.setParent(options.parent);

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
             * Refetch for menu
             * @return {[type]} [description]
             */
            createSlider : function(images,ids){

                var len = images.length;

                if(len == 0)
                    return;

                this.dataSource = {
                    'image-ids' : ids
                }

                var item = this.$el.find('.content').find('.carousel-inner .item');

                //first change image of current
                item.find('img').attr('src',images[0].get('sizes').full.url);
                
                //remove first
                images = _.rest(images);

                //now create and add more
                _.each(images, function(image, index){

                    var newItem = item.clone();
                    newItem.removeClass('active').find('img').attr('src',image.get('sizes').full.url);
                    item.parent().append(newItem);
                });

                //start carousel
                item.closest('.carousel').carousel();

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

        return SliderElement;
    });