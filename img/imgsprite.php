<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

$files = [];
if ($handle = opendir('../jsondata/cards')) {
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && $entry != "" && $entry != "index.html") {
            $string_a = file_get_contents("../jsondata/cards/" . $entry);
            $json_a = json_decode($string_a, true);
            $files[] = $json_a;
        }
    }
    closedir($handle);
}



$w = 120;

$h = 168;

$imagepositions = [];

if (count($files) > 0) {

    $images = [];
    $e1 = 0;
    $e2 = 0;
    foreach ($files as $i => $data) {

        $string_a = file_get_contents("../jsondata/cards/" . $data['cardId'] . ".json");
        $cardData = json_decode($string_a, true);

        if ($cardData['Image']['ObjectID'] != '') {

            $images[$i]['file'] = '../img/units/' . $cardData['Image']['ObjectID'] . '.png';
        } else {

            $images[$i]['file'] = '../img/units/0.png';
        }
        $images[$i]['xy'] = ['w' => $w * $e1, 'h' => $h * $e2];

        if ($e1 == 24) {
            $e1 = 0;
            $e2++;
        } else {
            $e1++;
        }
    }
//echo '<pre>';
//print_r($images);
//    exit;
    $number_of_images = count($images);


    $maxheight = ($number_of_images / 25);

    $output_image = imagecreatetruecolor(($w * 25), ($h * round($maxheight)));
    imagealphablending($output_image, false);
    $transparency = imagecolorallocatealpha($output_image, 0, 0, 0, 127);
    imagefill($output_image, 0, 0, $transparency);
    imagesavealpha($output_image, true);
    imagealphablending($output_image, true);
    $image_objects = array();
    $quality = 90;

    for ($i = 0; $i < $number_of_images; $i++) {
        $image = $images[$i]['file'];
        $size = GetImageSize($image);
        $mime = $size['mime'];
        switch ($size['mime']) {
            case 'image/gif':
                $creationFunction = 'ImageCreateFromGif';
                $outputFunction = 'ImagePng';
                $mime = 'image/png';
                $quality = round(10 - ($quality / 10));
                break;
            case 'image/x-png':
            case 'image/png':
                $creationFunction = 'ImageCreateFromPng';
                $outputFunction = 'ImagePng';
                $quality = round(10 - ($quality / 10));
                break;
            default:
                $creationFunction = 'ImageCreateFromJpeg';
                $outputFunction = 'ImageJpeg';
                break;
        }

        $src = $creationFunction($image);
        $srcl = imagescale($src, $w, $h);

        $image_objects[$i]['src'] = $srcl;
    }


    for ($i = 0; $i < $number_of_images; $i++) {

        if (isset($image_objects[$i])) {

            imagecopymerge($output_image, $image_objects[$i]['src'], $images[$i]['xy']['w'], $images[$i]['xy']['h'], 0, 0, $w, $h, 100);
        }
    }




    header("Content-type: image/png");

    ImagePng($output_image);

    imagedestroy($output_image);
}
                
                