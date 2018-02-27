<?php 

    /** Para abrir configuración y BD
     *  
     */
    require_once('./sourcephp/config/database.php');
    require_once('./sourcephp/core/Connection.php');

    require_once('./sourcephp/core/BaseModel.php');
    
    /** Para abrir todos lo modelos que se requerirán
     *  
     */

    /*
    $directory = opendir("models");
    while ($file = readdir($directory))
    {
        if(!is_dir($file))
        {
            require_once('models/'.$file);
        }
    }
    
    require_once('./sourcephp/core/baseController.php');

    /** Para abrir todos lo controladores que se requerirán
     *  
     */
    /*
    $directory = opendir("controllers");
    while(!$file = readdir($directory))
    {
        if(!is_dir($file))
        {
            require_once('controllers/'.$file);
        }
    }
    */

?>