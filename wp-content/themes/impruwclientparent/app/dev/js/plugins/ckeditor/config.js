/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */


CKEDITOR.stylesSet.add( 'neon-theme_title_styles', [
    // Block-level styles.
    { name: 'Title', element: 'h3' },
    // Inline styles.  
    { name: 'Site Title', element: 'span', attributes: { 'class': 'title site-title' } },
    { name: 'Page Title', element: 'span', attributes: { 'class': 'title page-title' } },
    { name: 'Box Title', element: 'span', attributes: { 'class': 'title box-title' } },
    { name: 'Line Title', element: 'span', attributes: { 'class': 'title line-title' } },
    { name: 'Footer Title', element: 'span', attributes: { 'class': 'title footer-title' } },
    { name: 'Sub Title', element: 'span', attributes: { 'class': 'title sub-title' } },
]);

CKEDITOR.stylesSet.add( 'diamond-theme_title_styles', [
    // Block-level styles.
    { name: 'Title', element: 'h3' },
    // Inline styles.
    { name: 'Page Title', element: 'span', attributes: { 'class': 'title page-title' } },
    { name: 'Action Title', element: 'span', attributes: { 'class': 'title action-title' } },
    { name: 'Site Title', element: 'span', attributes: { 'class': 'title site-title' } },
    { name: 'Box Title', element: 'span', attributes: { 'class': 'title box-title' } },
    { name: 'Footer Title', element: 'span', attributes: { 'class': 'title footer-title' } },
    { name: 'Small Title', element: 'span', attributes: { 'class': 'title small-title' } },
    { name: 'Sub Title', element: 'span', attributes: { 'class': 'title sub-title' } },
    
    
]);

CKEDITOR.stylesSet.add( 'pink-theme_title_styles', [
    // Block-level styles.
    { name: 'Title', element: 'h3' },
    // Inline styles.
    { name: 'Page Title', element: 'span', attributes: { 'class': 'title page-title' } },
    { name: 'Sub Title', element: 'span', attributes: { 'class': 'title sub-title' } },
    { name: 'Blue Capital Title', element: 'span', attributes: { 'class': 'title blue-capital-title' } }
]);

CKEDITOR.stylesSet.add( 'minimal-theme_title_styles', [
    // Block-level styles.
    { name: 'Title', element: 'h3' },
    // Inline styles.
    { name: 'Page Title', element: 'span', attributes: { 'class': 'title page-title' } },
    { name: 'Site Title', element: 'span', attributes: { 'class': 'title site-title' } },
    { name: 'Sub Title', element: 'span', attributes: { 'class': 'title sub-title' } },
]);

CKEDITOR.stylesSet.add( 'blue-bold_title_styles', [
    // Block-level styles.
    { name: 'Title', element: 'h3' },
    // Inline styles.
    { name: 'Page Title', element: 'span', attributes: { 'class': 'title page-title' } },
    { name: 'Inner Title', element: 'span', attributes: { 'class': 'title inner-title' } },
    { name: 'Grey Title Text', element: 'span', attributes: { 'class': 'title grey-title-text' } },
    { name: 'Thumb Main Title', element: 'span', attributes: { 'class': 'title thumb-main-title' } },
    { name: 'Footer Title', element: 'span', attributes: { 'class': 'title footer-title' } },
    { name: 'Emphasis Title', element: 'span', attributes: { 'class': 'title emphasis-text' } },
    { name: 'Footer Sub Title', element: 'span', attributes: { 'class': 'title footer-sub-title' } },
    { name: 'Title Super Text', element: 'span', attributes: { 'class': 'title title-super-text' } },  
    { name: 'Small Title', element: 'span', attributes: { 'class': 'title small-title' } },
    { name: 'Sub Title', element: 'span', attributes: { 'class': 'title sub-title' } },
    { name: 'Thumb Title', element: 'span', attributes: { 'class': 'title thumb-title' } },   
]);

CKEDITOR.stylesSet.add( 'classic-green_title_styles', [
    // Block-level styles.
    { name: 'Title', element: 'h3' },
    // Inline styles.
    { name: 'Small Grey Title', element: 'span', attributes: { 'class': 'title small-grey-title' } },
    { name: 'Center Title', element: 'span', attributes: { 'class': 'title center-title' } },
    { name: 'White Title', element: 'span', attributes: { 'class': 'title white-title' } },
    { name: 'Box Title', element: 'span', attributes: { 'class': 'title box-title' } },
    { name: 'Sub Title', element: 'span', attributes: { 'class': 'title sub-title' } },
]);



 CKEDITOR.stylesSet.add( 'imp_body_styles', [
 	{ name : 'Paragraph',element : 'p'}
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
	{ name: 'styles', items: [  'Titlestyles', 'Font', 'FontSize' ] },
	{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	
];



config.stylesSet = 'imp_body_styles';


	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
    
};
