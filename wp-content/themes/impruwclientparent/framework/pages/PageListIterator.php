<?php

/**
 * Created by PhpStorm.
 * User: surajair
 * Date: 23/06/14
 * Time: 6:16 PM
 */

namespace framework\pages;

class PageListIterator implements \Iterator {

    /**
     * @var PageList
     */
    protected $page_list;

    /**
     * @var int
     */
    protected $current_page = 0;

    public function __construct( PageList $page_list ) {

        $this->page_list = $page_list;
    }

    /**
     * Return the current book
     * @link http://php.net/manual/en/iterator.current.php
     * @return Book Can return any type.
     */
    public function current() {

        return $this->page_list->get_page( $this->current_page );

    }

    /**
     * (PHP 5 &gt;= 5.0.0)<br/>
     * Move forward to next element
     * @link http://php.net/manual/en/iterator.next.php
     * @return void Any returned value is ignored.
     */
    public function next() {

        $this->current_page++;


    }

    public function get_ID(){

    }

    /**
     * (PHP 5 &gt;= 5.0.0)<br/>
     * Return the key of the current element
     * @link http://php.net/manual/en/iterator.key.php
     * @return mixed scalar on success, or null on failure.
     */
    public function key() {

        return $this->current_page;
    }

    /**
     * (PHP 5 &gt;= 5.0.0)<br/>
     * Checks if current position is valid
     * @link http://php.net/manual/en/iterator.valid.php
     * @return boolean The return value will be casted to boolean and then evaluated.
     *       Returns true on success or false on failure.
     */
    public function valid() {

        return $this->current_page < $this->page_list->count();
    }

    /**
     * (PHP 5 &gt;= 5.0.0)<br/>
     * Rewind the Iterator to the first element
     * @link http://php.net/manual/en/iterator.rewind.php
     * @return void Any returned value is ignored.
     */
    public function rewind() {

        $this->current_page = 0;
    }
}
