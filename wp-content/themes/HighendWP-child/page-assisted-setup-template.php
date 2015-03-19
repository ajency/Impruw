<?php
/**
 * Template Name: Assisted setup
 */
get_header();

?>
<div id="main-content">
<div class="container aj-imp-register-form">
<h1>Let's talk shop.</h1>
<h3>Please select how and when you want to be contacted</h3>
<br><br>
<div class="row fw-content-wrap">
   <div class="col-1">
      <h1 style="text-align: center; font-weight: bolder;">1</h1>
   </div>
   <div class="col-11">
      <h3>Please select how and when you want to be contacted</h3>
      <div class="row fw-content-wrap">
         <div class="col-4">
            <h2><input name="Spencer@impruw.com" type="radio" value="Spencer@impruw.com" />Spencer@impruw.com</h2>
         </div>
         <div class="col-2">
            <h2><input name="By phone" type="radio" value="By phone" />By phone</h2>
         </div>
         <div class="col-4">
            <input name="fname" type="text" placeholder="Phone no" />
         </div>
      </div>
   </div>
</div>
<br><br>
<div class="row fw-content-wrap">
   <div class="col-1">
      <h1 style="text-align: center; font-weight: bolder;">2</h1>
   </div>
   <div class="col-11">
      <h3>We will contact you within 24 hours to discuss your new website and our payment process</h3>
   </div>
</div>
<br><br>
<div class="row fw-content-wrap">
   <div class="col-1">
      <h1 style="text-align: center; font-weight: bolder;">3</h1>
   </div>
   <div class="col-11">
      <h3>After payment has been received we will build your website and transfer it to your domain in 48 hours or less </h3>
   </div>
</div>
<br><br>
<?php 
        $sign_in_path = 'sign-in';
        if ($_GET['language'] === 'nb') {
            $sign_in_path = 'logg-inn';
        }
        else{
            $_GET['language'] = 'sign-in';
        }

        $redirect_url = get_site_url($_GET['site'], $sign_in_path);
?>
<a class="hb-button hb-carrot no-three-d aj-imp-submit" href="<?php echo $redirect_url; ?>">Take me to my dashboard</a>
</div>
</div>
<?php
get_footer();
