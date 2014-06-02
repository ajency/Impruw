<?php

global $element_templates;

$element_templates = array(
    'Menu'          => array(
        array(
            'name' => 'Slimmenu'
        ),
        array(
            'name' => 'Footer Menu'
        )
    ),
    'Title'         => array(
        array(
            'name' => 'Box Title'
        )
    ),
    'Row'           => array(
        array(
            'name' => 'Green Background'
        ),
        array(
            'name' => 'Center Container'
        ),
        array(
            'name' => 'Grey Background'
        ),
        array(
            'name' => 'Shaded Background'
        ),
        array(
            'name' => 'Column Dividers'
        )
    ),
    'Address'       => array(
        array(
            'name'     => 'Default Style',
            'template' => '<ul><li><span class="fui-home"></span> {{address}}</li><li><span class="glyphicon glyphicon-earphone"></span> {{phoneno}}</li><li><span class="fui-mail"></span> {{email}}</li></ul>'
        ),
        array(
            'name'     => 'Small Address',
            'template' => '<div><div class="info"><span class="fui-home"></span> {{address}}</div><div class="info"><span class="glyphicon glyphicon-earphone"></span> {{phoneno}}</div><div class="info"><span class="fui-mail"></span> {{email}}</div></div>'
        )
    ),
    'Social'        => array(
        array(
            'name' => 'Default Style'
        ),
        array(
            'name' => 'Small Social'
        )
    ),
    'Link'          => array(
        array(
            'name' => 'Default Style'
        ),
        array(
            'name' => 'Button'
        )
    ),
    'ContactForm'   => array(
        array(
            'name' => 'Style One'
        ),
        array(
            'name' => 'Style Two'
        )
    ),
    'ImageWithText' => array(
        array(
            'name' => 'Style One'
        ),
        array(
            'name' => 'Style Two'
        )
    )
);
