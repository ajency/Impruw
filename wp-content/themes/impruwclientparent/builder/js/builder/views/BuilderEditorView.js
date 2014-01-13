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
                header  : [],
                content : [],
                footer  : []
            },

            mode: 'layout',

            type: 'editor',

            contentLoaded: false,

            /**
             * [initialize description]
             * @param  {[object]} option
             * @return {[void]}
             */
            initialize: function(option) {

                 _.bindAll(this, 'elementRemoved', 'handleRowDrop','updateRowProperties','searchElementIn');
            
                 $(document).on('click', '.updateRowProperties', this.updateRowProperties);

                 //listen to element remove event
                 this.listenTo(getAppInstance().vent, 'element-removed', this.elementRemoved);

                 this.id = this.$el.attr('id');
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

                var checkInSection = _.bind(function(row, index) {

                    var json = row.generateJSON();

                    if (row.$el.closest('.layout-header').length === 1) {
                        this.json.header.elements.push(json);
                    }
                    
                    if (row.$el.closest('.layout-content').length === 1) {
                        this.json.page.elements.push(json);
                    }

                    if (row.$el.closest('.layout-footer').length === 1) {
                        this.json.footer.elements.push(json);
                    }

                }, this);

                _.each(this.elements, function(section, index) {

                    _.each(section, checkInSection);
                    
                });
            },

            /**
             * Element deletion handled here
             * @return {[type]} [description]
             */
            elementRemoved : function(deletedElement, parentId){

                
                //if this column was parent of the element
                if(parentId !== this.id)
                    return;

                _.each(this.elements, _.bind(function(section, index) {

                    _.each(section, _.bind(function(row, index) {

                        if (row.get('id') == deletedElement.get('id')) {

                            section.splice(index, 1); //remove element

                        }
                    }, this));

                }, this));

                getAppInstance().vent.trigger('row-element-removed', this);

            },

            /**
             * This function saves the initial layout for the page
             * makes a call to  Editors SaveInitialLayout function
             * @return {[type]} [description]
             */
            saveInitialLayout : function(evt){
                
                var text = $(evt.target).text();

                //get the JSON
                this.generateJSON();

                $(evt.target).text('Saving...')

                //save it
                $.post(AJAXURL,
                        {
                            action      : 'save_initial_layout',
                            forTheme    : this.getCurrentThemeID(),
                            forPage     : this.getCurrentPage(),
                            json        : this.json
                        },
                        function(response){        
                            $(evt.target).text(text);    
                            if(response.code === 'OK'){

                            }else{

                            }

                        },'json');

            },

            /**
             * Function get the current selected theme ID,
             * Value of current selected theme is stored as cookie
             * @return {[int]} Theme ID
             */
            getCurrentThemeID : function(){

                var t = $.cookie('current_theme');

                return _.isUndefined(t) ? 0 : parseInt(t);

            },

            /**
             * Function get the current selected theme ID,
             * Value of current selected theme is stored as cookie
             * @return {[int]} Theme ID
             */
            getCurrentPageID : function(){

                var t = $.cookie('current_page_id');

                return _.isUndefined(t) ? 0 : parseInt(t);

            },

            /**
             * Function get the current selected page,
             * Value of current selected theme is stored as cookie
             * @return {[int]} Theme ID
             */
            getCurrentPage : function(){

                var p = $.cookie('current_page_id');

                return _.isUndefined(p) ? 0 : p;
                
            },

            /**
             * Updates the properties of the element
             * @returns void
             */
            updateRowProperties: function(evt) {

                evt.stopPropagation();

                var pcontent = $(evt.target).closest('.popover');

                var id = pcontent.closest('.popover').prev().attr('id');

                var element = this.getRowElementByID(id);
                 
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
            getRowElementByID: function(id) {

                //is id passed?
                if (_.isUndefined(id))
                    return false;

                var element = false;

                _.each(this.elements, function(section, name){
                    
                    _.each(section, function(row, index){
                        if (row.id === id) {
                            element = row;
                        }

                    });
                });

                return element;
            },

            /**
             * Returns the elemnet object by ID
             * @returns View object or false
             */
            getElementByID: function(id) {

                //is id passed?
                if (_.isUndefined(id))
                    return false;

                var element = false;

                var self = this;

                _.each(this.elements, function(section, name){
                    
                    if(element !== false)
                        return;

                    _.each(section, function(row, index){

                        if(element !== false)
                            return;

                        element = self.searchElementIn(row, id);

                    });

                });



                return element;
            },

            /** 
             * Search element in given element
             * @return {[type]} [description]
             */
            searchElementIn : function(ele, id){

                var element = false;

                var self = this;

                _.each(ele.elements, function(e, index){

                    if(element !== false)
                        return;

                    if (e.id === id) {
                        element = e;
                    }
                    else if(!_.isUndefined(e.elements) && _.isArray(e.elements)){
                        element = self.searchElementIn(e, id);
                    }

                });

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
                        action  : 'get_initial_saved_layout',
                        forPage  : this.getCurrentPage(),
                        forTheme : this.getCurrentThemeID()
                    },
                    _.bind(function(response) {

                        if (!_.isUndefined(response.header) && response.header.elements.length > 0)
                            this.addElement(response.header.elements, 0, 'header');

                        if (!_.isUndefined(response.page) && response.page.elements.length > 0)
                            this.addElement(response.page.elements, 0, 'content');

                        if (!_.isUndefined(response.footer) && response.footer.elements.length > 0)
                            this.addElement(response.footer.elements, 0, 'footer');

                        
                        this.enableDragDrop();

                    },this), 'json');


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

                if (element.elementType !== 'BuilderRow')
                    return;

                var mod = _.str.slugify(element.elementType);

                require([mod], _.bind(function(Row) {

                    var row = new Row({
                        config: element,
                        parent: self
                    });

                    this.$el.find('.layout-' + section).append(row.render().$el);

                    this.elements[section].push(row);

                    if (!_.isUndefined(element.elements) && element.elements.length > 0)
                        row.addElement(element.elements, 0);

                    index++;

                    this.addElement(elements, index, section);

                },this));

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
                    delay: 5,
                    addClasses: false,
                    distance : 5,
                    revert: 'invalid',
                    start: function(e, t) {
                        
                        var ele = t.helper.attr('data-element');
                        
                        if (ele === 'builderrow' || ele === 'builderrowcolumn')
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

                this.$el.parent().removeClass('site-style-container');

                this.$el.find('hr.virtual-divider').show();
                this.$el.find('header, footer').css('min-height','150px');
                this.$el.find('div[data-page="true"]').css('min-height','400px');

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

                this.$el.parent().addClass('aj-imp-preview').addClass('site-style-container');;
                this.$el.find('hr.virtual-divider,.aj-imp-drag-handle,.aj-imp-delete-btn,.aj-imp-col-divider,.aj-imp-col-sel').hide();
                this.$el.find('header, div[data-page="true"], footer').css('min-height','10px');
                
                $('#controls-drag').fadeOut();

                if (!_.isNull(window.prevpopover))
                        window.prevpopover.popover('hide');

                this.fetchContentMarkup();

            },

            /**
             * Fetches the content for each element in json and updates .content markup
             */
            fetchContentMarkup: function() {

                var self = this;

                //get latest json
                this.generateJSON();

                var _json = this.json;

                $.post(AJAXURL, {
                        action: 'get_content_markup',
                        json: _json,
                        pageId: this.getCurrentPage()
                    },
                    function(response) {

                        if (response.code === 'OK') {

                            //set HTML
                            _.each(response.data, function(val, key) {

                                $('#' + key).children('.content').html(val);

                                var ele = self.getElementByID(key);

                                ele.set('contentFetched', true);

                            });

                            self.makeEditable();
                        } else {
                            
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

                if(self.contentLoaded)
                    return;

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
                    sort: _.throttle(function(evt, ui) {

                        var pHeight = ui.helper.attr('data-placeholder-height');

                        ui.placeholder.css('max-height', parseInt(pHeight));

                    },100)

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
                if (elementName !== 'builderrow')
                    return;

                var into = '';

                if ($(event.target).hasClass('layout-header'))
                    into = 'header';

                if ($(event.target).hasClass('layout-content'))
                    into = 'content';

                if ($(event.target).hasClass('layout-footer'))
                    into = 'footer';

                //pass control to column view to handle
                this.handleElementDrop(elementName, into);

            },

            /**
             * Identifies the control drop and handle accordingly
             *
             * @param {type} controlName
             * @returns {undefined}
             */
            handleElementDrop: function(elementName, into) {

                //set loader
                if (this.$el.find('*[data-element="' + elementName + '"]').length > 0)
                    this.$el.find('*[data-element="' + elementName + '"]').html('<div class="element-drop-loader"></div>');

                var addRowFn = _.bind(function(Row) {

                    var row = new Row({
                        parent: this
                    });

                    if (into === 'header')
                        this.elements.header.push(row);

                    if (into === 'content')
                        this.elements.content.push(row);

                    if (into === 'footer')
                        this.elements.footer.push(row);

                    var el = row.$el;

                    if (this.$el.find('*[data-element="' + elementName + '"]').length > 0)
                        this.$el.find('*[data-element="' + elementName + '"]').replaceWith(el);

                    row.sortableColumns();
                    row.appendColumnResizer();

                }, this);

                require([elementName], addRowFn);

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