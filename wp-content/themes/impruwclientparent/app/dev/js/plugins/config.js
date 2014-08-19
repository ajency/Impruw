/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.

	config.floatSpaceDockedOffsetX = 30;
	config.floatSpaceDockedOffsetY = 15;


	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	config.toolbar = [
					// # 			# { name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
                        {name: 'clipboard',
                        groups: [ 'clipboard', 'undo' ],
                        items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ]}
                    ,
                        {name: 'editing',
                        groups: [ 'find', 'selection', 'spellchecker' ],
                        items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] }
					,
						'/'
                    ,
                        {name: 'basicstyles',
                        groups: [ 'basicstyles', 'cleanup' ,'align'],
                        items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-','RemoveFormat']}

                    ,
                        {name: 'paragraph',
                        groups: [ 'list', 'indent', 'blocks','align' ],
                    items: [
                        // 'NumberedList', 'BulletedList', '-',
                        // 'Outdent', 'Indent', '-',
                        // 'Blockquote',  '-',
                        'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']}

                    ,
            // # 			# { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                        {name: 'insert',
                        items: [ 'SpecialChar' ]}
                    ,
                        '/'
                    ,
                        {name: 'styles',
                        items: [ 'Styles',  'Font', 'FontSize' ] }
                    ,
                        {name: 'colors',
                        items: [ 'TextColor', 'BGColor' ] }
            // # 			# { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
            // # 			# { name: 'others', items: [ '-' ] },
            // # 			# { name: 'about', items: [ 'About' ] }
                    ]

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Se the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Make dialogs simpler.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
