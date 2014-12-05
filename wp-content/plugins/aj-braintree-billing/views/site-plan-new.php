<?php
/**
 * Represents the view for the administration dashboard.
 *
 * This includes the header, options, and other information that should provide
 * The User Interface to the end user.
 *
 * @package   ajency-braintree
 * @author    Team Ajency <team@ajency.in>
 * @license   GPL-2.0+
 * @link      http://ajency.in
 * @copyright 11-28-2014 Ajency.in
 */
?>
<?php
	global $wpdb;

	if(isset($_REQUEST['edit_planid']))
		$edit = $_REQUEST['edit_planid'];	
	else
		$edit = false;

	if(isset($_REQUEST['action']))
		$action = $_REQUEST['action'];
	else
		$action = false;

	// if($action == "save_siteplan"){
	// 	echo "<pre>";
	// 	print_r($_REQUEST);
	// 	echo "<pre>";
	// }
	// elseif($action == "delete_siteplan")
	// 	// get requested delete id
	// }

?>
<div class="wrap">

	<?php screen_icon(); ?>

	<!-- TODO: Provide markup for your options page here. -->
	<div class="wrap">

		<div id="icon-options-general" class="icon32"></div>
		<div>
			<h2>
				<?php
				if($edit > 0)
					echo __("Edit Site Plan", "ajency-braintree");
				else
					echo __("Add new  Site Plan", "ajency-braintree");


				// get the site plan 
				$table = $wpdb->base_prefix.'aj_billing_plans'; 
				if(!empty($edit) && $edit > 0)
				{
					$site_plan_object = $wpdb->get_row("SELECT * FROM $table WHERE id = '$edit' LIMIT 1", OBJECT);
				}
				else
					// didn't find a membership level, let's add a new one...
					if(empty($level))
					{
						$site_plan_object = new stdClass();
						$site_plan_object->id = NULL;
						$site_plan_object->braintree_plan_id = NULL;
						$site_plan_object->title = NULL;
						$site_plan_object->status = NULL;
						$site_plan_object->features = NULL;
						$edit = -1;
					}
				?>
			</h2> 
		</div>

		<div>
			<form action="" method="post" enctype="multipart/form-data" id="save-plan-form">
				<input name="saveid" type="hidden" value="<?php echo $edit?>" />
				<input type="hidden" name="action" value="save-site-plan" />
				<table class="form-table">
					<tbody>
						<tr>
						<th scope="row" valign="top"><label><?php _e('Plan ID', 'ajency-braintree');?>:</label></th>
							<td>
								<?php echo $site_plan_object->id; ?>						
							</td>
						</tr>								                

						<tr>
							<th scope="row" valign="top"><label for="site_plan_title"><?php _e('Site Plan title', 'ajency-braintree');?>:</label></th>
							<td><input name="site_plan_title" type="text" size="50" value="<?php echo str_replace("\"", "&quot;", stripslashes($site_plan_object->title))?>" /></td>
						</tr>

						<tr>
							<th scope="row" valign="top"><label for="site_plan_status"><?php _e('Site Plan status', 'ajency-braintree');?>:</label></th>
							<td>
								<select name="site_plan_status" id="site_plan_status">
									<option value="-1" <?php selected( $site_plan_object->status, '-1', true);?> >--Select Status--</option>
									<option value="active" <?php selected( $site_plan_object->status, 'active', true);?> >Active</option>
									<option value="archived" <?php selected( $site_plan_object->status, 'archived', true);?> >Archived</option>
									<option value="suspended" <?php selected( $site_plan_object->status, 'suspended', true);?> >Suspended</option>
								</select>
							</td>
						</tr>

						<tr>
							<th scope="row" valign="top"><label for="braintree_plan_ids"><?php _e('Braintree Plans', 'ajency-braintree');?>:</label></th>
							<td>
								<ul class="available-braintree-plans">
								<?php
									$available_braintree_plans = aj_braintree_get_braintreeplans();

									$site_plans_braintreePlans = $site_plan_object->braintree_plan_id;

									// if there are previously selected braintree plans from db
									if (!is_null($site_plans_braintreePlans)) {
										$site_plans_braintreePlans = maybe_unserialize($site_plans_braintreePlans);
									}
									else{
										$site_plans_braintreePlans = array();
									}

									$braintree_plan_index = -1;
									foreach ($available_braintree_plans as $available_braintree_plan) {
										$braintree_plan_index++;
										if (in_array($available_braintree_plan->id, $site_plans_braintreePlans)) {
											$checked = 'checked';
										}
										else{
											$checked = '';
										}
									
								?>
									<li>
										<label><input type="checkbox" value="<?php echo $available_braintree_plan->id?>" <?php echo $checked;?> name="<?php echo 'braintree_plan_ids['.$braintree_plan_index.']'?>" >
										<strong><?php echo $available_braintree_plan->name;?> (<?php echo $available_braintree_plan->currencyIsoCode;?>)</strong></label>
									</li>
								<?php } ?>
								</ul>
								<span class="description">If no plans are listed above, Please make sure plans are added in the Braintree dashboard</span>
							</td>
						</tr>

						<tr>
							<th scope="row" valign="top"><label for="plan_title"><?php _e('Plan Features', 'ajency-braintree');?>:</label></th>
							<td>
								<table class="form-table" id="plan_feature_table">
									<thead>
								
									<tr>
										<th class="row-title"><?php _e('Feature name', 'ajency-braintree');?></th>
										<th><?php _e('Status', 'ajency-braintree');?></th>
										<th><?php _e('Count', 'ajency-braintree');?></th>
										<th><input  class="button-secondary" type="button" id="add_another_feature" value="<?php _e( 'Add another feature' ); ?>" /></th>
									</tr>
									</thead>
									<tbody>
									<?php 
										$chosen_site_plan_features = $site_plan_object->features;

										// if there are previously selected braintree plans from db
										if (!is_null($chosen_site_plan_features)) {
											$chosen_site_plan_features = maybe_unserialize($chosen_site_plan_features);
										}
										else{
											$chosen_site_plan_features =  array('0' => array('name' => '',
																							 'enabled' => '-1',
																							 'count' => '-2' ) );
										}

										$feature_index = -1;
										foreach ($chosen_site_plan_features as $chosen_site_plan_feature)
										{	
											$feature_name = $chosen_site_plan_feature['name'];
											$feature_status = $chosen_site_plan_feature['enabled'];
											$feature_count = $chosen_site_plan_feature['count']; 
											$feature_index++;
									?>
									<tr valign="top">
										<td scope="row"><input name="<?php echo 'site_plan_feature['.$feature_index.'][name]'?>" id="" type="text" value="<?php echo $feature_name;?>" class="regular-text" /> </td>
										<td>
											<select name="<?php echo 'site_plan_feature['.$feature_index.'][enabled]'?>" id="site_plan_feature_status">
												<option value="-1" <?php selected( $feature_status, '-1', true);?> >--Select Status--</option>
												<option value="true" <?php selected( $feature_status, 'true', true);?> >Enabled</option>
												<option value="false" <?php selected( $feature_status, 'false', true);?> >Disabled</option>
											</select>
										</td>
										<td>
											<select name="<?php echo 'site_plan_feature['.$feature_index.'][count]'?>" id="site_plan_feature_count">
												<option value="" <?php selected( $feature_count, '', true);?>>--Select Count--</option>
												<option value="-1" <?php selected( $feature_count, '-1', true);?>>N/A</option>
												<?php for ($i=1; $i <= 10; $i++) { ?>
												<option value="<?php echo $i; ?>" <?php selected( $feature_count, $i, true);?> ><?php echo $i; ?></option>
												<?php }?>
												
											</select>
										</td>
										<td> <a href="#" id="remScnt">Remove</a></td>
									</tr>
									<?php } ?>
									</tbody>
								</table>
							</td>
						</tr>

						<tr>
							<th scope="row" valign="top"><input class="button-primary" type="button" name="save_plan" value="<?php _e( 'Save Plan' ); ?>" id="save_plan"/></th>
							 
						</tr>

					</tbody>
				</table>
			</form>
			<br class="clear">
		</div> <!-- #add-new-plan -->

	</div> <!-- .wrap -->


