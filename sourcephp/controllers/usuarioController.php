<?php
	/**
	 * Este controllador contiene todos los métodos que se necesiten realizar
	 * cuando el usuario ineractue con el sistema
	 */
	session_start();
	class usuarioController extends BaseController
	{
	    /**
	     * summary
	     */
	   
	    /**
	     * Iniciar sesión
	     * @param null
	     * @return array(bandera de exito, mensaje (solo si se requiere))
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
			//header('Location: index.php');
			if(session_status() == 1)
				echo json_encode(array('error' => false, 'message' => "Cerrando Sesión"));
			else if (session_status() == 2)
				echo json_encode(array('error' => true, 'message' => "Error al cerrar Sesión"));
	    }

	    /**
	     * Verificar que tipo de usuario esta iniciando sesión en el sistema
	     * @param null
	     * @return array(bandera de exito, mensaje de error si es necesaio o tipo de usuario que hace login)
	     */
	    public function verifyUser()
	    {   
	    	if(isset($_SESSION["userreg"]))
	    	{	    			    	
	    		$aux = $_SESSION["userreg"];
	    		//$query = "SELECT 'tiposusuarios.Tipo_Usuario' FROM tiposusuarios JOIN usuario ON 'tiposusuarios.Id_TipoUsuario' = 'usuario.Tipo_Usuario' where 'usuario.Registro_U' = '$aux'";
	    		$query = "SELECT Tipo_Usuario from usuario where Registro_U = ".$aux;

				$user_type = $this->pdo->prepare($query);
				$user_type -> execute();
				$queryrows = (int)$user_type->rowCount();
				
	    		if($queryrows != 1)
	    			echo json_encode(array('error' => true, 'message' => 'No se pudo encontrar una respuesta a su petición, favor de crear una cuenta de algún tipo válido para el sistema'));
	    		else if($queryrows == 1)
	    		{
	    			$resultado = $user_type->fetch(PDO::FETCH_ASSOC);
					$_SESSION["usertype"] = $resultado['Tipo_Usuario'];					
		    		echo json_encode(array('error' => false, 'usertype' => $_SESSION["usertype"]));
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

				$userreg = $_POST["userreg"];
				$verfusuarios = $this->pdo->prepare("SELECT Registro_U from usuario where Registro_U = '$userreg'");
				$verfusuarios->execute();
				$numveru = $verfusuarios->rowCount();

				if($numveru > 0)	//Ya hay un usuario con ese registro
				{
					echo json_encode(array('error' => true, 'message' => "Ya existe un usuario en el sistema con ese registro."));
				}
				else if ($numveru == 0)	//No hay usuario con ese registro
				{

					$typeuser = $_POST["tuser"];
					$email = $_POST["email"];
					$password = $_POST["password"];
					$nombres = $_POST["nombres"];
					$apellidos = $_POST["apellidos"];

					if($typeuser == 1 || $typeuser == 2)			//Coord o Profesor
						$escolaridad = $_POST["escolaridad"];
					else if($typeuser == 3)							//Alumno
						$escolaridad = null;
					else 						//Error
			    	{
						echo json_encode(array('error' => true));
						return;
					}

					$insercion = $this->pdo->prepare(
						"INSERT into usuario (
								Registro_U, 
								Nombres, 
								Apellidos, 
								Email, 
								Password, 
								Tipo_Usuario,
								Escolaridad
							) values (
								'$userreg', 
								'$nombres', 
								'$apellidos', 
								'$email', 
								'$password',
								'$typeuser', 
								'$escolaridad'
							)"
					);
					$insercion->execute();
					$countinsert = $insercion->rowCount();						

					if($typeuser == 1)	//Coordinador de Academia
			    	{
						$academia = $_POST["academia"];
						$carrera = $_POST["carrera"];
			    		$claveaccess = $_POST["claveaccess"];
						$ciclo = $_POST["ciclomeses"]." ".$_POST["cicloy"];
						$listaprof = null;

						$insertacad = $this->pdo->prepare(
							"INSERT INTO academia (
									Academia, 
									Clave_Acceso, 
									Ciclo_Periodo,
									Lista_Prof, 
									Coordinador_Acad, 
									Carrera
								) values (
									'$academia', 								
									'$claveaccess',
									'$ciclo',
									'$listaprof',
									'$userreg',
									'$carrera'
								);");
						$insertacad->execute();
						$insertedacad = $insertacad->rowCount();

						if($insertedacad > 0 && $countinsert > 0)
							echo json_encode(array('error' => false, 'message' => "Registro completado satisfactoriamente."));
						else
						{
							echo json_encode(array('error' => true, 'message' => 'Error al registrase'));			    	
							//Delete ambos si se crearon
						}
					}							    	
					else if ($typeuser == 2 || $typeuser == 3)
					{
						if($countinsert > 0)
							echo json_encode(array('error' => false, 'message' => "Registro completado satisfactoriamente."));
						else
							echo json_encode(array('error' => true, 'message' => 'Error al registrase', 'ins' => $countinsert));
					}
				}
			}	    		   
		}
		
		public function getSessionVariables()
		{
			if(isset($_SESSION["userreg"]) && isset($_SESSION["usertype"]))
				echo json_encode(array('error' => false, 'userreg' => $_SESSION["userreg"], 'usertype' => $_SESSION["usertype"]));
			else
				echo json_encode(array('error' => true));
		}

		public function getUserInfo() {
			if(isset($_SESSION["userreg"]) && isset($_SESSION["usertype"])) {
				$query = "SELECT * from usuario where Registro_U =".$_SESSION['userreg'];
				$user_info = $this->pdo->prepare($query);
				$user_info -> execute();
				$queryrows = $user_info->rowCount();
				if($queryrows != 1) {
					echo json_encode(array('error' => true, 'message' => "Error al obtener información de usuario, favor de intentar más tarde."));
				} else if ($queryrows == 1) {
					$userinfores = $user_info->fetch(PDO::FETCH_ASSOC);
					if($_SESSION["usertype"] == 1) {
						$acadquery = "SELECT Id_Academia, Academia, Ciclo_Periodo, academia.Carrera FROM 
							easycheckdb.academia join easycheckdb.carrera on academia.Carrera =
							carrera.Id_Carrera where Coordinador_Acad =".$_SESSION["userreg"];
						$acadinfo = $this->pdo->prepare($acadquery);
						$acadinfo -> execute();
						$acadqryrows = $acadinfo->rowCount();
						if($acadqryrows != 1) {
							echo json_encode(array('error' => true, 'message' => "Error al obtener información básica de academia, favor de intentar más tarde."));
						} else if ($acadqryrows == 1){
							$basicacadinfo = $acadinfo->fetch(PDO::FETCH_ASSOC);
							echo json_encode (array('error' => false, 'userinfo' => $userinfores, 'basicacadinfo' => $basicacadinfo));
						}
					} else {
						echo json_encode (array('error' => false, 'userinfo' => $userinfores));
					}
				}
			} else {
				echo json_encode (array('error' => true, 'closesess' => true));
			}
		}
	}
?>