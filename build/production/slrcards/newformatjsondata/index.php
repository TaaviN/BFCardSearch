<?php

header('Content-Type: application/json');

class restData {

    public $url_elements;
    public $verb;
    public $parameters;

    public function _construct() {
        
    }

    public function onRequest() {
        $this->verb = $_SERVER['REQUEST_METHOD'];
        $this->parseIncomingParams();
        $this->format = 'json';
        $body = file_get_contents("php://input");
        $body_params = (array) json_decode($body);
        $action_name = strtolower($this->verb) . 'Action';
        $result = $this->$action_name($this->parameters, $body_params);
        return $result;
    }

    public function parseIncomingParams() {
        $parameters = array();
// first of all, pull the GET vars
        if (isset($_SERVER['QUERY_STRING'])) {
            parse_str($_SERVER['QUERY_STRING'], $parameters);
        }
// now how about PUT/POST bodies? These override what we got from GET
        $body = file_get_contents("php://input");
        $content_type = false;
        if (isset($_SERVER['CONTENT_TYPE'])) {
            $content_type = $_SERVER['CONTENT_TYPE'];
        }
        switch ($content_type) {
            case "application/json":
                $body_params = json_decode($body);
                if ($body_params) {
                    foreach ($body_params as $param_name => $param_value) {
                        $parameters[$param_name] = $param_value;
                    }
                }
                $this->format = "json";
                break;
            case "application/x-www-form-urlencoded":
                parse_str($body, $postvars);
                foreach ($postvars as $field => $value) {
                    $parameters[$field] = $value;
                }
                $this->format = "html";
                break;
            default:
                break;
        }
        $this->parameters = $parameters;
    }

    public function optionsAction($parameters, $postput) {
        return json_encode([$parameters, $postput]);
    }

