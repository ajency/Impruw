<?php

class impruw_email_accounts {

	public static function get_url($func, $id=false) {

		$url = "http://api.impruw.com/email".$func."/";

		if ($id !== false) {

			$url .= $id."/";
		}
		#$url .= "?authkey=".impruw_email_db::get_authkey($url);

		return $url;
	}

	public static function get_account($email_addr) {

		$url = self::get_url("Account",$email_addr);
		$d = file_get_contents($url);
		return unserialize($d);
	}

	public static function create_account($email,$pass) {

		if (impruw_email_db::is_connected()) {

			$acc = impruw_email_db::create_account($email, $pass);
			return $acc;
		} else {

			$acc = new imp_email(0);
			$acc->email = $email;
			$acc->save();
			$acc->update_password($pass);

			return $acc;
		}
	}

	public static function get_domain($domainname, $create_if_non = false) {

		if (preg_match("!^.+@(.+\.[a-z]{2,6})$!", $domainname, $m)) {
			$domainname = $m[1];
		}

		$url = self::get_url("Domain", $domainname);
		$d = file_get_contents($url);
		return unserialize($d);
	}

	public static function get_domains() {

		$d = file_get_contents(self::get_url("Domains"));
		return unserialize($d); 
	}

	public static function get_aliases($dn) {
	}

}

class impruw_email_db {

	private static $DB = NULL;
	private static $secret_key = "vohN1hieUvaec8ojAa2yohngieM5eiF6ied5rueXdoarom8K";

	public static function init() {

		$dbhost = "localhost";
		$dbuser = "postfix";
		$dbpass = "Afu4beib";
		$dbname = "postfix";

		self::$DB = new mysqli($dbhost,$dbuser,$dbpass,$dbname);
	}

	public static function is_connected() {

		return is_object(self::$DB);
	}

	public static function get_authkey($s) {

		return hash("sha256", self::$secret_key.$s);
	}

	public static function query($sql) {
		if (self::is_connected()) {
			return self::$DB->query($sql);
		} else {
			throw new Exception("No active database connection.", 4);
		}
	}

	public static function insert_id() {
		return self::$DB->insert_id;
	}

	public static function error() {
		return self::$DB->error;
	}

	public static function errno() {
		return self::$DB->errno;
	}

	public static function affected_rows() {
		return self::$DB->affected_rows;
	}

	public static function get_account($email_addr) {

		$email = NULL;
		$sql = "select id,email,domain_id,length(password)>0 has_password "
			."from virtual_users "
			."where email=\"".addslashes($email_addr)."\"";
		$q = self::$DB->query($sql);

		if ($q && $q->num_rows == 1) {

			$email = $q->fetch_object("imp_email");
		} else {

			$sql = "select u.id,u.email,u.domain_id,length(u.password)>0 has_password "
				."from virtual_aliases a "
			    ."join virtual_users u on (a.destination=u.email) "
				."where a.source=\"".addslashes($email_addr)."\"";
			$alias_q = self::$DB->query($sql);

			if ($alias_q && $alias_q->num_rows == 1) {
				$email = $alias_q->fetch_object("imp_email");
			}
		}

		return $email;
	}

	public static function create_account($email,$pass) {

		$email = strtolower($email);
		if (!preg_match("!^[a-z0-9_\-\.]+@[a-z0-9\-\._]+\.[a-z]{2,4}$!", $email)) {
			throw new Exception("Not a valid e-mail address", 5);
			return NULL;
		}

		$account = new imp_email(0);
		$account->email = $email;
		$account->save();

		$account->update_password($pass);

		return $account;
	}

	public static function get_domain($domainname,$create_if_non=false) {

		$sql = "select * "
			."from virtual_domains "
			."where name=\"".addslashes($domainname)."\"";
		$q = self::$DB->query($sql);

		$domain = NULL;
		if ($q && $q->num_rows == 1) {

			$domain = $q->fetch_object("imp_email_domain");

		} else if ($create_if_non) {

			$domain = new imp_email_domain(0);
			$domain->name = $domainname;
			$domain->save();
		}

		return $domain;
	}

	public static function get_domains() {
		$sql = "select * from virtual_domains";
		$q = self::$DB->query($sql);

		$res = array();
		if ($q && $q->num_rows > 0) {
			while ($o = $q->fetch_object("imp_email_domain")) {
				$res[] = $o;
			}
		}
		return $res;
	}

	public static function get_aliases($dn) {

		$domain = self::get_domain($dn);

		if ($domain) {
			return $domain->get_aliases();
		}
		return array();
	}

} # end class img_email_accounts

/** 
* if the classes below is loaded by mysqli_result::fetch_object($class_name)
* Dont forget to assign the database descriptor. 
* (object from img_email_accounts)
*/

