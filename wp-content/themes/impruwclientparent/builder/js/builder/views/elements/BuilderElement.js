define(['backbone', 'jquery', 'underscore', 'global'],
    function(Backbone, $, _, global) {

        /**
         * Main Class definition
         * @type @exp;Backbone@pro;View@call;extend
         */
        var BuilderElement = Backbone.View.extend({

            //is element draggable
            draggable: true,

            //is element editable
            editable: true,

            //extra classes for an element
            extraClasses: '',

            //markup style
            markupStyle: '',

            //disallow settings
            disAllow: {},

            /**
             * Checks if element content is already fetched
             * @type {Boolean}
             */
            contentFetched : false,

            /**
             * Data source property
             * @type {Object}
             */
            dataSource : null,
            
              /**
             * Generate the json string for element
             * @returns {undefined}
             */
            returnJSON: function() {

                var ele = {
                    id              : this.get('id'),
                    elementType     : this.get('elementType'),
                    draggable       : this.get('draggable'),
                    editable        : this.get('editable'),
                    extraClasses    : this.get('extraClasses'),
                    dataSource      : this.get('dataSource'),
                    contentFetched  : this.get('contentFetched') 
                };

                return ele;
            },

            /**
             * returns the type porperty for view
             * @return {[type]} [description]
             */
            type : function(){

                return _.str.slugify(this.elementType);

            },

            /**
             * Gets the property of the view
             * @param  {[string]} property [description]
             * @return {[mixed]}          [description]
             */
            get : function(property){

                if(!_.isUndefined(property))
                    return this[property];

                return false;

            },

            /**
             * Set the property for the view
             * @param {[type]} key [description]
             * @param {[type]} val [description]
             */
            set: function(key, val) {
                    
                this[key] = val;

            },

            /**
             * retunrs the JSOn
             */
            generateJSON: function() {

                return this.returnJSON();

            },

            /**
             *
             * @returns {undefined}
             */
            void: function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                return false;
            },

            /**
             *
             */
            showContextMenu: function(evt) {

                evt.preventDefault();

                evt.stopPropagation(); //!important

                if (window.editorMode === 'content')
                    return;

                if (this.$el.next('.popover').hasClass('in')) {

                    this.$el.popover('hide');

                    //reset to null if clicked again
                    window.prevpopover = null;

                } else {
                    //hide any previously opened popover
                    if (!_.isNull(window.prevpopover))
                        window.prevpopover.popover('hide');
                    
                    this.$el.popover('show');
                    window.prevpopover = this.$el;
                }
            },

            /**
             * Rearrange elemenst according to current view order
             */
            rearrangeElementOrder: function() {

                var elements = this.getElements();

                if (elements === false)
                    return;

                var newArr = [];

                this.$el.children('.element,.row').each(function(index, element) {

                    var el = _.find(elements, function(ele) {
                        return ele.id === $(element).attr('id');
                    });
                    if (_.isUndefined(el))
                        return;
                    else
                        newArr.push(el);
                });

                this.setElements(newArr);

            },

            /**
             * Get all elements
             */
            getElements: function() {

                //does this element has child elemnts property
                if (_.isUndefined(this.elements) || !_.isArray(this.elements))
                    return false;

            },

            /**
             * Sets and array of elements
             */
            setElements: function(elements) {

                if (!_.isArray(elements))
                    return;

                this.elements = elements;

            },

            /**
             * Returns elements proper name with spaces
             * @return {[type]} [description]
             */
            elementProperName : function(){
                var capName = _.str.capitalize(this.get('elementType'));

                return capName.replace(/([a-z])([A-Z])/g, '$1 $2');
            },

            /**
             * Set context menu for element
             * @returns {undefined}
             */
            setContextMenu: function() {

                var self = this;

                this.$el.popover({
                    html        : true,
                    title       : this.elementProperName() + ' Settings',
                    content     : this.getSettingsMarkup(),
                    placement   : 'auto',
                    trigger     : 'manual'
                });

                var popOverShowFn = _.bind(function(evt) {
                    $(evt.target).next('.popover').find('.popover-content').html(this.getSettingsMarkup());
                }, this);

                this.$el.on('show.bs.popover', popOverShowFn);

                var popOverShownFn = _.bind(function(evt) {
                
                    $(evt.target).next('.popover').find('input[type="checkbox"]').checkbox();
                    $(evt.target).next('.popover').find('select').selectpicker({
                        style: 'btn-mini btn-default',
                        menuStyle: 'dropdown'
                    });
                
                }, this);

                this.$el.on('shown.bs.popover', popOverShownFn);
            },

            /**
             * Returns the setting markup
             * @returns {String}
             */
            getSettingsMarkup: function() {

                var disAllow = this.disAllow;

                var html = '';

                if (_.isUndefined(disAllow['extraClasses']))
                    html += this.getClassnameSettingMarkup();

                var className = this.type() === 'buiderrow' ? 'updateRowProperties' : 'updateProperties';

                html += '<div class="form-group">\
                                 <input value="Save" type="button" class="btn btn-primary '+className+'"/>&nbsp;\
                           </div>';

                return html;
            },

            /**
             * Return draggable setting markup
             * @returns {String}
             */
            getDraggableSettingMarkup: function() {

                return '<div class="form-group">\
                                 <label class="checkbox" for="isDraggable">\
                                   <input type="checkbox" ' + (this.get('draggable') ? 'checked="checked"' : '') + ' name="isDraggable" data-toggle="checkbox">Draggable?\
                                 </label>\
                           </div>';
            },

            /**
             * Return editable setting markup
             * @returns {String}
             */
            getEditableSettingMarkup: function() {

                return '<div class="form-group">\
                                 <label class="checkbox" for="isEditable">\
                                   <input type="checkbox" ' + (this.get('editable') ? 'checked="checked"' : '') + ' name="isEditable" data-toggle="checkbox">Is Editable?\
                                 </label>\
                           </div>';
            },

            /**
             * Return classname setting markup
             * @returns {String}
             */
            getClassnameSettingMarkup: function() {

                return '<div class="form-group">\
                                 <input type="text" name="className" class="form-control" placeholder="Classname" value="' + this.extraClasses + '">\
                           </div>';
            },

            /**
             * Return matkup style setting markup
             * @returns {String}
             */
            getMarkupStyleSettingMarkup: function() {

                return '<div class="form-group">\
                                 <select name="markupStyle"><option value="Style 1">Style 1</option><option value="Style 1">Style 1</option></select>\
                           </div>';
            },

            /**
             * Updates the properties of the element
             * @returns void
             */
            updateProperties: function(evt) {

                var pcontent = $(evt.target).closest('.popover');

                var id = pcontent.closest('.popover').prev().attr('id');

                var element = this.getElementByID(id);

                if (!_.isObject(element))
                    return;

                //set extra classes
                if ($(pcontent).find('input[name="className"]').length > 0) {

                    element.extraClasses = $(pcontent).find('input[name="className"]').val();

                    element.assignClasses();

                }

                //set is draggable
                var dEle = $(pcontent).find('input[name="isDraggable"]');
                if (dEle.length > 0) {
                    if (dEle.is(':checked')) {
                        element.draggable = true;
                    } else {
                        element.draggable = false;
                    }
                }

                //set is editable
                var eEle = $(pcontent).find('input[name="isEditable"]');
                if (eEle.length > 0) {
                    if (eEle.is(':checked')) {
                        element.editable = true;
                    } else {
                        element.editable = false;
                    }
                }

                //set is markup style
                var mEle = $(pcontent).find('select[name="markupStyle"]');
                if (mEle.length > 0) {
                    element.markupStyle = mEle.val();
                }

                $(evt.target).after('<span><small>Saved</small></span>');

                this.trigger('settings_updated', 'new');

            },

            /**
             * Returns the elemnet object by ID
             * @returns View object or false
             */
            getElementByID: function(id) {

                //is id passed?
                if (_.isUndefined(id))
                    return false;

                //does this element has child elemnts property
                if (_.isUndefined(this.elements) || !_.isArray(this.elements))
                    return false;

                //does the element has any child elements
                if (_.isArray(this.elements) && this.elements.length === 0)
                    return false;

                var element = false;

                for (var k = 0, len = this.elements.length; k < len; k++) {

                    if (this.elements[k].id === id) {
                        element = this.elements[k];
                        break;
                    }

                }

                return element;
            },

            /**
             * Loads the template reading the template file
             * @returns {void}
             */
            loadTemplate: function() {

                this.$el.append(this.template);

            },

            /**
             * checks the type of element
             * @param {type} type : type to check
             * @returns {Boolean}
             */
            is: function(type) {

                return type === this.type();

            },

            /**
             * Sets the classes for element
             * @returns {undefined}
             */
            setClasses: function() {

                this.$el.addClass(this.className);

                if (this.get('draggable'))
                    this.$el.addClass('aj-draggable');

                if (this.get('editable'))
                    this.$el.addClass('aj-editable');

            },

            /**
             * Set various handlers for element
             * Drag handler or edit handler
             * @returns {undefined}
             */
            setHandlers: function() {

                if (this.get('draggable')) {

                     this.$el.append('<div class="aj-imp-drag-handle">\
                                        <p title="Move">\
                                            <span class="icon-uniF140"></span>\
                                        </p>\
                                    </div>');
                }

                this.setEditHandlers();

            },

            /**
             * Set a edit handler
             */
            setEditHandlers: function() {

                if (!this.is('column'))
                    this.$el.append('<div class="aj-imp-delete-btn">\
                                            <span title="Delete">\
                                                &times;\
                                            </span>\
                                        </div>');

            },

            /**
             *  Sets the classes for content
             * @returns {undefined}
             */
            setContentClass: function() {

                if (!_.isUndefined(this.contentClasses))
                    this.$el.children('.content').children().first().addClass(this.contentClasses);

            },

            /**
             * Updated the default properties for the element
             * @param {type} config
             * @returns {void}
             */
            setProperties: function(config) {

                if (!_.isUndefined(config.draggable))
                    this.draggable = config.draggable === "true";

                if (!_.isUndefined(config.editable))
                    this.editable = config.editable === "true";

                if (!_.isUndefined(config.extraClasses))
                    this.extraClasses = config.extraClasses;

                this.assignClasses();  

                if (!_.isUndefined(config.dataSource))
                    this.dataSource = config.dataSource;


                if (!_.isUndefined(config.id))
                    this.id = config.id;
                else
                    this.id = this.type() + '-' + global.generateRandomId();

                this.$el.attr('id', this.id);

            },

            /**
             * Assign class
             * @return {[type]} [description]
             */
            assignClasses : function(){

                //get all classes
                var classes = this.$el.find('.content').first().attr('class');

                this.$el.find('.content').first().addClass(this.extraClasses);

            },


            /**
             * Generates the Control markup to drop
             * @returns {unresolved}
             */
            generateMarkup: function(content) {

                if (_.isUndefined(this.template))
                    return '';

                var html = '';

                if(_.isObject(content))
                    html = this.template(content);
                else
                    html = this.template();
                
                this.$el.html(html);

                this.setContentClass();

                this.setHandlers();

                //add content if sent
                if (!_.isUndefined(content) && _.isString(content)) {
                    this.$el.children('.content').html(content);
                }
                return this.$el;
            },

            /**
             * returns the content mode markup
             */
            getContentMarkup: function() {

                var content = this.$el.children('.content');
                $(content).find('*[contenteditable="true"]').removeAttr('contenteditable');
                return $(content).html();

            },

            /**
             * Listen to mouse enter event
             * @param {type} evt
             * @returns void
             */
            elementMouseEnter: function(evt) {

                evt.stopPropagation();

                if (window.editorMode !== 'layout')
                    return;

                if (!_.isNull(window.prevmouseover))
                    window.prevmouseover.elementMouseLeave(evt);

                window.prevmouseover = this;

                this.$el.children('.aj-imp-delete-btn,.aj-imp-drag-handle').stop().fadeIn();

            },

            /**
             * Listen to mouse leave event
             * @param {type} evt
             * @returns void
             */
            elementMouseLeave: function(evt) {

                evt.stopPropagation();

                if (window.editorMode !== 'layout')
                    return;

                this.$el.children('.aj-imp-delete-btn,.aj-imp-drag-handle').stop().hide();
                window.prevmouseover = null;

            },

            /**
             * Removes the element from the column
             * @returns {undefined}
             */
            destroyElement: function(evt) {

                evt.preventDefault();

                evt.stopPropagation();

                if (!confirm("Are you sure?"))
                    return;

                var parentId = this.$el.parent().attr('id');

                getAppInstance().vent.trigger('element-removed', this, parentId);

                this.removeElement(evt);

            },

            /**
             * Removes the element form the builder UI
             *
             * Call the destroy fucntion which unbinds/deletes all events attached
             * with control
             * @param {object} evt
             * @returns void
             */
            removeElement: function(evt) {

                this.$el.fadeOut(400, _.bind(this.destroy, this));
            },

            /**
             * Remove the control from memory
             *
             * @returns {undefined}
             */
            destroy: function() {

                if (_.isFunction(this.beforeClose)) {

                    this.beforeClose();

                }

                this.off(); //unbind all events of the view being closed

                this.remove(); // Remove view from DOM

                this.undelegateEvents();

                delete this.$el; // Delete the jQuery wrapped object variable

                delete this.el;
            }

        });

        return BuilderElement;

    });