<?php


if(isset($_GET['city'])){
    $city = $_GET["city"];
}

    $ch = curl_init();
    $apiKey = "79ec1d39c13b4d4c80085442250711";
  curl_setopt($ch, CURLOPT_URL,"http://api.weatherapi.com/v1/current.json?key=".$apiKey."&q=".urlencode($city));

curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);

$response = curl_exec($ch);
$error = curl_errno($ch);

curl_close($ch);

if($error){
    http_response_code(502);
   echo  json_encode(["status"=>"error", "message" => "cURL Error". $error]);
    exit;
}

$data = json_decode($response,true);
//Error Handling
if(!$data){
     http_response_code(502);
    echo  json_encode(["status"=>"error", "message" => "Invalid JSON From Weather API"]);
    exit;
}

if (isset($data["error"])) {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => $data["error"]["message"]]);
    exit;
}

//Error Handling
$dataToRender = [
    "status" => "success",
    "name" =>  $data["location"]["name"],
    "region"=> $data["location"]["region"],
    "temprature" => $data["current"]["temp_c"],
    "icon" => $data["current"]["condition"]["icon"],
    "sky" => $data["current"]["condition"]["text"]
];
http_response_code(200);
echo json_encode($dataToRender);
exit;




   
?>