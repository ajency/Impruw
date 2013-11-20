/**
 * The Builder Editor View. 
 * This is the editor view for the builder
 * Most imp file
 */
 
define(['underscore', 'jquery', 'backbone', 'global', 'builder/views/Elements'],
		function( _ , $, Backbone, global, Elements){

			var BuilderEditorView = Backbone.View.extend({

				el          : '#aj-imp-builder-drag-drop',

				className   : 'container',
                
                rows        : [],

                headerRows  : [],

                footerRows  : [],

                mode        : 'layout',

                themeConfig : {},

				initialize  : function(option){
                        
                    _.bindAll(this, 'enableDropSort','getRows','is','holdOnWhileSwitching', 'removeSwitchLoader','switchMode',
                                    'switchToLayout', 'switchToContent','generateActualMarkup', 'buildRowMarkup', 'buildColumnMarkup',
                                    'getClasses');    

                    this.themeConfig = option.themeConfig;

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
					
						//enable controls drag
						$( "#controls-drag" ).draggable({
							 handle: "p.desc",
							 addClasses: false
						});
                        
                        /** Controls Draggable */
                        $('*[data-element]').draggable({
                                                        connectToSortable   : '.layout-header,.layout-content,.layout-footer,.column',
                                                        helper				: 'clone',
                                                        revert 				: 'invalid',
                                                        start  				: function (e, t) {
                                                                                    var ele = t.helper.attr('data-element');
                                                                                    if(ele === 'BuilderRow' || ele === 'BuilderRowColumn')
                                                                                        t.helper.width(286);
                                                                                    else
                                                                                        t.helper.width(92).height(80);
                                                                              }                           
                                                    });
						
                        
						return this;
				},

                /**
                *
                **/
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

                                                            var row = new Elements['BuilderRow']({parent: self});

                                                            if($(target).hasClass('layout-header'))
                                                                self.headerRows.push(row);
                                                            else if($(target).hasClass('layout-content'))
                                                                self.rows.push(row);
                                                            else if($(target).hasClass('layout-footer'))
                                                                self.footerRows.push(row);

                                                            $(event.target).find('*[data-element="BuilderRow"]').replaceWith(row.generateBuilderMarkup());
                                                            
                                                            row.sortableColumns();
                                                           
                                                            row.appendColumnResizer();
                                                           
                                                            $(event.target).css('background-image','url("images/clear-background.png")');

                                                            //$(event.target).find('div.drag-here').remove();
                                                            //$(event.target).append('<div class="drag-here">Drag elements Here</div>');
                                                        
                                                        },

                                         sort       : function(event , ui){
                                                            
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