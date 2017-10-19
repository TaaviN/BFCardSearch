<?php


$files = [];
if ($handle = opendir('newformatjsondata/ncards')) {
    chmod('newformatjsondata/ncards', 0777);
    while (false !== ($entry = readdir($handle))) {
        if ($entry != "." && $entry != ".." && $entry != "" && $entry != "index.html") {
            $string_a = file_get_contents("newformatjsondata/ncards/" . $entry);
            $json_a = json_decode($string_a, true);



            $files[] = '<url> 
    <loc>http://www.bafocards.eu/#card:en:' . $json_a['cardId'] . '</loc> 
    <image:image>
       <image:loc>http://www.bafocards.eu/img/?units|' . $json_a['Image']['ObjectID'] . '|png|90|200|350</image:loc>
       <image:caption>' . $json_a['Name']['en'] . '</image:caption>
    </image:image>
     
  </url>';
//            $files[] = '<url> 
//    <loc>http://www.bafocards.eu/#card:de:' . $json_a['cardId'] . '</loc> 
//    <image:image>
//       <image:loc>http://www.bafocards.eu/img/?units|' . $json_a['Image']['ObjectID'] . '|png|90|200|350</image:loc>
//       <image:caption>' . $json_a['Name']['de'] . '</image:caption>
//    </image:image>
//     
//  </url>';
//            $files[] = '<url> 
//    <loc>http://www.bafocards.eu/#card:ru:' . $json_a['cardId'] . '</loc> 
//    <image:image>
//       <image:loc>http://www.bafocards.eu/img/?units|' . $json_a['Image']['ObjectID'] . '|png|90|200|350</image:loc>
//       <image:caption>' . $json_a['Name']['ru'] . '</image:caption>
//    </image:image>
//  </url>';
        }
    }
    closedir($handle);
}
$newfile = 'sitemap.xml';
$string = '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url> 
    <loc>http://www.bafocards.eu/</loc> 
    <image:image>
       <image:loc>http://www.bafocards.eu/img/logo.png</image:loc>
       <image:caption>Fast battleforge card search and sharing</image:caption>
    </image:image>
     
  </url>
  ' . implode("", $files) . '
</urlset>';

if (file_exists($newfile)) {
    $fh = fopen($newfile, 'w');
    fwrite($fh, $string);
} else {

    $fh = fopen($newfile, 'w');
    fwrite($fh, $string);
}
fclose($fh);
chmod($newfile, 0777);

echo$string;
