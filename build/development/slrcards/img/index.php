<?php

session_start();
header("Cache-Control: private, max-age=10800, pre-check=10800");
header("Pragma: private");
header("Expires: " . date(DATE_RFC822, strtotime(" 2 day")));


$request = $_SERVER['QUERY_STRING'];
list($dir, $ObjectId, $type, $quality, $w, $h) = explode('|', $request);

$image = $dir . '/' . $ObjectId . '.' . $type;

//if (isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) &&
//        (strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == filemtime($image))) {
//    // send the last mod time of the file back
//    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', filemtime($image)) . ' GMT', true, 304);
//    exit;
//}

$size = GetImageSize($image);
$mime = $size['mime'];

$width = $size[0];
$height = $size[1];
$width2 = $size[0];
$height2 = $size[1];

$maxWidth = ($w > $width) ? $width : (($w > 0) ? (int) $w : 0);
$maxHeight = ($h > $height) ? $height : (($h > 0) ? (int) $h : 0);

header("Content-type: $mime");

$offsetX = 0;
$offsetY = 0;
/*
  if (isset($_GET['cropratio'])) {
  $cropRatio = explode(':', (string) $_GET['cropratio']);
  if (count($cropRatio) == 2) {
  $ratioComputed = $width / $height;
  $cropRatioComputed = (float) $cropRatio[0] / (float) $cropRatio[1];

  if ($ratioComputed < $cropRatioComputed) { // Image is too tall so we will crop the top and bottom
  $origHeight = $height;
  $height = $width / $cropRatioComputed;
  $offsetY = ($origHeight - $height) / 2;
  } else if ($ratioComputed > $cropRatioComputed) { // Image is too wide so we will crop off the left and right sides
  $origWidth = $width;
  $width = $height * $cropRatioComputed;
  $offsetX = ($origWidth - $width) / 2;
  }
  }
  }
 */

$xRatio = $maxWidth / $width;
$yRatio = $maxHeight / $height;

if ($xRatio * $height < $maxHeight) {
    $tnHeight = ceil($xRatio * $height);
    $tnWidth = $maxWidth;
} else {
    $tnWidth = ceil($yRatio * $width);
    $tnHeight = $maxHeight;
}

$dst = imagecreatetruecolor($tnWidth, $tnHeight);

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

if (in_array($size['mime'], array('image/gif', 'image/png'))) {
    if (!$color) {
        imagealphablending($dst, false);
        imagesavealpha($dst, true);
    } else {
        if ($color[0] == '#')
            $color = substr($color, 1);
        $background = FALSE;
        if (strlen($color) == 6)
            $background = imagecolorallocate($dst, hexdec($color[0] . $color[1]), hexdec($color[2] . $color[3]), hexdec($color[4] . $color[5]));
        else if (strlen($color) == 3)
            $background = imagecolorallocate($dst, hexdec($color[0] . $color[0]), hexdec($color[1] . $color[1]), hexdec($color[2] . $color[2]));
        if ($background)
            imagefill($dst, 0, 0, $background);
    }
}

ImageCopyResampled($dst, $src, 0, 0, $offsetX, $offsetY, $tnWidth, $tnHeight, $width, $height);
$outputFunction($dst);
imagedestroy($dst);
imagedestroy($src);

