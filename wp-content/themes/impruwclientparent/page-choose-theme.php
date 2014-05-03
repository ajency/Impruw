<?php
/**
 * Template Name: Choose Theme Template
 */
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Impruw Choose Theme</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->
        <link href="<?php echo get_parent_template_directory_uri(); ?>/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="<?php echo get_parent_template_directory_uri(); ?>/css/flat-ui.css" rel="stylesheet" media="screen">
        <link href="<?php echo get_parent_template_directory_uri(); ?>/css/main.min.css" rel="stylesheet" media="screen">
        <link href="<?php echo get_parent_template_directory_uri(); ?>/builder/css/builder.css" rel="stylesheet" media="screen">

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="../../assets/js/html5shiv.js"></script>
          <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div class="aj-imp-builder container">
            <div class="navbar navbar-default">
                <nav role="navigation" class="aj-imp-builder-top-nav row">
                    <div class="aj-imp-builder-back col-sm-2">
                        <p class="navbar-text">
                            <a href="<?php echo get_site_url(); ?>/dashboard/"><span class="glyphicon glyphicon-arrow-left"></span> Back to Dashboard</a>
                        </p>
                    </div>
                    <div class="aj-imp-page-layout col-sm-8 clearfix">
                        <div class="navbar-text">
                            Page: <div class="btn-group select"><i class="dropdown-arrow dropdown"></i><button data-toggle="dropdown" class="btn dropdown-toggle clearfix btn-mini btn-default" id="aj-imp-page-sel"><span class="filter-option pull-left">Single Room</span>&nbsp;<span class="caret"></span></button><ul role="menu" class="dropdown-menu dropdown" style="overflow-y: auto; min-height: 111px;"><li rel="0"><a class="" href="#" tabindex="-1"><span class="pull-left">Choose Theme</span></a></li><li rel="1" class="selected"><a class="" href="#" tabindex="-1"><span class="pull-left">Single Room</span></a></li><li rel="2"><a class="" href="#" tabindex="-1"><span class="pull-left">Rooms</span></a></li><li rel="3"><a class="" href="#" tabindex="-1"><span class="pull-left">About Us</span></a></li><li rel="4"><a class="" href="#" tabindex="-1"><span class="pull-left">Home</span></a></li><li rel="5"><a class="" href="#" tabindex="-1"><span class="pull-left">Standard Room</span></a></li><li rel="6"><a class="" href="#" tabindex="-1"><span class="pull-left">Deluxe Room</span></a></li></ul></div>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                    <div class="aj-imp-builder-top-options col-sm-2">
                        <p class="navbar-text">
                            <a href="#" class="btn btn-default aj-imp-theme-btn">Choose Theme</a>
                        </p>
                    </div>
                </nav>
            </div>

            <div class="aj-imp-builder-area">
                <div class="aj-imp-theme-area">
                    <h2 class="page-title">Choose a Theme for your Site</h2>
                    <p class="desc">
                        You can choose a theme to be applied across the pages of your site, you will be able to customise your theme logo, colours, layout, and components to suit your Site and preferences.
                    </p>
                    <div class="aj-imp-block-list">
                        <ul>
                            <li class="block">
                                <div class="img-holder">
                                    <img src="<?php echo get_parent_template_directory_uri(); ?>/images/template1.jpg" />
                                </div>
                                <h6 class="desc">Classic Green Theme</h6>
                                <div class="aj-imp-choose-btn">
                                    <a href="http://classicgreen.unpruwen.com/" class="btn"><span class="glyphicon glyphicon-ok"></span>&nbsp;Choose</a>
                                </div>
                            </li>
                            <li class="block">
                                <div class="img-holder">
                                    <img src="<?php echo get_parent_template_directory_uri(); ?>/images/template2.jpg" />
                                </div>
                                <h6 class="desc">The Pink Theme</h6>
                                <div class="aj-imp-choose-btn">
                                    <a href="http://pinktheme.unpruwen.com/" class="btn"><span class="glyphicon glyphicon-ok"></span>&nbsp;Choose</a>
                                </div>
                            </li>
                            <li class="block">
                                <div class="img-holder">
                                    <img src="<?php echo get_parent_template_directory_uri(); ?>/images/template3.jpg" />
                                </div>
                                <h6 class="desc">Bold &amp; Blue Theme</h6>
                                <div class="aj-imp-choose-btn">
                                    <a href="http://bluebold.unpruwen.com/" class="btn"><span class="glyphicon glyphicon-ok"></span>&nbsp;Choose</a>
                                </div>
                            </li>
                        </ul>
                        <div class="load-more">
                            <a href="#" class="btn btn-wide"><span class="glyphicon glyphicon-repeat"></span>&nbsp;Load More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script src="<?php echo get_parent_template_directory_uri(); ?>/dashboard/lib/jquery.min.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="<?php echo get_parent_template_directory_uri(); ?>/js/bootstrap.min.js"></script>
        <script src="<?php echo get_parent_template_directory_uri(); ?>/js/bootstrap-select.js"></script>
        <script>
            jQuery('select').selectpicker({style: 'btn-mini btn-default', menuStyle: 'dropdown'});
        </script>
    </body>
</html>