class imp_db_item {

	function __construct($id = false) {

		$this->add_debug_message("construct(".$id.")");

		if ($id !== false) {
			$this->id = $id;
		}

		if (!empty($this->id)) {

			$this->load();
		} else {
			$this->has_password = false;
		}
	}

	function load() {

		if (impruw_email_db::is_connected()) {
			$this->load_db();
		} else {
			$this->load_web();
		}
	}
	function load_web() {}
	function load_db() {}

	function save() {

		$res = false;

		if (impruw_email_db::is_connected()) {

			$this->add_debug_message("save_db()");
			$res = $this->save_db();

		} else {

			$this->add_debug_message("save_web()");
			$res = $this->save_web();
		}

		return $res;
	}

	function save_web() {

		$this->add_debug_message("serialize");
		$serial_obj = serialize($this);
		$url = impruw_email_accounts::get_url("Update");

		$data = http_build_query(array(
			"object" => $serial_obj,
			"auth_key" => $this->get_auth_key($serial_obj),
		));

		$req = curl_init($url);
		curl_setopt( $req, CURLOPT_POST, 1);
		curl_setopt( $req, CURLOPT_POSTFIELDS, $data);
#		curl_setopt( $req, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt( $req, CURLOPT_HEADER, 0);
		curl_setopt( $req, CURLOPT_RETURNTRANSFER, 1);

		$res = curl_exec($req);
		curl_close($req);

		$res_obj = @unserialize($res);
		if (is_object($res_obj)) {

			$res_obj->add_debug_message("unserialize");

		} else {

			$res_obj_type = is_array($res_obj) ? "array" : "unknown";
			$msg = "Result data type was ".$res_obj_type." not object.";

			if (is_array($res_obj)) {

				$msg = "Result data was an array not object";
				$errcode = 1;

			} else if (empty($res)) {

				$msg = "Result data is empty";
				$errcode = 2;
			}

			$res_obj = new Exception($msg, $errcode);
		}

		return $res_obj;
	}

	function save_db() {
		return false;
	}

	function get_auth_key($s) {

		$secret_key = "Ahraci4VNuphohw6Raemieh1Zumie2ooyee1or3O";
		return hash("sha256", $secret_key.$s);
	}

	function get_hostname() {

		if (isset($_SERVER["HTTP_HOST"])) return $_SERVER["HTTP_HOST"];
		else return gethostname();
	}

	## D E B U G G I N G  F U N C T I O N S ##
	function backtrace() {

		$trace = "";

		foreach(debug_backtrace() as $i => $e) {
			$e["num"] = $i;
			$trace .= sprintf("#%d %s @ %d: %s::%s()\n",
				$e["num"], $e["file"], $e["line"],
				$e["class"], $e["function"]);
		}

		return $trace;
	}

	function add_debug_message($s) {

		if (!$this->do_store_debug_messages()) return;

		if (!isset($this->debug) || !is_array($this->debug)) {
			$this->debug = array();
		}
		$this->debug[] = array(
			"time" => date("Y-m-d H:i:s %Z"),
			"hostname" => $this->get_hostname(),
			"file" => __FILE__,
			"line" => __LINE__,
			"message" => $s,
		);
	}

	function do_store_debug_messages() {
		return false;
	}
}

class imp_email extends imp_db_item {

	function load_db() {

		$sql = "select domain_id,email, length(password)>0 has_password "
			."from virtual_users "
			."where id=".$this->id;
		$q = impruw_email_db::query($sql);

		if ($q && $q->num_rows == 1) {
			foreach ($q->fetch_assoc() as $k => $v) {
				$this->$k = $v;
			}
		}
	}

	function load_web() {

		if (!isset($this->id) || $this->id == 0) return;

		$account = impruw_email_accounts::get_account($this->email);
		if (is_object($account)) {

			$this->domain_id = $account->domain_id;
			$this->email = $account->email;
			$this->has_password = isset($account->has_password) ? $account->has_password : false;
		} else {

			throw new Exception("Could not load account data", 3);
		}
	}

	function update_password($password) {

		if (!isset($this->id)) return false;

		if (impruw_email_db::is_connected()) {

			$pw_sql = "NULL";
			if (!empty($password)) {
				$pw_sql = "encrypt(\"".$password."\", concat(\"$6$\",SUBSTRING(SHA(RAND()),-16))) ";
			}

			$sql = "update virtual_users "
				."set password=".$pw_sql." "
				."where id=".$this->id;
			$q = impruw_email_db::query($sql);

			if ($q && impruw_email_db::affected_rows()==1) {
				$this->has_password = !empty($password);

				return $this;
			}
			
			return false;
		} else {

			$this->new_password = $password;
			$obj = $this->save_web();
			return $this->has_password;
		}
	}