    public function getAction($parameters, $postput) {
        $files = [];
        if ($handle = opendir('ncards')) {
            chmod('ncards', 0777);
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != ".." && $entry != "" && $entry != "index.html") {
                    $string_a = file_get_contents("ncards/" . $entry);
                    $json_a = json_decode($string_a, true);
//                    $json_b = $json_a;
//                    $json_b['Name'] = [];
//
//                    $json_b['Name']['en'] = $json_a['Name'];
//                    $json_b['Name']['de'] = $json_a['Name'];
//                    $json_b['Name']['ru'] = $json_a['Name'];
//
//                    $json_b['Defense'] = [];
//                    $json_b['Defense']['None'] = $json_a['Defense'];
//                    $json_b['Defense']['One'] = $json_a['Defense'];
//                    $json_b['Defense']['Two'] = $json_a['Defense'];
//                    $json_b['Defense']['Three'] = $json_a['Defense'];
//
//                    $json_b['DefenseType'] = [];
//                    $json_b['DefenseType']['None'] = $json_a['DefenseType'];
//                    $json_b['DefenseType']['One'] = $json_a['DefenseType'];
//                    $json_b['DefenseType']['Two'] = $json_a['DefenseType'];
//                    $json_b['DefenseType']['Three'] = $json_a['DefenseType'];
//
//
//
//                    $json_b['Offense'] = [];
//                    $json_b['Offense']['None'] = $json_a['Offense'];
//                    $json_b['Offense']['One'] = $json_a['Offense'];
//                    $json_b['Offense']['Two'] = $json_a['Offense'];
//                    $json_b['Offense']['Three'] = $json_a['Offense'];
//
//                    $json_b['OffenseType'] = [];
//                    $json_b['OffenseType']['None'] = $json_a['OffenseType'];
//                    $json_b['OffenseType']['One'] = $json_a['OffenseType'];
//                    $json_b['OffenseType']['Two'] = $json_a['OffenseType'];
//                    $json_b['OffenseType']['Three'] = $json_a['OffenseType'];
//
//
//
//                    $json_b['UnitCount'] = [];
//                    $json_b['UnitCount']['None'] = $json_a['UnitCount'];
//                    $json_b['UnitCount']['One'] = $json_a['UnitCount'];
//                    $json_b['UnitCount']['Two'] = $json_a['UnitCount'];
//                    $json_b['UnitCount']['Three'] = $json_a['UnitCount'];
//                    $json_b['ChargeCount'] = [];
//                    $json_b['ChargeCount']['None'] = $json_a['ChargeCount'];
//                    $json_b['ChargeCount']['One'] = $json_a['ChargeCount'];
//                    $json_b['ChargeCount']['Two'] = $json_a['ChargeCount'];
//                    $json_b['ChargeCount']['Three'] = $json_a['ChargeCount'];
//
//                    $json_b['Category'] = [];
//                    $json_b['Category']['en'] = $json_a['Category'];
//                    $json_b['Category']['de'] = $json_a['Category'];
//                    $json_b['Category']['ru'] = $json_a['Category'];
//                    $json_b['Abilities'] = [];
//                    $json_b['Abilities']['en']['None'] = $json_a['Abilities'];
//                    $json_b['Abilities']['en']['One'] = $json_a['Abilities'];
//                    $json_b['Abilities']['en']['Two'] = $json_a['Abilities'];
//                    $json_b['Abilities']['en']['Three'] = $json_a['Abilities'];
//
//                    $json_b['Abilities']['de']['None'] = $json_a['Abilities'];
//                    $json_b['Abilities']['de']['One'] = $json_a['Abilities'];
//                    $json_b['Abilities']['de']['Two'] = $json_a['Abilities'];
//                    $json_b['Abilities']['de']['Three'] = $json_a['Abilities'];
//
//                    $json_b['Abilities']['ru']['None'] = $json_a['Abilities'];
//                    $json_b['Abilities']['ru']['One'] = $json_a['Abilities'];
//                    $json_b['Abilities']['ru']['Two'] = $json_a['Abilities'];
//                    $json_b['Abilities']['ru']['Three'] = $json_a['Abilities'];
//
//                    $json_b['Upgrades'] = [];
//
//                    foreach ($json_a['Upgrades'] as $num => $udata) {
//                        $json_a['Upgrades'][$num]['Show'] = [
//                            "Base" => 1,
//                            "One" => 1,
//                            "Two" => 1
//                        ];
//                    }
//
//                    $json_b['Upgrades']['en'] = $json_a['Upgrades'];
//                    $json_b['Upgrades']['de'] = $json_a['Upgrades'];
//                    $json_b['Upgrades']['ru'] = $json_a['Upgrades'];
//
//                    $json_b['Extra'] = [];
//                    $json_b['Extra']['en'] = $json_a['Extra'];
//                    $json_b['Extra']['de'] = $json_a['Extra'];
//                    $json_b['Extra']['ru'] = $json_a['Extra'];
//
//                    $newfile = "ncards/" . $entry;
//                    if (file_exists($newfile)) {
//                        $fh = fopen($newfile, 'w');
//                        fwrite($fh, json_encode($json_b));
//                    } else {
//
//                        $fh = fopen($newfile, 'w');
//                        fwrite($fh, json_encode($json_b));
//                    }
//                    fclose($fh);
//                    chmod($newfile, 0777);
                    $files[] = $json_a;
                }
            }
            closedir($handle);
        }
        return json_encode(['data' => $files, 'success' => 'true', 'message' => 'Data found']);
    }

    public function postAction($parameters, $postput) {
        
        $cardId = $parameters['cardId'];
        $newfile = 'ncards/' . $cardId . '.json';

        unset($parameters['ImageCollection']);
        unset($parameters['ObjectID']);
        unset($parameters['SortNameen']);
        unset($parameters['SortNamede']);
        unset($parameters['SortNameru']);
        unset($parameters['SortCategoryen']);
        unset($parameters['SortCategoryde']);
        unset($parameters['SortCategoryru']);
        unset($parameters['SortDefense0']);
        unset($parameters['SortDefense1']);
        unset($parameters['SortDefense2']);
        unset($parameters['SortDefense3']);
        unset($parameters['SortOffense0']);
        unset($parameters['SortOffense1']);
        unset($parameters['SortOffense2']);
        unset($parameters['SortOffense3']);
        
        if (file_exists($newfile)) {
            $fh = fopen($newfile, 'w');
            fwrite($fh, json_encode($parameters));
        } else {

            $fh = fopen($newfile, 'w');
            fwrite($fh, json_encode($parameters));
        }
        fclose($fh);
        chmod($newfile, 0777); 
        $files = [];
        if ($handle = opendir('ncards')) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != ".." && $entry != "" && $entry != "index.html") {
                    $string_a = file_get_contents("ncards/" . $entry);
                    $json_a = json_decode($string_a, true);
                    $files[] = $json_a;
                }
            }
            closedir($handle);
        }

        $oldfile = '../data.json';
        if (file_exists($oldfile)) {
            $fh = fopen($oldfile, 'w');
            fwrite($fh, json_encode(["data" => $files, "success" => true]));
        } else {
            $fh = fopen($oldfile, 'w');
            fwrite($fh, json_encode(["data" => $files, "success" => true]));
        }
        fclose($fh);
        chmod($oldfile, 0777);

        return json_encode(['data' => $parameters, 'success' => 'true', 'message' => 'Data found']);
        
//        return json_encode(['data' => $parameters, 'success' => 'true', 'message' => 'Not allowed']);
    }

    public function deleteAction($parameters, $postput) {
        return json_encode(['data' => $postput, 'success' => 'true', 'message' => 'Data found']);
    }

    public function putAction($parameters, $postput) {
        $cardId = $postput['cardId'];
        $newfile = 'ncards/' . $cardId . '.json';

        if (file_exists($newfile)) {
            $fh = fopen($newfile, 'w');
            fwrite($fh, json_encode($postput));
        } else {

            $fh = fopen($newfile, 'w');
            fwrite($fh, json_encode($postput));
        }
        fclose($fh);
        chmod($newfile, 0777);

        $files = [];
        if ($handle = opendir('ncards')) {
            while (false !== ($entry = readdir($handle))) {
                if ($entry != "." && $entry != ".." && $entry != "" && $entry != "index.html") {
                    $string_a = file_get_contents("cards/" . $entry);
                    $json_a = json_decode($string_a, true);
                    $files[] = $json_a;
                }
            }
            closedir($handle);
        }

        $oldfile = '../data.json';
        if (file_exists($oldfile)) {
            $fh = fopen($oldfile, 'w');
            fwrite($fh, json_encode(["data" => $files, "success" => true]));
        } else {
            $fh = fopen($oldfile, 'w');
            fwrite($fh, json_encode(["data" => $files, "success" => true]));
        }
        fclose($fh);
        chmod($oldfile, 0777);

        return json_encode(['data' => $postput, 'success' => 'true', 'message' => 'Data found']);
    }

}

$rest = new restData();

echo $rest->onRequest();
