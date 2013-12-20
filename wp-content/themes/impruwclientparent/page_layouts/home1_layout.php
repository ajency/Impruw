<?php
$json = array(
        'header' => array(
            'elements' => array(
                array(
                    'type'      => 'BuilderRow',
                    'draggable' => false,
                    'editable'  => false,
                    'elements'  => array(
                        array(
                            'type'          => 'BuilderRowColumn',
                            'extraClasses'     => 'topStrip',
                            'colClass'       => 12,
                            'elements'      => array(
                                array(
                                    'type'      => 'ContainerElement',
                                    'extraClasses' => 'head container',
                                    'elements'  => array(
                                        array(
                                            'type'      => 'BuilderRow',
                                            'extraClasses' => 'row logobar',
                                            'draggable' => false,
                                            'editable'  => false,
                                            'elements'  => array(
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'extraClasses'     => 'logo col-xs-12',
                                                    'colClass'  => 4,
                                                    'elements'      => array(
                                                        array(
                                                            'type'      => 'ImageElement',
                                                            'extraClasses' => 'logo-title',
                                                            'editable'  => true,
                                                            'draggable' => false,
                                                            'data'      => array(
                                                                'attachmentId' => 14,
                                                                'size'         => 'large'
                                                            )
                                                        )
                                                    )
                                                ),
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'extraClasses'     => 'cta col-xs-12',
                                                    'colClass'      => 8,
                                                    'content'       => '<div class="contact"><span class="glyphicon glyphicon-earphone"></span>+34 954 227 116</div>
									<div class="rates"><a href="#">Check Rates</a></div>',
                                                    'elements'      => array()
                                                )
                                            )
                                        ),
                                        array(
                                            'type'      => 'BuilderRow',
                                            'draggable' => false,
                                            'editable'  => false,
                                            'elements'  => array(
                                                array(
                                                    'type'          => 'BuilderRowColumn',
                                                    'colClass'      => 12,
                                                    'elements'      => array()
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        'page' => array(
            'elements' => array(
                array(
                'type'      => 'BuilderRow',
                'draggable' => false,
                'editable'  => false,
                'elements'  => array(
                    array(
                        'type'          => 'BuilderRowColumn',
                        'colClass'  => 12,
                        'extraClasses'     => 'slideshow',
                        'elements'      => array()
                    )
                 )
             )
          )
       )
    );
    
    return $json;
    ?>