	function check_password($pass) {

		if (!isset($this->db)) return false;

		$sql = "select 1 from virtual_users "
			."where password=encrypt(\"".$pass."\",password ) and id=".$this->id;
		$q = impruw_email_db::query($sql);

		if ($q && $q->num_rows == 1) return true;
		return false;
	}

	function get_aliases() {
		
		$res = array();

		if (!impruw_email_db::is_connected()) {

			$url = impruw_email_accounts::get_url("AccountAliases", $this->email);
			$d = file_get_contents($url);
			$res = unserialize($d);

		} else {

			$sql = "select * from virtual_aliases where destination=\"".$this->email."\"";
			$q = impruw_email_db::query($sql);
			if ($q && $q->num_rows > 0) {
				while ($t = $q->fetch_object("imp_email_alias")) {
					$res[] = $t;
				}
			}
		}

		return $res;
	}

	function add_alias($email) {

		$alias = new imp_email_alias(0);
		$alias->source = $email;
		$alias->destination = $this->email;
		$alias->domain_id = $this->domain_id;

		if ($alias->save()) return $alias;
		return NULL;
	}

	function delete_alias($src_email) {

		$res = false;

		if (impruw_email_db::is_connected()) {

			$sql = "delete from virtual_aliases "
				."where source=\"".$src_email."\" "
					."and destination=\"".$this->email."\"";
			$q = impruw_email_db::query($sql);
			$res = impruw_emai_db::errno() == 0 && impruw_email_db::affected_rows()==1;
		} else {

			$this->alias_to_delete = $src_email;
			$res = $this->save_web();
		}

		return $res;

	}

	function get_domain() {

		$domain = impruw_email_accounts::get_domain($this->domain_id);

		if (empty($this->domain_id)) {
			if (isset($this->email) && preg_match("!@(.+\.[a-z]{2,4})$!",$this->email,$m_domain)) {
				$sql =  "select * from virtual_domains where name=\"".$m_domain[1]."\"";
				$q = impruw_email_db::query($sql);

				if ($q && $q->num_rows > 0) {
					$domain = $q->fetch_object("imp_email_domain");
				}
			}
		}
		if (!empty($this->domain_id)) {
			$domain = new imp_email_domain($this->domain_id);
		}

		return $domain;
	}

	function save_db() {

		#if (!impruw_email_db::is_connected()) return;

		$email = isset($this->email) ? $this->email : "";
		preg_match("!@(.+\.[a-z]{2,4})$!", $email, $m_domain);
		$domainname = $m_domain[1];

		$domain = impruw_email_db::get_domain($domainname);

		if (!$domain) {

			$domain = new imp_email_domain(0);
			$domain->name = $domainname;
			$domain->save();
		}

		if (!$domain || empty($email)) return; # nothing to save

		$this->domain_id = $domain->id;

		if (empty($this->id)) {

			$sql = "insert into virtual_users "
				."set email=\"".$email."\",domain_id=".$this->domain_id;
			impruw_email_db::query($sql);
			$this->id = impruw_email_db::insert_id();

		} else {

			$sql = "update virtual_users "
				."set email=\"".$email."\",domain_id=".$this->domain_id
				." where id=".$this->id;
			impruw_email_db::query($sql);
		}
		$res = impruw_email_db::errno()==0 && impruw_email_db::affected_rows()==1;

		# if there a new password sent remotly
		if (isset($this->new_password)) {
			$this->add_debug_message("Updating password");
			$this->update_password($this->new_password);
			unset($this->new_password);
		}

		# deletion of alias
		if (isset($this->alias_to_delete)) {
			$this->add_debug_meessage("Deleting alias ".$this->alias_to_delete);
			$this->delete_alias($this->alias_to_delete);
			unset($this->alias_to_delete);
		}

		return $res;
	}

	function save_web() {

		$obj = parent::save_web();

		if (get_class($obj) == "Exception") {

#			echo "Exception recieved: ".$obj->getMessage()."\nBacktrace:\n".var_export($obj->getTrace(),true);
			throw $obj;

		} else if (is_object($obj)) {

			$this->id = $obj->id;
			$this->email = $obj->email;
			$this->domain_id = $obj->domain_id;
			$this->has_password = isset($obj->has_password) ? $obj->has_password : false;
		
			return true;
		}

		return false;
	}

	function disable() {
		if (empty($this->id)) return false;

		$res = $this->update_password("");

		return !$res;
	}

	function is_active() {

		return isset($this->has_password) && $this->has_password;
	}
	function is_disable() {

		return !$this->is_active();
	}

} # end class imp_email

class imp_email_alias extends imp_db_item {

