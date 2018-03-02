<?php
	/**
	 * Este controllador contiene todos los métodos que se necesiten realizar
	 * cuando el usuario ineractue con el sistema
	 */
	class UsersController extends BaseController
	{
	    /**
	     * summary
	     */
	   
	    /**
	     * Iniciar sesión
	     * @param null
	     * @return array(bandera de éxito, mensaje (solo si se requiere))
	     */
	    public function Login()
	    {
	    	//Recibir datos de ajax y verificar si existe ese usuario
	    	if (isset($_POST["userreg"]) && isset($_POST["password"]))
	    	{
	    		$userreg = mysqli_real_escape_string($this->con, $POST["username"]);
	    		$password = mysqli_real_escape_string($this->con, $POST["password"]);
	    		$user_res = $this->con->query("select Registro_U from usuario where Registro_U = '$userreg' and Contrasena = '$password'");
	    		$query = mysqli_num_rows($user_res);
	    		echo $userreg;

	    		if($query != 1)
	    		{
	    			echo json_encode(array ('error' => true, 'message' => 'El nombre de usuario o contraseña son incorrectos.'));
	    		}
	    		else if ($query == 1)
	    		{
	    			$_SESSION["userreg"] = $userreg;
	    			echo json_encode(array('error' => false));
	    		}
	    	}
	    }

	    public function Logout()
	    {
	    	session_destroy();
	    	header('Location: index.php');
	    }
	}
?>