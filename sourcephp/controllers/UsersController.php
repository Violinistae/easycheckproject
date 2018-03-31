<?php
	/**
	 * Este controllador contiene todos los métodos que se necesiten realizar
	 * cuando el usuario ineractue con el sistema
	 */
	session_start();
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
	    		$userreg = $_POST["userreg"];
				$password = $_POST["password"];
				$user_res = $this->pdo->prepare("SELECT Registro_U from usuario where Registro_U = ? and Password = ?");
				$user_res->execute([$userreg, $password]);
				
	    		$query = $user_res->rowCount();	    
	    		if($query != 1)
	    		{
	    			echo json_encode(array ('error' => true, 'message' => 'El nombre de usuario o password son incorrectos.'));
	    		}
	    		else if ($query == 1)
	    		{

	    			$_SESSION["userreg"] = $userreg;
	    			echo json_encode(array('error' => false, 'user' => $_SESSION['userreg']));
	    		}
	    	}
	    }

	    public function Logout()
	    {
	    	session_destroy();
	    	header('Location: index.php');
	    }

	    /**
	     * Verificar que tipo de usuario esta iniciando sesión en el sistema
	     * @param null
	     * @return array(bandera de éxito, mensaje de error si es necesaio o tipo de usuario que hace login)
	     */
	    public function verifyUser()
	    {   
	    	if(isset($_SESSION["userreg"]))
	    	{	    			    	
	    		$aux = $_SESSION["userreg"];
	    		//$query = "SELECT 'tiposusuarios.Tipo_Usuario' FROM tiposusuarios JOIN usuario ON 'tiposusuarios.Id_TipoUsuario' = 'usuario.Tipo_Usuario' where 'usuario.Registro_U' = '$aux'";
	    		$query = "SELECT Tipo_Usuario from usuario where Registro_U = ".$aux;

	    		$user_type = $this->con->query($query);
	    		$queryrows = mysqli_num_rows($user_type);
	    		if($queryrows != 1)
	    			echo json_encode(array('error' => true, 'message' => 'No se pudo encontrar una respuesta a su petición, favor de crear una cuenta de algún tipo válido para el sistema'));
	    		else if($queryrows == 1)
	    		{
	    			$resultado = $user_type->fetch_array();
		    		$_SESSION["usertype"] = $user_type;
		    		echo json_encode(array('error' => false, 'type' => $resultado[0]));
		    	}
	    	}
	    	else
	    		echo json_encode(array('error' => true, 'message' => 'No se pudo encontrar alguna sesión abierta, favor de iniciar sesión de nuevo'));
	    }

	    /**
	     * Realizar las inserciones necesarias en la BD en las tablas de usuario y academia para registrar una cuenta de determinado tipo
	     * 
	     * @param null
	     * @return
	     */
	    public function registerUser()
	    {	    		    	
			if(isset($_POST["tuser"]))
			{		

				$userreg = mysqli_real_escape_string($this->con, $_POST["userreg"]);
				$verfusuarios = $this->con->query("SELECT Registro_U from usuario where Registro_U = '$userreg'");
				$numveru = mysqli_num_rows($verfusuarios);

				if($numveru > 0)	//Ya hay un usuario con ese registro
				{
					echo json_encode(array('error' => false, 'message' => "Ya existe un usuario en el sistema con ese registro."));
				}
				else if ($numveru == 0)	//No hay usuario con ese registro
				{

					$typeuser = mysqli_real_escape_string($this->con, $_POST["tuser"]);
					$email = mysqli_real_escape_string($this->con, $_POST["email"]);
					$password = mysqli_real_escape_string($this->con, $_POST["password"]);
					$nombres = mysqli_real_escape_string($this->con, $_POST["nombres"]);
					$apellidos = mysqli_real_escape_string($this->con, $_POST["apellidos"]);

					if($typeuser == 1)	//Coordinador de Academia
			    	{
			    		$academia = mysqli_real_escape_string($this->con, $_POST["academia"]);
			    		$claveaccess = mysqli_real_escape_string($this->con, $_POST["claveaccess"]);
			    		$ciclo = mysqli_real_escape_string($this->con, $_POST["ciclomeses"])." ".mysqli_real_escape_string($this->con, $_POST["cicloy"]);

						echo json_encode(array('error' => false, 'message' => "Registro completado satisfactoriamente."));
			    	}
			    	else if($typeuser == 2)	//Profesor
			    	{
						$escolaridad = mysqli_real_escape_string($this->con, $_POST["escolaridad"]);

						echo json_encode(array('error' => false, 'message' => "Registro completado satisfactoriamente."));
			    	}
			    	else if ($typeuser == 3)	//Alumno
			    	{
			    		$this->con->query(
			    			"INSERT into usuario (
									Registro_U, 
									Nombres, 
									Apellidos, 
									Email, 
									Password, 
									Tipo_Usuario
			    				) values (
			    					'$userreg', 
			    					'$nombres', 
			    					'$apellidos', 
			    					'$email', 
			    					'$password',
			    					'$typeuser'
			    				)"
			    		);
			    		echo json_encode(array('error' => false, 'message' => "Registro completado satisfactoriamente."));
			    	}
			    	else 							//Error
			    	{
			    		echo json_encode(array('error' => true));
			    	}
				}
			}	    		   
	    }
	}
?>