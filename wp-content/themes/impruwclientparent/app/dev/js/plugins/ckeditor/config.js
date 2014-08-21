/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

 CKEDITOR.stylesSet.add( 'imp_styles', [
    // Block-level styles.
    

    // Inline styles.
    { name: 'Sub Title', element: 'span', attributes: { 'class': 'title sub-title' } },
    { name: 'Site Title', element: 'span', attributes: { 'class': 'title site-title' } },
    { name: 'Page Title', element: 'span', attributes: { 'class': 'title page-title' } },
    { name: 'Box Title', element: 'span', attributes: { 'class': 'title box-title' } },
    { name: 'Small Title', element: 'span', attributes: { 'class': 'title small-title' } },
    { name: 'Action Title', element: 'span', attributes: { 'class': 'title action-title' } },
    { name: 'Footer Title', element: 'span', attributes: { 'class': 'title footer-title' } },
]);


CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	config.floatSpaceDockedOffsetX = 30;
	config.floatSpaceDockedOffsetY = 15;

	// The toolbar groups arrangement, optimized for two toolbar rows.

	config.toolbar = [
	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
	
	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
	'/',
	{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl' ] },
	{ name: 'links', items: [ 'Link', 'Unlink' ] },
	{ name: 'insert', items: [  'SpecialChar'] },
	'/',
	{ name: 'styles', items: [ 'Styles',  'Font', 'FontSize' ] },
	{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	
];



config.stylesSet = 'imp_styles';


	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
