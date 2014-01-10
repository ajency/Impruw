define(['builderelement', 'global'],
    function(BuilderElement, global) {

        var ContainerElement = BuilderElement.extend({

            className: 'container aj-imp-elem-container element',

            //identify element type
            type: 'container',

            //element type
            elementType: 'ContainerElement',

            //set height to be assigned to placeholder and helper
            placeHolderHeight: 100,

            //holds all elements for this column
            elements: [],

            /**
             * Editable property
             */
            editable: false,

            /**
             *
             */
            draggable: false,

            //events for view
            events: {
                //'mouseenter'                        : 'elementMouseEnter',
                //'mouseleave'                        : 'elementMouseLeave',
                //'click > .aj-imp-delete-btn'        : 'destroyElement'
            },

            /**
             * Initialize view
             *
             * @param {type} options
             * @returns {undefined}
             */
            initialize: function(options) {

                _.bindAll(this, 'elementMouseEnter', 'elementMouseLeave');

                this.parent = options.parent;

                //drop mode
                if (_.isUndefined(options.config)) {
                    this.id = this.type() + '-' + global.generateRandomId();
                    this.$el.attr('id', this.id);
                    //
                } else {
                    this.setProperties(options.config);
                }
                this.generateMarkup();
                this.setClasses();

            },

            /**
             *
             * @returns {undefined}
             */
            generateJSON: function() {

                var self = this;

                var json = self.returnJSON();

                if (self.getElements().length > 0) {

                    var elements = [];

                    _.each(self.getElements(), function(element, index) {

                        if (element.is('row') || element.is('container'))
                            elements.push(element.generateJSON());
                        else
                            elements.push(element.returnJSON());

                    });

                    json.elements = elements;

                }

                return json;

            },

            /**
             * returns all elements of column
             */
            getElements: function() {

                return this.elements;

            },

            /**
             * Takes and element from from array and generates the markup and append it to itself
             * @param {array} elements -
             * @param {int} index
             * @returns {void}
             */
            addElement: function(elements, index) {

                if (index >= elements.length)
                    return;

                var self = this;

                //add element recall
                var element = elements[index];

                var mod = '';
                if (element.type == 'BuilderRow' || element.type == 'BuilderRowColumn') {
                    mod = 'builder/views/elements/layout/' + element.type;
                } else {
                    mod = 'builder/views/elements/' + element.type;
                }

                require([mod], function(Element) {

                    var ele = new Element({
                        config: element,
                        parent: self
                    });

                    self.$el.append(ele.render().$el);

                    self.elements = self.elements.concat([ele]);

                    if (!_.isUndefined(element.elements) && element.elements.length > 0)
                        ele.addElement(element.elements, 0);

                    index++;

                    self.addElement(elements, index);

                });

            },

            /**
             *
             */
            generateTemplateMarkup: function() {

                return this.$el;

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
            }

        });

        return ContainerElement;
    });