<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$request = $_SERVER['QUERY_STRING'];
$newfile = '../shareme/sharedjson/' . $request . '.json';

if (file_exists($newfile)) {

    $string = file_get_contents($newfile);

    $json_to_look = json_decode($string, true);

    if (count($json_to_look) > 0) {

        $images = [];

        foreach ($json_to_look as $i => $data) {

            $string_a = file_get_contents("../newformatjsondata/ncards/" . $data['cardId'] . ".json");
            $cardData = json_decode($string_a, true);

            if ($cardData['Image']['ObjectID'] != '') {

                $images[] = '../img/units/' . $cardData['Image']['ObjectID'] . '.png';
            } else {
                $images[] = '../img/units/0.png';
            }
        }

        $number_of_images = count($images);
        $priority = "columns";

        $w = 150;
        $h = 210;
        if ($number_of_images == 1) {
            $w = 200;
            $h = 280;
        } elseif ($number_of_images == 2) {
            $w = 200;
            $h = 280;
        } elseif ($number_of_images == 3) {
            $w = 200;
            $h = 280;
        }

        $imagepositions = [
            ['w' => 0, 'h' => 0],
            ['w' => $w, 'h' => 0],
            ['w' => ($w * 2), 'h' => 0],
            ['w' => ($w * 3), 'h' => 0],
            ['w' => ($w * 4), 'h' => 0],
            ['w' => 0, 'h' => $h],
            ['w' => $w, 'h' => $h],
            ['w' => ($w * 2), 'h' => $h],
            ['w' => ($w * 3), 'h' => $h],
            ['w' => ($w * 4), 'h' => $h],
            ['w' => 0, 'h' => ($h * 2)],
            ['w' => $w, 'h' => ($h * 2)],
            ['w' => ($w * 2), 'h' => ($h * 2)],
            ['w' => ($w * 3), 'h' => ($h * 2)],
            ['w' => ($w * 4), 'h' => ($h * 2)],
            ['w' => 0, 'h' => ($h * 3)],
            ['w' => $w, 'h' => ($h * 3)],
            ['w' => ($w * 2), 'h' => ($h * 3)],
            ['w' => ($w * 3), 'h' => ($h * 3)],
            ['w' => ($w * 4), 'h' => ($h * 3)]
        ];

        $maxheight = ($number_of_images / 5);

        if ($number_of_images == 1) {
            $output_image = imagecreatetruecolor($w, $h);
        } elseif ($number_of_images == 2) {
            $output_image = imagecreatetruecolor(($w * 2), $h);
        } elseif ($number_of_images == 3) {
            $output_image = imagecreatetruecolor(($w * 3), $h);
        } else {
            $output_image = imagecreatetruecolor(($w * 5), ($h * round($maxheight)));
        }


        imagealphablending($output_image, false);
        $transparency = imagecolorallocatealpha($output_image, 0, 0, 0, 127);
        imagefill($output_image, 0, 0, $transparency);
        imagesavealpha($output_image, true);
        imagealphablending($output_image, true);
        $image_objects = array();
        $quality = 90;

        for ($i = 0; $i < $number_of_images; $i++) {
            $image = $images[$i];
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

            $image_objects[$i] = $srcl;
        }


        for ($i = 0; $i < $number_of_images; $i++) {

            if (isset($image_objects[$i])) {
                $wh = $imagepositions[$i];
                imagecopymerge($output_image, $image_objects[$i], $wh['w'], $wh['h'], 0, 0, $w, $h, 100);
            }
        }




        header("Content-type: image/png");

        ImagePng($output_image);

        imagedestroy($output_image);
    } else {
        header("Content-type:application/json");
        print_r(json_encode(['success' => 'false', 'message' => 'Shared cards data not found']));
    }
} else {
    header("Content-type:application/json");
    print_r(json_encode(['success' => 'false', 'message' => 'Shared cards data not found']));
}
                