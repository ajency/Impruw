/**
 * The Builder Editor View.
 * This is the editor view for the builder
 * Most imp file
 */

define(['underscore', 'jquery', 'backbone', 'global'],
    function(_, $, Backbone, global) {

        var BuilderEditorView = Backbone.View.extend({

            el: '#aj-imp-builder-drag-drop',

            className: 'container',

            elements: {
                header: [],
                content: [],
                footer: []
            },

            mode: 'layout',

            type: 'editor',

            contentLoaded: false,

            themeConfig: {},

            events: {
                'click header > .popover .updateProperties': 'updateProperties'
            },

            /**
             * [initialize description]
             * @param  {[object]} option
             * @return {[void]}
             */
            initialize: function(option) {

                // _.bindAll(this, 'enableDropSort', 'getRows', 'is', 'holdOnWhileSwitching', 'removeSwitchLoader', 'switchMode',
                //     'switchToLayout', 'handleRowDrop', 'switchToContent', 'holdCurrentColRef', 'getClasses');

            },

            /**
             * [generateJSON description]
             * @return {[type]}
             */
            generateJSON: function() {

                var self = this;

                this.json = {
                    header: {
                        elements: []
                    },
                    page: {
                        elements: []
                    },
                    footer: {
                        elements: []
                    }
                };

                _.each(this.elements, function(section, index) {

                    _.each(section, function(row, index) {

                        var json = row.generateJSON();

                        if (row.$el.closest('.layout-header').length === 1) {
                            self.json.header.elements.push(json);
                        }
                        if (row.$el.closest('.layout-content').length === 1) {
                            self.json.page.elements.push(json);
                        }
                        if (row.$el.closest('.layout-footer').length === 1) {
                            self.json.footer.elements.push(json);
                        }
                    });
                });


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

                if ($(pcontent).find('input[name="className"]').length > 0)
                    element.extraClasses += $(pcontent).find('input[name="className"]').val();

                if ($(pcontent).find('input[name="isDraggable"]').length > 0)
                    element.isDraggable = true;

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
                if (_.isUndefined(this.rows) || !_.isArray(this.rows))
                    return false;

                //does the element has any child elements
                if (_.isArray(this.rows) && this.rows.length === 0)
                    return false;

                var element = false;

                for (var k = 0, len = this.rows.length; k < len; k++) {

                    if (this.rows[k].id === id) {
                        element = this.rows[k];
                        break;
                    }

                }

                return element;
            },

            /**
             * Sends the json data to server
             * @returns Void
             */
            sendJSONToServer: function(evt) {

                var ozText = $(evt.target).text();

                $(evt.target).text('Please wait....');

                var _data = {
                    action: 'save_json_structure',
                    json: this.json
                };

                if ($(evt.target).hasClass('publish')) {
                    _data = {
                        action: 'publish_page',
                        pageId: 2,
                        json: this.json
                    };

                }

                $.post(AJAXURL,
                    _data,
                    function(response) {

                        $(evt.target).hide().text(ozText).fadeIn('slow');

                    }, 'json');

            },



            /**
             * Check the view type
             *
             * @param {type} type
             * @returns {Boolean}
             */
            is: function(type) {

                return type === 'editor';

            },

            /**
             *  Render function for view
             */
            render: function() {

                var self = this;

                var templatePath = '';

                $.get(AJAXURL, {
                        action: 'get_saved_layout',
                        pageId: 2
                    },
                    function(response) {

                        if (!_.isUndefined(response.header) && response.header.elements.length > 0)
                            self.addElement(response.header.elements, 0, 'header');

                        if (!_.isUndefined(response.page) && response.page.elements.length > 0)
                            self.addElement(response.page.elements, 0, 'content');

                        if (!_.isUndefined(response.footer) && response.footer.elements.length > 0)
                            self.addElement(response.footer.elements, 0, 'footer');


                        self.enableDragDrop();

                    }, 'json');


                return this;
            },

            /**
             * Adds and element to editor
             */
            addElement: function(elements, index, section) {

                if (index >= elements.length)
                    return;

                var self = this;

                //add element recall
                var element = elements[index];

                if (element.type !== 'BuilderRow')
                    return;

                var mod = 'builder/views/elements/layout/BuilderRow';

                require([mod], function(Row) {

                    var row = new Row({
                        config: element,
                        parent: self
                    });

                    self.$el.find('.layout-' + section).append(row.render().$el);

                    self.elements[section].push(row);

                    if (!_.isUndefined(element.elements) && element.elements.length > 0)
                        row.addElement(element.elements, 0);

                    index++;

                    self.addElement(elements, index, section);

                });

            },


            /**
             *
             */
            enableDragDrop: function() {

                //enable controls drag
                $("#controls-drag").draggable({
                    handle: "p.desc",
                    addClasses: false
                });

                /** Controls Draggable */
                $('*[data-element]').draggable({
                    connectToSortable: '.layout-header,.layout-content,.layout-footer,.column',
                    helper: 'clone',
                    revert: 'invalid',
                    start: function(e, t) {
                        var ele = t.helper.attr('data-element');
                        if (ele === 'BuilderRow' || ele === 'BuilderRowColumn')
                            t.helper.width(286);
                        else
                            t.helper.width(92).height(80);
                    }
                });
                this.enableDropSort();
            },

            /**
             * Switch modes
             * @returns {undefined}
             */
            switchMode: function(evt) {

                this.holdOnWhileSwitching();

                if (window.editorMode === 'layout') {

                    this.switchToContent(evt);

                } else if (window.editorMode === 'content') {

                    this.switchToLayout(evt);

                }

            },

            /**
             *  Switch to layout mode
             */
            switchToLayout: function() {

                //
                this.$el.removeClass('aj-imp-builder-content-mode').addClass('aj-imp-builder-layout-mode');

                $('#controls-drag').fadeIn();

                this.removeSwitchLoader();

                window.editorMode = 'layout';

            },

            /**
             * Show the loader while switching modes
             */
            holdOnWhileSwitching: function() {

                var switcher = $('<div class="element-drop-loader" id="editor-initial-loader">\
                                        <p>switching mode... Please wait... </p>\
                                    </div>');

                switcher.height(this.$el.height()).css('top', 0);

                this.$el.append(switcher);

            },

            /**
             * removes the switch loader
             */
            removeSwitchLoader: function() {

                this.$el.find('#editor-initial-loader').fadeOut('slow', function() {

                    $(this).remove();

                });

            },

            /**
             *  Switch to content mode
             */
            switchToContent: function(evt) {

                var self = this;

                this.$el.removeClass('aj-imp-builder-layout-mode').addClass('aj-imp-builder-content-mode');

                this.$el.parent().addClass('aj-imp-preview');
                this.$el.addClass(this.getClasses('containerClasses'));
                this.$el.children('header').addClass(this.getClasses('headerWrapperClasses'));
                this.$el.children('div[data-page="true"]').addClass(this.getClasses('contentWrapperClasses'));
                this.$el.children('footer').addClass(this.getClasses('footerWrapperClasses'));

                $('#controls-drag').fadeOut();

                this.fetchContentMarkup();

            },

            /**
             * Fetches the content for each element in json and updates .content markup
             */
            fetchContentMarkup: function() {

                var self = this;
                //return if content is alredy loaded once
                if (this.contentLoaded === true) {
                    self.removeSwitchLoader();
                    window.editorMode = 'content';
                    CKEDITOR.inlineAll();
                    return;
                }

                //get latest json
                this.generateJSON();

                var _json = this.json;

                $.post(AJAXURL, {
                        action: 'get_content_markup',
                        json: _json,
                        pageId: 2
                    },
                    function(response) {

                        if (response.code === 'OK') {

                            //set HTML
                            _.each(response.data, function(val, key) {

                                $('#' + key).children('.content').html(val);

                            });

                            self.makeEditable();
                        } else {
                            //$(evt.target).click();
                        }

                        window.editorMode = 'content';

                        self.contentLoaded = true;

                        self.removeSwitchLoader();

                    }, 'json');
            },

            /**
             *
             */
            makeEditable: function() {

                var self = this;

                require(['ckeditor'], function(CKEDITOR) {

                    CKEDITOR.on('instanceCreated', self.configureEditor);

                    CKEDITOR.inlineAll();

                    global.Holder.run();

                });

            },

            /**
             * Configure the editor
             */
            configureEditor: function(event) {

                var editor = event.editor,
                    element = editor.element;

                // Customize editors for headers and tag list.
                // These editors don't need features like smileys, templates, iframes etc.
                if (element.is('h1', 'h2', 'h3') || element.getAttribute('id') == 'taglist') {
                    // Customize the editor configurations on "configLoaded" event,
                    // which is fired after the configuration file loading and
                    // execution. This makes it possible to change the
                    // configurations before the editor initialization takes place.
                    editor.on('configLoaded', function() {

                        // Remove unnecessary plugins to make the editor simpler.
                        editor.config.removePlugins = 'colorbutton,find,flash,font,' +
                            'forms,iframe,image,newpage,removeformat,scayt,' +
                            'smiley,specialchar,stylescombo,templates,wsc';

                        // Rearrange the layout of the toolbar.
                        editor.config.toolbarGroups = [{
                            name: 'editing',
                            groups: ['basicstyles', 'links']
                        }, {
                            name: 'undo'
                        }, {
                            name: 'clipboard',
                            groups: ['selection', 'clipboard']
                        }, {
                            name: 'about'
                        }];
                    });
                }

            },

            /**
             * Binds the droppable  / sortable
             */
            enableDropSort: function() {

                var self = this;

                this.$el.children('.layout-header,.layout-content,.layout-footer').sortable({
                    revert: 'invalid',
                    items: '> .row',
                    connectWith: '.layout-header,.layout-content,.layout-footer,.column',
                    opacity: .65,
                    handle: '> .aj-imp-drag-handle',
                    receive: self.handleRowDrop,
                    stop: function(evt, ui) {

                        self.rearrangeElementOrder('header');
                        self.rearrangeElementOrder('content');
                        self.rearrangeElementOrder('footer');

                    },
                    activate: self.holdCurrentColRef,
                    sort: function(evt, ui) {

                        var pHeight = ui.helper.attr('data-placeholder-height');

                        ui.placeholder.css('max-height', parseInt(pHeight));

                    }

                }); //.disableSelection(); 

            },

            /**
             *
             */
            updateEmptyView: function() {

            },

            /**
             *
             * Handle element removal state
             *
             * @param {type} event
             * @param {type} ui
             * @returns {undefined}
             */
            handleElementRemove: function(receiver, sender, elementId) {

                _.each(sender.elements, function(element, index) {

                    if (element.id == elementId) {

                        receiver.push(element); //add the same position

                        sender.elements.splice(index, 1); //remove element

                        //change parent
                        element.setParent(receiver);
                    }

                });

                sender.updateEmptyView();

            },

            /**
             * Holds current sender column reference
             *
             * @param {type} event
             * @param {type} ui
             * @returns {undefined}
             */
            holdCurrentColRef: function(event, ui) {

                event.stopPropagation();

                ui.helper.sender = this;

            },

            /**
             * Check for column drop event
             * @param {type} event
             * @param {type} ui
             * @returns {undefined}
             */
            handleRowDrop: function(event, ui) {


                //handle if helper is null
                if (!_.isUndefined(ui.item.sender)) {

                    var section = $(event.target);

                    var receiver = '';

                    if ($(section).hasClass('layout-header'))
                        receiver = this.elements.header;

                    if ($(section).hasClass('layout-content'))
                        receiver = this.elements.content;

                    if ($(section).hasClass('layout-footer'))
                        receiver = this.elements.footer;

                    if (receiver === '')
                        return;

                    var sender = ui.item.sender;

                    var elementId = ui.item.attr('id');

                    this.handleElementRemove(receiver, sender, elementId);

                    return;
                }

                //get control to be dropped
                var elementName = ui.item.attr('data-element');

                //should allow only row and no othe element
                if (elementName !== 'BuilderRow')
                    return;

                var into = '';

                if ($(event.target).hasClass('layout-header'))
                    into = 'header';

                if ($(event.target).hasClass('layout-content'))
                    into = 'content';

                if ($(event.target).hasClass('layout-footer'))
                    into = 'footer';

                //pass control to column view to handle
                this.handleElementDrop('BuilderRow', into);

            },

            /**
             * Identifies the control drop and handle accordingly
             *
             * @param {type} controlName
             * @returns {undefined}
             */
            handleElementDrop: function(elementName, into) {

                var self = this;

                var path = '';
                path = 'builder/views/elements/layout/BuilderRow';

                //set loader
                if (self.$el.find('*[data-element="' + elementName + '"]').length > 0)
                    self.$el.find('*[data-element="' + elementName + '"]').html('<div class="element-drop-loader"></div>');

                require([path], function(Row) {

                    var row = new Row({
                        parent: self
                    });

                    if (into === 'header')
                        self.elements.header.push(row);

                    if (into === 'content')
                        self.elements.content.push(row);

                    if (into === 'footer')
                        self.elements.footer.push(row);

                    var el = row.$el;

                    if (self.$el.find('*[data-element="' + elementName + '"]').length > 0)
                        self.$el.find('*[data-element="' + elementName + '"]').replaceWith(el);

                    row.sortableColumns();
                    row.appendColumnResizer();

                });

            },

            /**
             * Rearrange elemenst according to current view order
             */
            rearrangeElementOrder: function(wrapper) {

                var elements = this.getRows(wrapper);

                if (elements.length === 0)
                    return;

                var newArr = [];

                this.$el.find('.layout-' + wrapper).children('.row').each(function(index, element) {

                    var el = _.find(elements, function(ele) {
                        return ele.id === $(element).attr('id');
                    });
                    if (_.isUndefined(el))
                        return;
                    else
                        newArr.push(el);
                });

                this.elements[wrapper] = newArr;

            },

            /**
             * Returns current rows for the Editor.Top Level rows
             *
             * @returns {unresolved}
             */
            getRows: function(section) {

                return !_.isUndefined(this.elements[section]) ? this.elements[section] : [];

            }

        });


        return BuilderEditorView;

    });