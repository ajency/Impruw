/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

( function() {
	'use strict';

	CKEDITOR.plugins.add( 'titlestyles', {
		requires: 'richcombo',
		// lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%

		init: function( editor ) {
			var config = editor.config,
				// styles = {},
				stylesList = [],
				allowedContent = [],
				currentStyle = '';

			editor.on('initStylesList',function(e){
				stylesList = [];
				_.each(e.data.styles,function(st){
					stylesList.push(st.name);
				});
				currentStyle = e.data.style;
			});

			

			editor.ui.addRichCombo( 'Titlestyles', {
				label: 'Title Styles',
				title: 'Title Styles',
				toolbar: 'styles,10',
				allowedContent: stylesList,

				panel: {
					css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
					multiSelect: false,
					attributes: { 'aria-label': 'Title Styles' }
				},

				init: function() {
					var style, styleName,   i, count;

					// Loop over the Array, adding all items to the
					// combo.
					for ( i = 0, count = stylesList.length; i < count; i++ ) {
						style = stylesList[ i ];
						this.add( style,style , style );
					}

					this.commit();
				},

				onClick: function( value ) {
					editor.focus();
					editor.fire( 'saveSnapshot' );
					console.log(value);
					currentStyle = value;
					this.mark(currentStyle);
					editor.fire('changedTitleStyle',{style : currentStyle});

				
					editor.fire( 'saveSnapshot' );
				},

				onOpen: function() {
					this.showAll();
					if(currentStyle!=''){
						this.mark( currentStyle);
					}

				},
			
			} );

			editor.fire('titleStylesInitDone');
		}
	} );
} )();
