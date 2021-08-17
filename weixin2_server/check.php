<?php
    // 接收一个6位验证码
    $yzm = $_GET['yzm'];
    // 接收一个md5值
    $md5 = $_GET['md5'];

    // 算出标准md5值
    $bz_md5 = md5(md5($yzm));

    // 判断接收的md5值和标准的md5值是否相同
    if($bz_md5 == $md5){
        // 显示1
        echo 1;
    } else {
        // 显示-1
        echo -1;
    }
?>