<?php
/**
 * Template Name: Site Builder Initial
 */
get_header('build');
?>
<div class="aj-imp-builder-area">
    <div class="aj-imp-browser-preview">
        <div class="aj-imp-browser-header">
            <div class="row">
                <div class="col-sm-2">
                    <ul class="aj-imp-browser-dots">
                        <li class="red"><span>&nbsp;</span></li>
                        <li class="yellow"><span>&nbsp;</span></li>
                        <li class="green"><span>&nbsp;</span></li>
                    </ul>
                </div>
                <div class="col-sm-4">
                    <h3 class="aj-imp-browser-title">How does your site look in a browser?</h3>
                </div>
                <div class="col-sm-6">
                    <div class="aj-imp-page-publish">
                        <!-- <div id="aj-imp-preview-sel" class="dropdown"> 
                            <a data-toggle="dropdown" href="#">Preview <span class="caret"></span></a>
                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                <li role="presentation">
                                    <div class="aj-imp-preview-box">
                                        <h6>Choose Device</h6>
                                        <ul class="clearfix">
                                            <li><a href="#" class="selected"><span class="icon-uniF121"></span></a></li>
                                            <li><a href="#"><span class="icon-uniF120"></span></a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div> 
                        <div class="divider">&nbsp;</div>
                        <div class="aj-imp-publish">
                            <a href="#" id="generate-markup">Generate Markup</a>
                        </div>
                        <div class="divider">&nbsp;</div>
                        <div class="aj-imp-publish">
                            <a href="#" id="generate-json">Generate Layout</a>
                        </div>
                        <div class="divider">&nbsp;</div>-->
                        <div class="aj-imp-publish">
                            <a href="#" id="save-initial-layout" class="publish">Save Layout</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row second">
                <div class="col-sm-6">
                    <div class="aj-imp-browser-address-bar">
                       <?php echo site_url(); ?>
                    </div>
                </div>
                <div class="col-sm-3">
                    <!-- <div class="aj-imp-choose-layout" class="dropdown">
                        <a data-toggle="dropdown" href="#" class="aj-imp-layout-btn"><span class="glyphicon glyphicon-th"></span> Page Layout <span class="caret"></span></a>
                        <ul id="choose-template" class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Template 1</a></li>
                            <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Template 2</a></li>
                        </ul>
                    </div> -->
                </div>
                <div class="aj-imp-mode-switch col-sm-3">
                    <div class="switch-toggle switch-2">
                        <input id="week-d1" name="view-d" type="radio" checked>
                        <label for="week-d1" onclick="" class="editormode">Layout Mode</label>

                        <input id="month-d2" name="view-d" type="radio">
                        <label for="month-d2" onclick="" class="editormode">Content Mode</label>

                        <a class="btn btn-warning"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="aj-imp-browser-body">
            <!-- CLIENT SITE START -->
            <div class="container aj-imp-builder-layout-mode" id="aj-imp-builder-drag-drop">
                <header class="layout-header">

                </header>
                <hr class="virtual-divider"/>   
                <div class="layout-content" data-page="true">

                </div>
                <hr class="virtual-divider"/>   
                <footer class="layout-footer">

                </footer>
                <div class="element-drop-loader" id="editor-initial-loader">
                    <p>Loading editor... Please wait... </p>
                </div>
            </div>
            <!-- CLIENT SITE END -->
        </div>
        <div class="aj-imp-browser-footer">

        </div>
    </div>
</div>
<?php
get_footer('build');
