<?php

$markup = $_POST['markup'];

$file = 'preview.html';

// Write the contents back to the file
file_put_contents($file, $markup);