<?php
/**
 * Template Name: Assisted setup
 */
get_header();
$user = get_user_by( 'id', $_GET['user'] );

?>
<div id="main-content">
   <form class="form-horizontal clearfix" method="post"  name="frm_assisted_setup" id="frm_assisted_setup"  data-parsley-validate >
     <?php
     $ajax_nonce = wp_create_nonce("new_user_assisted_setup");
     echo "<script> var ajax_nonce ='" . $ajax_nonce . "' </script>";
     ?>
   <div class="container aj-imp-register-form">
      <h1><?php echo __("Let's talk shop.", "impruwmain"); ?></h1>
      <h3><?php echo __("Please select how and when you want to be contacted", "impruwmain"); ?></h3>
      <br><br>
      <div class="row fw-content-wrap">
         <div class="col-1">
            <b style="text-align: right; font-weight: bolder; display:block;">1</b>
         </div>
         <div class="col-11">
            <?php echo __("Please select how and when you want to be contacted", "impruwmain"); ?>
            <div class="row fw-content-wrap form-group">
               <div class="col-4">
                  <input name="assisted_setup_contact_mode" type="radio" value="by_email"  id = "assisted_setup_contact_email"parsley-required="true" parsley-required-message="<?php echo __('Please select a mode of contact.', 'impruwmain'); ?>"  class="form-control" />  <?php echo $user->user_email; ?>
               </div>
               <div class="col-2">
               <input name="assisted_setup_contact_mode" type="radio" id = "assisted_setup_contact_phone" value="by_phone" class="form-control"/> <?php echo __("By phone", "impruwmain"); ?>
               </div>
               <div class="col-4">
                  <input name="phone_number" type="text" pattern=".+" placeholder="<?php echo __("Phone no", "impruwmain"); ?>" class="form-control" />
                  <div class='p-messages phone-number'></div>
               </div>
            </div>
         </div>
      </div>
      <br><br>
      <div class="row fw-content-wrap">
         <div class="col-1">
            <b style="text-align: right; font-weight: bolder; display:block;" >2</b>
         </div>
         <div class="col-11">
            <?php echo __("We will contact you within 24 hours to discuss your new website and our payment process", "impruwmain"); ?>
         </div>
      </div>
      <br><br>
      <div class="row fw-content-wrap">
         <div class="col-1">
            <b style="text-align: right; font-weight: bolder; display:block;">3</b>
         </div>
         <div class="col-11">
            <?php echo __("After payment has been received we will build your website and transfer it to your domain in 48 hours or less ", "impruwmain"); ?>
         </div>
      </div>
      <br><br>
      <input type="hidden" name="language" value="<?php echo $_GET['language']; ?>">
      <input type="hidden" name ="site_id" value="<?php echo $_GET['site']; ?>">
      <input type="hidden" name ="user_id" value="<?php echo $_GET['user']; ?>">

      <div class="row fw-content-wrap">
          <div class="col-1">&nbsp;</div>
          <div class="col-11">
            <button class="hb-button hb-carrot no-three-d aj-imp-submit" id="btn_assisted_setup_info" name="btn_assisted_setup_info"><?php echo __("Take me to my dashboard", "impruwmain"); ?></button>
         </div>
      </div>


   </div>
   </div>
   </form>


<?php
get_footer();
