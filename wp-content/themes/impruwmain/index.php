<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>
<html>
    <head>
        <?php do_action('icl_language_selector'); 
        wp_head(); echo _e("email",'impruwmain');
        ?>
    </head>
    <body>
        <?php 
        the_content();
        wp_footer();
        ?>
    </body>
</html>
