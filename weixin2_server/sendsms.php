<?php
    $host = "http://yzxtz.market.alicloudapi.com";
    $path = "/yzx/notifySms";
    $method = "POST";
    $appcode = "8ae5612c0e7f4d2ba70ae79e1490bf88";
    $headers = array();
    array_push($headers, "Authorization:APPCODE " . $appcode);
    $querys = "phone=17602632704&templateId=TP19082016&variable=code%3A123123";
    $bodys = "";
    $url = $host . $path . "?" . $querys;
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($curl, CURLOPT_FAILONERROR, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HEADER, true);
    if (1 == strpos("$".$host, "https://"))
    {
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
    }
    var_dump(curl_exec($curl));
?>