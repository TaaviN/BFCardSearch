<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$code = @$_REQUEST['code'];
$json = @$_REQUEST['json'];

if ($json == 1 && $code != '') {
    $newfile = '../shareme/sharedjson/' . $code . '.json';

    if (file_exists($newfile)) {

        $string = file_get_contents($newfile);
        $json_to_look = json_decode($string, true);

        if (count($json_to_look) > 0) {

            $responce = [];

            foreach ($json_to_look as $i => $data) {

                $string_a = file_get_contents("../newformatjsondata/ncards/" . $data['cardId'] . ".json");
                $cardData = json_decode($string_a, true);

                $responce[] = $cardData;
            }
        }
        header("Content-type:application/json");
        print_r(json_encode(['data' => $responce, 'success' => 'true', 'message' => 'Data found']));
    } else {
        header("Content-type:application/json");
        print_r(json_encode(['success' => 'false', 'message' => 'Shared cards data not found']));
    }
} else {
    $request = @$_POST['cards'];
    $json_a = json_decode($request, true);
    $cards = [];
    foreach ($json_a as $i => $cardId) {
        $cards[$i]['cardId'] = $cardId;
    }

    $imp = implode('|', $json_a);

    $impmd5 = md5($imp);
    $newfile = 'sharedjson/' . $impmd5 . '.json';
    if (file_exists($newfile)) {
        $fh = fopen($newfile, 'w');
        fwrite($fh, json_encode($cards));
    } else {

        $fh = fopen($newfile, 'w');
        fwrite($fh, json_encode($cards));
    }
    fclose($fh);
    chmod($newfile, 0777);
    header("Content-type:application/json");
    print_r(json_encode(['code' => $impmd5]));
}