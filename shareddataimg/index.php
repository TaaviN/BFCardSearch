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
        $imagesdata = [];

        foreach ($json_to_look as $i => $data) {

            $string_a = file_get_contents("../newformatjsondata/cards/" . $data['cardId'] . ".json");
            $cardData = json_decode($string_a, true);

            if ($cardData['Image']['ObjectID'] != '') {

                $images[] = '../img/units/' . $cardData['Image']['ObjectID'] . '.png';
                $imagesdata[] = $cardData;
            } else {
                $images[] = '../img/units/0.png';
                $imagesdata[] = $cardData;
            }
        }

        $number_of_images = count($images);
        $priority = "columns";

        $w = 182;
        $h = 254;

        $imagepositions = [
            ['w' => 0, 'h' => 0]
        ];

        $maxheight = ($number_of_images / 5);

        $output_image = imagecreatetruecolor(($w * 4), ($h * 5));
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
        $white = imagecolorallocate($output_image, 255, 255, 255);
        $start = 12;
        for ($i = 0; $i < $number_of_images; $i++) {

            if (isset($image_objects[$i])) {
                $wh = $imagepositions[$i];

                switch ($imagesdata[$i]['Rarity']) {
                    case 0:
                        $RarityText = ('Common');
                        break;
                    case 1:
                        $RarityText = ('UnCommon');
                        break;
                    case 2:
                        $RarityText = ('Rare');
                        break;
                    case 3:
                        $RarityText = ('Ultra rare');
                        break;
                }
                switch ($imagesdata[$i]['Affinity']) {
                    case -1:
                        $AffinityText = ('None');
                        break;
                    case 0:
                        $AffinityText = ('Frost');
                        break;
                    case 1:
                        $AffinityText = ('Fire');
                        break;
                    case 2:
                        $AffinityText = ('Nature');
                        break;
                    case 3:
                        $AffinityText = ('Shadow');
                        break;
                }
                switch ($imagesdata[$i]['Type']) {
                    case 0:
                        $TypeText = ('Spell');
                        break;
                    case 2:
                        $TypeText = ('Creature');
                        break;
                    case 3:
                        $TypeText = ('Building');
                        break;
                }

                imagecopymerge($output_image, $image_objects[$i], $wh['w'], $wh['h'], 0, 0, $w, $h, 100);

                imagestring($output_image, 9, ($w + 10), $start, $imagesdata[$i]['Name']['en'], $white);
                imagestring($output_image, 5, ($w + 10), ($start + 16), 'Category' , $white);
                imagestring($output_image, 5, (($w*2) + 10), ($start + 16), $imagesdata[$i]['Category']['en'], $white);
                imagestring($output_image, 5, ($w + 10), ($start + 32), 'Cost' , $white);
                imagestring($output_image, 5, (($w*2) + 10), ($start + 32), $imagesdata[$i]['Cost'], $white);
                imagestring($output_image, 5, ($w + 10), ($start + 48),  'Affinity', $white);
                imagestring($output_image, 5, (($w*2) + 10), ($start + 48), $AffinityText, $white);
                
                imagestring($output_image, 5, ($w + 10), ($start + (16 * 4)), $RarityText, $white);
                imagestring($output_image, 5, ($w + 10), ($start + (16 * 5)), $TypeText, $white);

                imagestring($output_image, 5, ($w + 10), ($start + (16 * 6)),  'Offense' , $white);
                imagestring($output_image, 5, (($w*2) + 10), ($start + (16 * 6)), $imagesdata[$i]['Offense']['None'], $white);

                imagestring($output_image, 5, ($w + 10), ($start + (16 * 7)),  'Defense' , $white);
                imagestring($output_image, 5, (($w*2) + 10), ($start + (16 * 7)), $imagesdata[$i]['Defense']['None'], $white);


                $startheigth = $h + 16;

                imagestring($output_image, 5, 10, ($startheigth), 'Abilities', $white);
                
                $startheigth += 16;
                $Abilities = $imagesdata[$i]['Abilities']['en']['None'] ;
                if (count($Abilities) > 0) {


                    for ($ia = 0; $ia < count($Abilities); $ia++) {

                        $Ability = $Abilities[$ia];
                    
                        $startheigth += 16;
                        imagestring($output_image, 5, 10, ($startheigth), trim($Ability['Name']), $white);
                        $startheigth += 16;

                        $lines = explode('|', wordwrap($Ability['Description'], 60, '|'));
                        foreach ($lines as $line) {
                             $startheigth += 16;
                            imagestring($output_image, 5, 10, ($startheigth), $line, $white);

                            $startheigth += 16;
                        }
                        $startheigth += 16;
                    
                    }
                }
                    
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
                