define [ 'app' ], ( App )->

   # Row views
   App.module 'SiteBuilderApp.Element.LanguageSwitcher.Views', ( Views, App, Backbone, Marionette, $, _ )->

      # Menu item view
      class Views.LanguageSwitcherView extends Marionette.ItemView

         className : 'logo'

         template : '{{#placeholder}}
                     <div id="lang_sel">
                         <ul>
                             <li>
                                 <a href="#" class="lang_sel_sel icl-nb">
                                     <img class="iclflag" src="http://localhost/impruw/wpmlsetup1/wp-content/plugins/sitepress-multilingual-cms/res/flags/nb.png" alt="nb" title="Norwegian Bokmål">&nbsp;Norwegian Bokmål</a>
                                 <ul>
                                     <li class="icl-en">
                                         <a href="http://localhost/impruw/wpmlsetup1/en/about-us-en/">
                                             <img class="iclflag" src="http://localhost/impruw/wpmlsetup1/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" alt="en" title="English">&nbsp;English
                                         </a>
                                     </li>
                                      <li class="icl-es">
                                          <a href="http://localhost/impruw/wpmlsetup1/en/about-us-en/">
                                            <img class="iclflag" src="http://localhost/impruw/wpmlsetup1/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png" alt="es" title="Spanish">&nbsp;Spanish
                                          </a>
                                      </li>
                                 </ul>

                             </li>
                         </ul>
                     </div>
                     {{/placeholder}}'

         mixinTemplateHelpers : ( data )->
            data = super data
            data.placeholder = true
            data

         onShow : ->
            @$el.attr "data-content", "Helps you switch between various languages in your site </a>"
            @$el.popover
               html : true
               placement : 'top'