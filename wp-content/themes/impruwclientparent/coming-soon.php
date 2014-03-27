<?php
/**
 * Template Name: Coming Soon
 */
?>
<html>
	<head>
		<title><?php echo get_bloginfo('name'); ?> is Coming Soon!</title>
		<style type="text/css">
			html, body {margin: 0; padding: 0;}
			body {background: #eee; font-family: 'Helvetica', Arial, sans-serif; font-size: 14px;}
			.coming-soon {width: 50%; margin: 100px auto; text-align: center;}
			.coming-soon h1 {
				font-size: 2em;
				color: #182944;
			}
			.coming-soon h1 span {color: #FF7E00;}
			.coming-soon .fixed {
				background: #fff;
				position: fixed;
				padding: 1em;
				font-size: 0.88em;
				color: #AAAAAA;
				bottom: 0;
				left: 0;
				width: 100%;
				border-top: 1px solid #849FB0;
			}
		</style>
	</head>
	<body>
		<div class="coming-soon">
			<h1><span><?php echo get_bloginfo('name'); ?></span> is Coming Soon!</h1>
			<footer class="fixed">
				&copy;Impruw 2014 | All Rights Reserved.
			</footer>
		</div>
	</body>
</html>