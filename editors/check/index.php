<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$code = @$_REQUEST['code'];
$json = @$_REQUEST['json'];

if ($json == 1 && $code != '') {
    $newfile = 'editorjson/' . $code . 'EJ.json';

    if (file_exists($newfile)) {

        $string = file_get_contents($newfile);
        $json_to_look = json_decode($string, true);


        header("Content-type:application/json");
        print_r(json_encode($json_to_look));
    } else {
        header("Content-type:application/json");
        print_r(json_encode(['success' => 'false', 'message' => 'Not allowed']));
    }
} else {
    header("Content-type:application/json");
    print_r(json_encode(['success' => 'false', 'message' => 'Not allowed']));
}