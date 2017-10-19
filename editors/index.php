<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$code = @$_REQUEST['code'];
$name = @$_REQUEST['name'];
$cardname = @$_REQUEST['cardname'];
$cardId = @$_REQUEST['cardId'];
$json = @$_REQUEST['json'];
 
if ($json == 1 && $code != '' && $name != '' && $cardId > 0) {
    $newfile = 'work/' . $code . 'EW.json';

    if (file_exists($newfile)) {
        
        $string = file_get_contents($newfile);
        $json_to_look = json_decode($string, true);
        
        $json_to_look[]=['name'=>$name,'cardname'=>$cardname,'cardId'=>$cardId,'date'=>date('d.m.Y H:i:s')];
        
        $fh = fopen($newfile, 'w');
        
        fwrite($fh, json_encode($json_to_look));
    } else {
       
        $fh = fopen($newfile, 'w');
        fwrite($fh, json_encode([0=>['name'=>$name,'cardname'=>$cardname,'cardId'=>$cardId,'date'=>date('d.m.Y H:i:s')]]));
    }
    fclose($fh);
    chmod($newfile, 0777);
    header("Content-type:application/json");
    print_r(json_encode([]));
    
} else {
    header("Content-type:application/json");
    print_r(json_encode(['success' => 'false', 'message' => 'Not allowed']));
}