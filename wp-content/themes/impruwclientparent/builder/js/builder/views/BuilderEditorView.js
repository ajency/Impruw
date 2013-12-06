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
                
                rows        : [],

                mode        : 'layout',

                themeConfig : {},
                
                events      : {
                     'click header > .popover .updateProperties': 'updateProperties'
                },

				initialize  : function(option){
                        
                    _.bindAll(this, 'enableDropSort','getRows','is','holdOnWhileSwitching', 'removeSwitchLoader','switchMode',
                                    'switchToLayout', 'switchToContent','generateActualMarkup', 'buildRowMarkup', 'buildColumnMarkup',
                                    'getClasses');    

                    this.themeConfig = option.themeConfig;

				},
                
                /**
                 * 
                 * @returns {undefined}
                 */
                generateJSON : function(){
                   
                   var self = this;
                   
                   if(this.rows.length === 0)
                      return false;
                   
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
                   
                   _.each(this.rows, function(row, index){
                        
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
                   
                   //this.sendJSONToServer();
                   log(this.json);
                   
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
                   
                   log(element);
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
                sendJSONToServer : function(){
                   
                   $.post(AJAXURL,
                         {
                            action  : 'save_json_structure', 
                            json    : this.json
                         },
                         function(response){
                            
                            
                            
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

//                        var templatePath = 'themes/' + this.themeConfig.name + '/' + this.themeConfig.template;
//
//					    require([templatePath], function(response){
//
//                                if( !_.isUndefined(response.header.elements) && response.header.elements.length > 0)
//                                    self.addElement( response.header.elements, 0, self.$el.find('header'));
//                                 
//                                self.enableDragDrop(); 
//                                
//                              });
                        self.enableDragDrop(); 
						return this;
				},

                /**
                * Adds and element to editor
                */
                addElement : function(elements, index, parent){

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
                       
                        $(parent).append(row.render().$el);

                        self.rows.push(row);

                        if( !_.isUndefined(element.elements) && element.elements.length > 0)
                            row.addElement(element.elements, 0);
                         
                        row.adjustColumnDimension(); 
                         
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
                                        handle      : '.aj-imp-drag-handle',
                                        receive     : function(event, ui) {
                                                           
                                                            var target = $(event.target);
                                                            
                                                            var mod = 'builder/views/elements/layout/BuilderRow';
                                                            
                                                            require([mod], function(Element){
                                                                 
                                                                  var row = new Element({parent: self});
                                                                 
                                                                  self.rows.push(row);

                                                                  $(event.target).find('*[data-element="BuilderRow"]').replaceWith(row.$el);

                                                                  row.sortableColumns();

                                                                  row.appendColumnResizer();
                                                            });
                                                        },

                                        sort        : function(event , ui){
                                                            
                                                            var pHeight = ui.helper.attr('data-placeholder-height');
                                                            
                                                            ui.placeholder.height(parseInt(pHeight));
                                                        
                                                        }

                                    }).disableSelection(); 
                                                                
				},
                
                /**
                 * Returns current rows for the Editor.Top Level rows
                 * 
                 * @returns {unresolved}
                 */
                getRows : function(){
                    
                    return this.rows;
                    
                }

			});	


			return BuilderEditorView;

		});