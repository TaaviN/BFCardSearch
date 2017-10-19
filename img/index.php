<?php

error_reporting(0);
ob_start();

$request = $_SERVER['QUERY_STRING'];
list($dir, $ObjectId, $type, $quality, $w, $h) = explode('|', $request);

$image = $dir . '/' . $ObjectId . '.' . $type;

$size = GetImageSize($image);
$mime = $size['mime'];

$width = $size[0];
$height = $size[1];
$width2 = $size[0];
$height2 = $size[1];

$maxWidth = ($w > $width) ? $width : (($w > 0) ? (int) $w : 0);
$maxHeight = ($h > $height) ? $height : (($h > 0) ? (int) $h : 0);



$offsetX = 0;
$offsetY = 0;

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

$PageContent = ob_get_contents();

ob_end_clean();
// Generate unique Hash-ID by using MD5
$HashID = md5($image . $request);
// Specify the time when the page has
// been changed. For example this date
// can come from the database or any
// file. Here we define a fixed date value:
$LastChangeTime = 1144055759;
// Define the proxy or cache expire time 
$ExpireTime = 3600000; // seconds (= one hour)
// Get request headers:
$headers = apache_request_headers();

header("Content-type: $mime");

// Content language
header('Content-language: en');
// Set cache/proxy informations:
header('Cache-Control: max-age=' . $ExpireTime); // must-revalidate
header('Expires: ' . gmdate('D, d M Y H:i:s', time() + $ExpireTime) . ' GMT');
header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $LastChangeTime) . ' GMT');
header('ETag: ' . $HashID);
$PageWasUpdated = !(isset($headers['If-Modified-Since']) and
        strtotime($headers['If-Modified-Since']) == $LastChangeTime);

$DoIDsMatch = (isset($headers['If-None-Match']) and
        ereg($HashID, $headers['If-None-Match']));

// Does one of the two ways apply?
if (!$PageWasUpdated or $DoIDsMatch) {

    // Okay, the browser already has the
    // latest version of our page in his
    // cache. So just tell him that
    // the page was not modified and DON'T
    // send the content -> this saves bandwith and
    // speeds up the loading for the visitor

    header('HTTP/1.1 304 Not Modified');

    // That's all, now close the connection:
    header('Connection: close');

    // The magical part: 
    // No content here ;-) 
    // Just the headers
} else {

    // Okay, the browser does not have the
    // latest version or does not have any
    // version cached. So we have to send him
    // the full page.

    header('HTTP/1.1 200 OK');

    // Tell the browser which size the content
    header('Content-Length: ' . strlen($PageContent));

    // Send the full content
    print $PageContent;
}