	function load_db() {

		$sql = "select * from virtual_aliases where id=".$this->id;
		$q = impruw_email_db::query($sql);

		if ($q && $q->num_rows == 1) {
			foreach ($q->fetch_assoc() as $k => $v) {
				$this->$k = $v;
			}
		}
	}

/*	function load_web() {

		$url = impruw_email_accounts::get_url("AccountAlias", $this->id);
		$d = file_get_contents($url);
		$o = unserialize($d);

		if (is_object($o)) {

			$this->source = $o->source;
			$this->destination = $o->destination;
			$this->domain_id = $o->domain_id;
		}
	}*/

	function save_db() {

		$sql = "select * from virtual_aliases "
			."where destination=\"".$this->destination."\" "
				."and source=\"".$this->source."\"";
		$q = impruw_email_db::query($sql);
		if ($q && $q->num_rows==1) {

			$o = $q->fetch_object();
			foreach (array("id","source","destination","domain_id") as $k) {
				$this->$k = $o->$k;
			}
			
		} else {

			$src = isset($this->source) ? $this->source : "";
			$dest= isset($this->destination) ? $this->destination : "";
			$did = 0+$this->domain_id;

			$values = "domain_id=".$did.",source=\"".$src."\",destination=\"".$dest."\"";

			if (isset($this->id) && $this->id > 0) {

				$sql = "update virtual_aliases set ".$values." where id=".$this->id;
				$q = impruw_email_db::query($sql);
			} else {

				$sql = "insert into virtual_aliases set ".$values;
				$q = impruw_email_db::query($sql);
				$this->id = impruw_email_db::$DB->insert_id;
			}
		}

		return !empty($this->id) && $this->id > 0;
	}

	function save_web() {

		$o = parent::save_web();
		if (is_object($o)) {
			foreach (array("id", "destination", "source", "domain_id") as $k) {
				$this->$k = $o->$k;
			}
		}
		return $o;
	}
}

class imp_email_domain extends imp_db_item {

	function load_db() {

		$sql = "select * from virtual_domains where id=".$this->id;
		$q = impruw_email_db::query($sql);

		if ($q && $q->num_rows == 1) {
			foreach ($q->fetch_assoc() as $k => $v) {
				$this->$k = $v;
			}
		}
	}
	function load_web() {

		$domain = impruw_email_accounts::get_domain($this->id);
		if ($domain) {
			$this->name = $domain->name;
		}
	}

	function get_accounts($active_only=false) {

		$accounts = array();

		if (impruw_email_db::is_connected()) {

			$sql = "select id,domain_id,email,length(password)>0 has_password "
				."from virtual_users "
				."where domain_id=".$this->id;

			if ($active_only) {
				$sql .= " and length(password)>0";
			}

			$q = impruw_email_db::query($sql);

			if ($q && $q->num_rows > 0) {
				while ($t = $q->fetch_object("imp_email")) {
					$accounts[] = $t;
				}
			}
		} else {
			$url = impruw_email_accounts::get_url("DomainAccounts",$this->name);
			$d = file_get_contents($url);
			return unserialize($d);
		}
		return $accounts;
	}

	function get_account($email) {

		# chacking if address is of this domain. If not throwing exception.
		if (!preg_match("!@".$this->name."$!", $email)) {
			throw new Exception("E-mail address not of this domain", 6);
		}

		return impruw_email_accounts::get_account($email);
	}

	function get_aliases() {

		$aliases = array();

		if (impruw_email_db::is_connected()) {

			$sql = "select * "
				."from virtual_aliases "
				."where source like \"%@".$this->name."\" or destination like \"%@".$this->name."\"";
			$q = impruw_email_db::query($sql);

			while ($t = $q->fetch_object("imp_email_alias")) {

				$aliases[] = $t;
			}
		} else {

			$url = impruw_email_accounts::get_url("DomainAliases",$this->name);
			$d = file_get_contents($url);
			$aliases = unserialize($d);
		}

		return $aliases;
	}

	function save_db() {

		$name = isset($this->name) ? $this->name : "";

		if (empty($this->id)) {

			$sql = "insert into virtual_domains "
				."set name=\"".$name."\"";
			impruw_email_db::query($sql);

			$this->id = impruw_email_db::$DB->insert_id;

		} else {

			$sql = "update virtual_domains set name=\"".$name."\" "
				."where id=".$this->id;
			impruw_email_db::query($sql);
		}
	}

	function save_web() {

		$obj = parent::save_web();
		if (is_object($obj)) {
			$this->id = $obj->id;
			$this->name = $obj->name;
		}
		return $obj;
	}

} # end class imp_email_domain

# initiate database connection
if (isset($_SERVER["HTTP_HOST"]) && $_SERVER["HTTP_HOST"]=="api.impruw.com") {
	impruw_email_db::init();
}

?>
