/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'jquery', 'backbone', 'global'],
		function( _ , $, Backbone, global){

			var BuilderEditorView = Backbone.View.extend({

				el          : '#aj-imp-builder-drag-drop',

				className   : 'container',
                
                elements    :   {
                                    header : [],
                                    content: [],
                                    footer : []
                                },

                mode        : 'layout',
                
                type        : 'editor',

                themeConfig : {},
                
                events      : {
                     'click header > .popover .updateProperties': 'updateProperties'
                },

				initialize  : function(option){
                        
                    _.bindAll(this, 'enableDropSort','getRows','is','holdOnWhileSwitching', 'removeSwitchLoader','switchMode',
                                    'switchToLayout', 'handleRowDrop', 'switchToContent','generateActualMarkup', 'buildRowMarkup', 'buildColumnMarkup',
                                    'getClasses');    

                    this.themeConfig = option.themeConfig;

				},
                
                /**
                 * 
                 * @returns {undefined}
                 */
                generateJSON : function(evt){
                   
                   var self = this;
                   
                   this.json =   {
                                    header : {
                                       elements : []
                                    },
                                    page : {
                                       elements : []
                                    },
                                    footer : {
                                       elements : []
                                    }
                                 };
                   
                   _.each(this.elements, function(section, index){

                        _.each(section, function(row, index){
                        
                            var json = row.generateJSON();
                            
                            if(row.$el.closest('.layout-header').length === 1){
                               self.json.header.elements.push(json);
                            }
                            if(row.$el.closest('.layout-content').length === 1){
                               self.json.page.elements.push(json);
                            }
                            if(row.$el.closest('.layout-footer').length === 1){
                               self.json.footer.elements.push(json);
                            }
                        });
                   });
                   
                   this.sendJSONToServer(evt);
                   
                },
                
                /**
                 * Updates the properties of the element
                 * @returns void
                 */
                updateProperties : function(evt){
                   
                   alert("sdsfdfsd");
                   
                   var pcontent = $(evt.target).closest('.popover');
                   
                   var id = pcontent.closest('.popover').prev().attr('id');
                   
                   var element = this.getElementByID(id);
                   
                   if(!_.isObject(element))
                      return;
                   
                   if($(pcontent).find('input[name="className"]').length > 0)
                        element.extraClasses += $(pcontent).find('input[name="className"]').val();
                     
                   if($(pcontent).find('input[name="isDraggable"]').length > 0)
                        element.isDraggable = true;
                  
                },
                
                /**
                 * Returns the elemnet object by ID
                 * @returns View object or false
                 */
                getElementByID : function(id){
                   
                   //is id passed?
                   if(_.isUndefined(id))
                      return false;
                   
                   //does this element has child elemnts property
                   if(_.isUndefined(this.rows) || !_.isArray(this.rows))
                      return false;
                   
                   //does the element has any child elements
                   if(_.isArray(this.rows) && this.rows.length === 0)
                      return false;
                   
                   var element = false;
                   
                   for(var k = 0,len=this.rows.length; k < len; k++){
                      
                      if(this.rows[k].id === id){
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
                sendJSONToServer : function(evt){

                    $(evt.target).text('Saving....');

                    log(this.json);
                   
                    $.post(AJAXURL,
                         {
                            action  : 'save_json_structure', 
                            json    : this.json
                         },
                         function(response){
                            
                            $(evt.target).text('Saved');
                            setTimeout(function(){

                              $(evt.target).hide().text('Generate JSON').fadeIn('slow');

                            },1000);

                         },'json');
                   
                },

                /**
                * Function to generate the markup of the actual site
                */
                generateActualMarkup : function(){

                    var self = this;

                    var markup  = '<html>';
                    
                    markup      += '<head>';

                    markup      += this.getThemeCSS();

                    markup      += '</head>';
                    
                    markup      += '<body>';

                    markup      += '<div class="'+ this.getClasses('containerClasses') + '">';

                    markup      += '<header class="'+ this.getClasses('headerWrapperClasses') + '">';

                    _.each(this.headerRows, function(row, index){

                        markup  += self.buildRowMarkup(row);

                    });

                    markup      += '</header><!-- End header -->';

                    markup      += '<div class="'+ this.getClasses('contentWrapperClasses') + '">';

                    _.each(this.rows, function(row, index){

                        markup  += self.buildRowMarkup(row);

                    });

                    markup      += '</div><!-- End Page Body -->';

                    markup      += '<footer class="'+ this.getClasses('footerWrapperClasses') + '">';

                    _.each(this.footerRows, function(row, index){

                        markup  += self.buildRowMarkup(row);

                    });

                    markup      += '</footer><!-- End Footer -->';

                    markup      += '</div>';
                    
                    markup      += this.getThemeJS();
                    
                    markup      += '</body>';
                    
                    markup      += '</html><!-- end html -->';


                    //save markup to server
                    $.post( 'savemarkup.php',
                            {
                                markup : markup
                            },
                            function(response){
                                
                                log('Done');

                            });

                },

                /**
                * Theme JS files
                */
                getThemeJS : function(){

                    var markup = '';
                    
                    _.each(this.themeConfig.jsFiles, function(file, index){
                     
                        markup += '<script src="js/lib/'+ file +'"></script>';
                     
                    });
                     
                    return markup;  
                },

                /**
                * Returns the classes for each container
                */
                getClasses : function(classFor){

                    if(_.isUndefined(this.themeConfig[classFor]))
                        return '';

                    var classes = this.themeConfig[classFor];

                    var c = '';

                    _.each(classes, function(cls, index){

                        c += cls + ' ';

                    });

                    return _.clean(c);

                },

                /**
                *   theme Css
                */
                getThemeCSS: function(){

                    var markup = '';
                    
                    _.each(this.themeConfig.cssFiles, function(file, index){
                     
                        markup += '<link rel="stylesheet" href="css/'+ file +'"     type="text/css" />';
                     
                    });
                     
                    return markup;    
                            
                },

                /**
                * 
                */
                buildRowMarkup : function(row){
                    
                    var self = this;

                    var markup = '<div class="row">';

                    _.each(row.getColumns(), function(column, index){

                        markup += self.buildColumnMarkup(column);

                    });

                    markup += '</div><!-- end row -->';

                    return markup;

                },

                /**
                *
                */
                buildColumnMarkup : function(column){
                    
                    var colClass = 'column col-sm-' + column.getCurrentClass();

                    var markup = '<div class="'+ colClass +'">';

                    _.each(column.getElements(), function(element, index){

                        if(element.is('row'))
                            markup += self.buildRowMarkup(element);
                        else          
                            markup += element.getContentMarkup();

                    });

                    markup += '</div><!-- end '+colClass+' -->';

                    return markup;
                
                },


                /**
                 * Check the view type
                 * 
                 * @param {type} type
                 * @returns {Boolean}
                 */        
                is : function(type){

                    return type === 'editor';

                },        

                /**
                *  Render function for view 
                */
    		    render : function(){
                            
                  var self = this;

                  var templatePath = '';

				          $.get(AJAXURL,
                         {
                            action : 'get_saved_layout',
                            id     : 2
                         }, function(response){

                            if( !_.isUndefined(response.header) && response.header.elements.length > 0)
                                self.addElement( response.header.elements, 0, 'header');

                            if( !_.isUndefined(response.page) && response.page.elements.length > 0)
                                self.addElement( response.page.elements, 0, 'content');  
                            
                            if( !_.isUndefined(response.footer) && response.footer.elements.length > 0)
                                self.addElement( response.footer.elements, 0, 'footer');   

                            self.enableDragDrop(); 

                         },'json');

                    //self.enableDragDrop(); 

					         return this;
    			},

                /**
                * Adds and element to editor
                */
                addElement : function(elements, index, section){

                    if(index >= elements.length )
                        return;

                    var self = this;

                    //add element recall
                    var element = elements[index];
                    
                    if(element.type !== 'BuilderRow')
                        return;

                    var mod = 'builder/views/elements/layout/BuilderRow';
                    
                    require([mod], function(Row){
                        
                        var row = new Row({config : element, parent : self});
                       
                        self.$el.find('.layout-' + section).append(row.render().$el);

                        self.elements[section].push(row);

                        if( !_.isUndefined(element.elements) && element.elements.length > 0)
                            row.addElement(element.elements, 0);

                        index++;

                        self.addElement(elements, index, parent);

                    });
                    
                },


                /**
                *
                */
                enableDragDrop : function(){

                    //enable controls drag
                    $( "#controls-drag" ).draggable({
                         handle: "p.desc",
                         addClasses: false
                    });
                    
                    /** Controls Draggable */
                    $('*[data-element]').draggable({
                                            connectToSortable   : '.layout-header,.layout-content,.layout-footer,.column',
                                            helper              : 'clone',
                                            revert              : 'invalid',
                                            start               : function (e, t) {
                                                                        var ele = t.helper.attr('data-element');
                                                                        if(ele === 'BuilderRow' || ele === 'BuilderRowColumn')
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
                switchMode : function(){

                    this.holdOnWhileSwitching();
                   
                    if(window.editorMode === 'layout'){

                        this.switchToContent();
                    
                    }
                    else if(window.editorMode === 'content'){
                    
                        this.switchToLayout();
                    
                    }

                },

                /**
                *  Switch to layout mode
                */
                switchToLayout : function(){

                    //
                    this.$el.removeClass('aj-imp-builder-content-mode').addClass('aj-imp-builder-layout-mode');

                    $('#controls-drag').fadeIn();

                    this.removeSwitchLoader();
                    
                    window.editorMode = 'layout';

                },

                /**
                * Show the loader while switching modes
                */
                holdOnWhileSwitching : function(){

                    var switcher = $('<div class="element-drop-loader" id="editor-initial-loader">\
                                        <p>switching mode... Please wait... </p>\
                                    </div>');

                    switcher.height(this.$el.height()).css('top',0);

                    this.$el.append(switcher);

                },

                /**
                * removes the switch loader
                */
                removeSwitchLoader : function(){

                    this.$el.find('#editor-initial-loader').fadeOut('slow', function(){
                        
                        $(this).remove();
                    
                    });

                },

                /**
                *  Switch to content mode
                */
                switchToContent : function(){
                    
                    this.$el.removeClass('aj-imp-builder-layout-mode').addClass('aj-imp-builder-content-mode');

                    this.$el.parent().addClass('aj-imp-preview');
                    this.$el.addClass(this.getClasses('containerClasses'));
                    this.$el.children('header').addClass(this.getClasses('headerWrapperClasses'));
                    this.$el.children('div[data-page="true"]').addClass(this.getClasses('contentWrapperClasses'));
                    this.$el.children('footer').addClass(this.getClasses('footerWrapperClasses'));

                    $('#controls-drag').fadeOut();

                    this.removeSwitchLoader();

                    window.editorMode = 'content';

                    this.makeEditable();

                },

                /**
                *
                */
                makeEditable : function(){

                    require(['ckeditor'], function(CKEDITOR){

                        CKEDITOR.inlineAll();

                    });

                },

				/**
				 * Binds the droppable  / sortable
				 */
				enableDropSort : function(){
                    
                    var self = this;
                    
                    this.$el.children('.layout-header,.layout-content,.layout-footer').sortable({
                                        revert      : 'invalid',
                                        items       : '> .row',        
                                        connectWith : '.layout-header,.layout-content,.layout-footer,.column',
                                        opacity     : .65,
                                        handle      : '> .aj-imp-drag-handle',
                                        receive     : function(evt , ui){
                                                        self.handleRowDrop(evt, ui);
                                                    },
                                        stop        : function(evt , ui){

                                                        self.rearrangeElementOrder('header');
                                                        self.rearrangeElementOrder('content');
                                                        self.rearrangeElementOrder('footer');

                                                    },
                                        sort        : function(evt , ui){
                                                            
                                                        var pHeight = ui.helper.attr('data-placeholder-height');
                                                        
                                                        ui.placeholder.css('max-height',parseInt(pHeight));
                                                        
                                                    }

                                    }).disableSelection(); 
                                                                
				},

                /**
                 * Check for column drop event
                 * @param {type} event
                 * @param {type} ui
                 * @returns {undefined}
                 */        
                handleRowDrop : function(event, ui){
                    
                    //get control to be dropped
                    var elementName = ui.item.attr('data-element');
                    
                    //should allow only row and no othe element
                    if(elementName !== 'BuilderRow')
                        return;

                    var receiver = this;
                    
                    // //handle if helper is null
                    // if(_.isNull(ui.helper)){
                    //     var sender = ui.item.sender;
                    //     var elementId = ui.item.attr('id');
                    //     //this.handleElementRemove(receiver, sender, elementId);
                    //     return;
                    // }
                    var into = '';
                    if($(event.target).hasClass('layout-header'))
                        into = 'header';
                    
                    if($(event.target).hasClass('layout-content'))
                        into = 'content';

                    if($(event.target).hasClass('layout-footer'))
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
                handleElementDrop : function(elementName, into){
                    
                    var self = this;
                    
                    var path = '';
                    path = 'builder/views/elements/layout/BuilderRow';
                    
                    //set loader
                    if(self.$el.find('*[data-element="'+elementName+'"]').length > 0)
                        self.$el.find('*[data-element="'+elementName+'"]').html('<div class="element-drop-loader"></div>');
                    
                    require([path], function(Row){

                        var row = new Row({parent: self});
                        
                        if(into === 'header')
                            self.elements.header.push(row);
                        
                        if(into === 'content')
                            self.elements.content.push(row);

                        if(into === 'footer')
                            self.elements.footer.push(row);
                        
                        var el = row.$el;

                        if(self.$el.find('*[data-element="'+elementName+'"]').length > 0)
                            self.$el.find('*[data-element="'+elementName+'"]').replaceWith(el);
                       
                        row.sortableColumns();
                        row.appendColumnResizer();

                    });
                   
                }, 

                /**
                 * Rearrange elemenst according to current view order
                 */
                rearrangeElementOrder : function(wrapper){

                    var elements = this.getRows(wrapper);

                    if(elements.length === 0)
                      return;

                    var newArr = [];

                    this.$el.find('.layout-' + wrapper).children('.row').each(function(index,element){
                        
                        var el = _.find(elements ,  function(ele){ 
                                                        return ele.id === $(element).attr('id');
                                                    });
                        if(_.isUndefined(el))
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
                getRows : function(section){
                    
                    return !_.isUndefined(this.elements[section]) ? this.elements[section] : [];
                    
                }

			});	


			return BuilderEditorView;

		});