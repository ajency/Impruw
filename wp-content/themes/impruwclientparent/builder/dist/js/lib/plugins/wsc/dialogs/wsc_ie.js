/*
 Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add("checkspell",function(e){function t(e,t){var r=0;return function(){"function"==typeof window.doSpell?("undefined"!=typeof u&&window.clearInterval(u),n(e)):180==r++&&window._cancelOnError(t)}}function n(t){var n=new window._SP_FCK_LangCompare,r=CKEDITOR.getUrl(e.plugins.wsc.path+"dialogs/"),u=r+"tmpFrameset.html";window.gFCKPluginName="wsc",n.setDefaulLangCode(e.config.defaultLanguage),window.doSpell({ctrl:s,lang:e.config.wsc_lang||n.getSPLangCode(e.langCode),intLang:e.config.wsc_uiLang||n.getSPLangCode(e.langCode),winType:i,onCancel:function(){t.hide()},onFinish:function(n){e.focus(),t.getParentEditor().setData(n.value),t.hide()},staticFrame:u,framesetPath:u,iframePath:r+"ciframe.html",schemaURI:r+"wsc.css",userDictionaryName:e.config.wsc_userDictionaryName,customDictionaryName:e.config.wsc_customDictionaryIds&&e.config.wsc_customDictionaryIds.split(","),domainName:e.config.wsc_domainName}),CKEDITOR.document.getById(o).setStyle("display","none"),CKEDITOR.document.getById(i).setStyle("display","block")}var r=CKEDITOR.tools.getNextNumber(),i="cke_frame_"+r,s="cke_data_"+r,o="cke_error_"+r,u,r=document.location.protocol||"http:",a=e.lang.wsc.notAvailable,f='<textarea style="display: none" id="'+s+'" rows="10" cols="40"> </textarea><div id="'+o+'" style="display:none;color:red;font-size:16px;font-weight:bold;padding-top:160px;text-align:center;z-index:11;"></div><iframe src="" style="width:100%;background-color:#f1f1e3;" frameborder="0" name="'+i+'" id="'+i+'" allowtransparency="1"></iframe>',l=e.config.wsc_customLoaderScript||r+"//loader.webspellchecker.net/sproxy_fck/sproxy.php?plugin=fck2&customerid="+e.config.wsc_customerId+"&cmd=script&doc=wsc&schema=22";return e.config.wsc_customLoaderScript&&(a+='<p style="color:#000;font-size:11px;font-weight: normal;text-align:center;padding-top:10px">'+e.lang.wsc.errorLoading.replace(/%s/g,e.config.wsc_customLoaderScript)+"</p>"),window._cancelOnError=function(t){if("undefined"==typeof window.WSC_Error){CKEDITOR.document.getById(i).setStyle("display","none");var n=CKEDITOR.document.getById(o);n.setStyle("display","block"),n.setHtml(t||e.lang.wsc.notAvailable)}},{title:e.config.wsc_dialogTitle||e.lang.wsc.title,minWidth:485,minHeight:380,buttons:[CKEDITOR.dialog.cancelButton],onShow:function(){var n=this.getContentElement("general","content").getElement();n.setHtml(f),n.getChild(2).setStyle("height",this._.contentSize.height+"px"),"function"!=typeof window.doSpell&&CKEDITOR.document.getHead().append(CKEDITOR.document.createElement("script",{attributes:{type:"text/javascript",src:l}})),n=e.getData(),CKEDITOR.document.getById(s).setValue(n),u=window.setInterval(t(this,a),250)},onHide:function(){window.ooo=void 0,window.int_framsetLoaded=void 0,window.framesetLoaded=void 0,window.is_window_opened=!1},contents:[{id:"general",label:e.config.wsc_dialogTitle||e.lang.wsc.title,padding:0,elements:[{type:"html",id:"content",html:""}]}]}}),CKEDITOR.dialog.on("resize",function(e){var e=e.data,t=e.dialog;"checkspell"==t._.name&&((t=(t=t.getContentElement("general","content").getElement())&&t.getChild(2))&&t.setSize("height",e.height),t&&t.setSize("width",e.width))});