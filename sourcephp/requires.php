<?php 

	/** Para abrir configuración y BD
	 *  
	 */
	require_once('config/database.php');
	require_once('core/Connection.php');
	
	/** Para abrir todos lo modelos que se requerirán
	 *  
	 */
	
	$mod = "./sourcephp/models/";
	if (is_dir($mod))
	{
		if (($modelsdir = opendir($mod)) !== false)
		{
			while ($modelfile = readdir($modelsdir))
			{			
				if($modelfile != ".")
				{				
					if($modelfile != "..")
					{
						//echo $modelfile;						
						$strurl = "./sourcephp/models/".$modelfile;	
						require_once($strurl);
					}
				}
			}
		}
		closedir($modelsdir);
	}
	
	require_once('core/BaseController.php');

	/** Para abrir todos lo controladores que se requerirán
	 *  
	 */

	$cont = "./sourcephp/controllers/";
	if (is_dir($cont))
	{
		if (($controllersdir = opendir($cont)) !== false)
		{
			while ($controllerfile = readdir($controllersdir))
			{
				if($controllerfile != ".")
				{
					if($controllerfile != "..")
					{
						//echo $controllerfile;
						$strurl2 = "./sourcephp/controllers/".$controllerfile;
						require_once($strurl2);
					}
				}				
			}
		}
		closedir($controllersdir);
	}

?>