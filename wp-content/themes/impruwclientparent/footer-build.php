<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * 
 * @package Impruw Site
 * @subpackage Impruw Site
 * @since Impruw Site 1.0
 */
?>      
    <div id="setting-popover" style="display:none"></div>
        <div class="aj-imp-drag-menu" id="controls-drag" style="position:absolute;top:69px;left:-1px;">	
            <p class="desc" style="cursor:move">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div class="aj-imp-add-row builder-element" data-element="builderrow" data-placeholder-height="120">
                <a href="#">
                    <span class="glyphicon glyphicon-align-justify"></span>
                    Add New Row
                    <span class="glyphicon glyphicon-fullscreen pull-right"></span>
                </a>
            </div>
            <ul class="nav nav-tabs" id="builder-box-tabs">
                <li class="active"><a href="#content" data-toggle="tab">Content</a></li>
                <?php if(is_single_room_edit()): ?>
                   <li><a href="#room-elements" data-toggle="tab">Room Elements</a></li>
                <?php endif; ?>
                
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="content">
                    <ul class="aj-imp-builder-items clearfix">
                        <li>
                            <a href="#" class="drag builder-element" data-element="logoelement" data-placeholder-height="100">
                                <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                                <div class="aj-imp-builder-title">Logo</div>
                            </a>
                        </li>
                        <li >
                            <a href="#" class="drag builder-element" data-element="titleelement" data-placeholder-height="60">
                                <div class="aj-imp-builder-icon" data-icon="&#xf13c;"></div>
                                <div class="aj-imp-builder-title">Title</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="drag builder-element" data-element="imageelement" data-placeholder-height="120">
                                <div class="aj-imp-builder-icon" data-icon="&#xf10e;"></div>
                                <div class="aj-imp-builder-title">Image</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="drag builder-element" data-element="textelement" data-placeholder-height="50">
                                <div class="aj-imp-builder-icon" data-icon="&#xf111;"></div>
                                <div class="aj-imp-builder-title">Text</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="drag builder-element" data-element="menuelement" data-placeholder-height="50">
                                <div class="aj-imp-builder-icon" data-icon="&#xf112;"></div>
                                <div class="aj-imp-builder-title">Menu</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="drag builder-element" data-element="socialelement" data-placeholder-height="50">
                                <div class="aj-imp-builder-icon" data-icon="&#xf10c;"></div>
                                <div class="aj-imp-builder-title">Social</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="drag builder-element" data-element="sliderelement" data-placeholder-height="400">
                                <div class="aj-imp-builder-icon" data-icon="&#xf10c;"></div>
                                <div class="aj-imp-builder-title">Slider</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="drag builder-element" data-element="addresselement" data-placeholder-height="100">
                                <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                                <div class="aj-imp-builder-title">Address</div>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="drag builder-element" data-element="imagetextelement" data-placeholder-height="100">
                                <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                                <div class="aj-imp-builder-title">Image With Text</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <?php if(is_single_room_edit()): ?>
                    <div class="tab-pane" id="room-elements">
                        <ul class="aj-imp-builder-items clearfix">
                            <li>
                                <a href="#" class="drag builder-element" data-element="roomtitle" data-placeholder-height="100">
                                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                                    <div class="aj-imp-builder-title">Room Title</div>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="drag builder-element" data-element="roomdescription" data-placeholder-height="100">
                                    <div class="aj-imp-builder-icon"  data-icon="&#xf110;"></div>
                                    <div class="aj-imp-builder-title">Room Description</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                <?php endif; ?>
                <!-- <div class="tab-pane" id="structure">
                    Structure
                </div>
                <div class="tab-pane" id="social">
                    Social
                </div> -->
            </div>
        </div>
    </div><!-- .container -->
    <!-- TRIGGER REQUIRE.JS -->
    <script>
        var THEMEURL    = '<?php echo get_parent_template_directory_uri(); ?>';
        var SITEURL     = '<?php echo site_url(); ?>';
        var AJAXURL     = '<?php echo admin_url('admin-ajax.php'); ?>';
        var UPLOADURL   = '<?php echo admin_url('async-upload.php'); ?>';
        var _WPNONCE    = '<?php echo wp_create_nonce('media-form');?>';
        var JSVERSION   = '<?php echo JSVERSION; ?>';
    </script> 
    <script data-main="<?php echo get_parent_template_directory_uri(); ?>/builder/js/init" src="<?php echo get_parent_template_directory_uri(); ?>/js/require.js"></script>
</body>
</html>