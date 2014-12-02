<?php
/**
 * The template for displaying Comments.
 *
 * The area of the page that contains both current comments
 * and the comment form. The actual display of comments is
 * handled by a callback to impruwmain_comment() which is
 * located in the inc/template-tags.php file.
 *
 * @package impruwmain
 * @since impruwmain 1.0
 */
?>
 
<?php
    /*
     * If the current post is protected by a password and
     * the visitor has not yet entered the password we will
     * return early without loading the comments.
     */
    if ( post_password_required() )
        return;
?>
 
    <div id="comments" class="comments-area">
 
    <?php // You can start editing here -- including this comment! ?>
 
    <?php if ( have_comments() ) : ?>
        <h2 class="comments-title">
            <?php
                printf( _n( 'One comment on %2$s', '%1$s comments on %2$s', get_comments_number(), 'impruwmain' ),
                    number_format_i18n( get_comments_number() ), '<span>' . get_the_title() . '</span>' );
            ?>
        </h2>
 
        <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through? If so, show navigation ?>
        <nav role="navigation" id="comment-nav-above" class="site-navigation comment-navigation">
            <h1 class="assistive-text"><?php _e( 'Comment navigation', 'impruwmain' ); ?></h1>
            <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'impruwmain' ) ); ?></div>
            <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'impruwmain' ) ); ?></div>
        </nav><!-- #comment-nav-before .site-navigation .comment-navigation -->
        <?php endif; // check for comment navigation ?>
 
        <ol class="commentlist">
            <?php
                /* Loop through and list the comments. Tell wp_list_comments()
                 * to use impruwmain_comment() to format the comments.
                 * If you want to overload this in a child theme then you can
                 * define impruwmain_comment() and that will be used instead.
                 * See impruwmain_comment() in inc/template-tags.php for more.
                 */
                wp_list_comments( array( 'callback' => 'impruwmain_comment' ) );
            ?>
        </ol><!-- .commentlist -->
 
        <?php if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : // are there comments to navigate through? If so, show navigation ?>
        <nav role="navigation" id="comment-nav-below" class="site-navigation comment-navigation">
            <h1 class="assistive-text"><?php _e( 'Comment navigation', 'impruwmain' ); ?></h1>
            <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'impruwmain' ) ); ?></div>
            <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'impruwmain' ) ); ?></div>
        </nav><!-- #comment-nav-below .site-navigation .comment-navigation -->
        <?php endif; // check for comment navigation ?>
 
    <?php endif; // have_comments() ?>
 
    <?php
        // If comments are closed and there are comments, let's leave a little note, shall we?
        if ( ! comments_open() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) :
    ?>
        <p class="nocomments"><?php _e( 'Comments are closed.', 'impruwmain' ); ?></p>
    <?php endif; ?>
 	
 	<div class="blog-comment-form form-horizontal">
	    <?php 
	    	$comments_args = array(
			    // change the title of send button 
			    'label_submit'=>'Comment',
			    // change the title of the reply section
			    'title_reply'=>'Write a Reply or Comment',
			    // remove "Text or HTML to be displayed after the set of comment fields"
			    'comment_notes_before' => '',
			    'comment_notes_after' => '',
			);

			comment_form($comments_args);
	    ?>
	</div>

	<script type="text/javascript">
		jQuery(document).ready(function(){
			jQuery('.form-submit').addClass('clearfix');
			jQuery('#submit').addClass('pull-right btn aj-imp-submit');
		});
	</script>
 
</div><!-- #comments .comments-area -->