
( function() {

	var currentJustify = '';

	function justifyCommand( editor, name, value ) {

	}

	justifyCommand.prototype = {
		exec: function( editor ) {

			if(this.state == CKEDITOR.TRISTATE_ON){
				this.setState(CKEDITOR.TRISTATE_OFF);
				editor.currentJustify = '';
				editor.fire('setCurrentJustify',{justify:editor.currentJustify});
				return;
			}

			switch(editor.currentJustify){
				case '': break;
				case 'left':					
					editor.execCommand('titlejustifyleft');
					break;
				case 'center':					
					editor.execCommand('titlejustifycenter');
					break;
				case 'right':					
					editor.execCommand('titlejustifyright');
					break;
				case 'justify':					
					editor.execCommand('titlejustifyblock');
					break;
			}

			if(this.state == CKEDITOR.TRISTATE_OFF){
				this.setState(CKEDITOR.TRISTATE_ON);
				switch(this.name){
					case 'titlejustifyleft':
						editor.currentJustify = 'left';
						break;
					case 'titlejustifycenter':
						editor.currentJustify = 'center';					
						break;
					case 'titlejustifyright':
						editor.currentJustify = 'right';					
						break;
					case 'titlejustifyblock':
						editor.currentJustify = 'justify';					
						break;
				}
				editor.fire('setCurrentJustify',{justify:editor.currentJustify});
			}
	
		}
	};
	
	CKEDITOR.plugins.add( 'titlejustify', {
		lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
		icons: 'titlejustifyblock,titlejustifycenter,titlejustifyleft,titlejustifyright', // %REMOVE_LINE_CORE%
		hidpi: true, // %REMOVE_LINE_CORE%
		init: function( editor ) {
			// if ( editor.blockless ){
			// 	return;
			// }

			var left = new justifyCommand( editor, 'titlejustifyleft', 'left' ),
				center = new justifyCommand( editor, 'titlejustifycenter', 'center' ),
				right = new justifyCommand( editor, 'titlejustifyright', 'right' ),
				justify = new justifyCommand( editor, 'justifyblock', 'justify' );

			editor.addCommand( 'titlejustifyleft', left );
			editor.addCommand( 'titlejustifycenter', center );
			editor.addCommand( 'titlejustifyright', right );
			editor.addCommand( 'titlejustifyblock', justify );

			if ( editor.ui.addButton ) {
				editor.ui.addButton( 'TitleJustifyLeft', {
					label: editor.lang.justify.left,
					command: 'titlejustifyleft',
					toolbar: 'align,10'
				} );
				editor.ui.addButton( 'TitleJustifyCenter', {
					label: editor.lang.justify.center,
					command: 'titlejustifycenter',
					toolbar: 'align,20'
				} );
				editor.ui.addButton( 'TitleJustifyRight', {
					label: editor.lang.justify.right,
					command: 'titlejustifyright',
					toolbar: 'align,30'
				} );
				editor.ui.addButton( 'TitleJustifyBlock', {
					label: editor.lang.justify.block,
					command: 'titlejustifyblock',
					toolbar: 'align,40'
				} );
			}


			editor.on('getCurrentJustify',function(e){
				var justify = e.data.justify;
				console.log(editor.currentJustify);
				_.delay(function(){
					switch(justify){
						case '': break;
						case 'left':
							editor.execCommand('titlejustifyleft');
							break;
						case 'right':					
							editor.execCommand('titlejustifyright');
							break;
						case 'center':					
							editor.execCommand('titlejustifycenter');
							break;
						case 'justify':					
							editor.execCommand('titlejustifyblock');
							break;
					}
				},500);
			});
			editor.fire('titleJustifyInitDone');

		}
		// editor
	// } 
	});

})();