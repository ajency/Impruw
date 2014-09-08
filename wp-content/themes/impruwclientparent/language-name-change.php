<?php
/**
 * Template Name: language name change
 */
?>
<html>
<head>
    <title><?php echo get_bloginfo( 'name' ); ?> is Coming Soon!</title>
    
</head>
<body>
<div class="coming-soon">
    <?php 

        function impruw_update_language_name_switcher($translation_code)
        {
            global $wpdb;
            switch ($translation_code) {
                case 'de':
                    $name = 'Norwegisch';
                    break;

                case 'en':
                    $name = 'Norwegian';
                    break;

                case 'es':
                    $name = 'Noruega';
                    break;

                case 'fr':
                    $name = 'Norvégien';
                    break;

                case 'it':
                    $name = 'Norvegese';
                    break;

                case 'nb':
                    $name = 'Norsk';
                    break;
                
                default:
                    $name = 'Norwegian';
                    break;
            }

            if ($wpdb->get_var("SELECT id FROM {$wpdb->prefix}icl_languages_translations WHERE language_code='nb' AND display_language_code='".$translation_code."'")){

                $wpdb->query("UPDATE {$wpdb->prefix}icl_languages_translations SET name='".$name."' WHERE language_code = 'nb' AND display_language_code = '".$translation_code."'");

                delete_option('_icl_cache');
            }
        } 
        

        $translation_codes = array('en','fr','nb','es', 'de', 'it' );

        foreach ($translation_codes as $translation_code) {

            impruw_update_language_name_switcher($translation_code);
            
        }

        
        
    ?>
</div>
</body>
</html>