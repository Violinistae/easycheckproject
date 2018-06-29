<?php
	/**
	 * Este controllador contiene todos los métodos que se necesiten realizar
	 * cuando el usuario ineractue con el sistema
	 */
	if (session_status() == PHP_SESSION_NONE) {
		session_start();
	}
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
	    public function Login() {
			//Recibir datos de ajax y verificar si existe ese usuario
	    	if (isset($_POST["userreg"]) && isset($_POST["password"])) {
	    		$userreg = $_POST["userreg"];
				$password = $_POST["password"];

				$user_res = $this->pdo->prepare(
					"SELECT * from usuario where Registro_U = ?"
				);
				$user_res->execute([$userreg]);

				$user = $user_res->fetchAll();
				if (isset($user[0])) {				
					if (password_verify($password, $user[0]->Password)) {
						$_SESSION["userreg"] = $userreg;
						echo json_encode(array('error' => false, 'user' => $_SESSION['userreg']));
					} else 
						echo json_encode(array ('error' => true, 'message' => 'El nombre de usuario o password son incorrectos.'));
				} else {
					echo json_encode(array ('error' => true, 'message' => 'El nombre de usuario o password son incorrectos.'));
				}
			}
			
	    }

	    public function Logout() {
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
	    public function verifyUser() {   
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
	    public function registerUser() {	    		    	
			if(isset($_POST["tuser"]))
			{		

				$userreg = $_POST["userreg"];
				$verfusuarios = $this->pdo->prepare("SELECT Registro_U from usuario where Registro_U = ?");
				$verfusuarios->execute([$userreg]);
				
				$numveru = $verfusuarios->rowCount();

				if($numveru > 0)	//Ya hay un usuario con ese registro				
					echo json_encode(array('error' => true, 'message' => "Ya existe un usuario en el sistema con ese registro."));			
				else if ($numveru == 0) {	//No hay usuario con ese registro				

					$typeuser = $_POST["tuser"];
					$email = $_POST["email"];
					$password = $_POST["password"];
					$nombres = $_POST["nombres"];
					$apellidos = $_POST["apellidos"];
					$password_hash = $hash = password_hash($password, PASSWORD_DEFAULT);

					if($typeuser == 1 || $typeuser == 2)			//Coord o Profesor
						$escolaridad = $_POST["escolaridad"];
					else if($typeuser == 3)							//Alumno
						$escolaridad = "";
					else {											//Error --> NO existe ese usuario	    	
						echo json_encode(array('error' => true));
						return;
					}

					$insercion = $this->pdo->prepare(
						"INSERT into usuario (
							Registro_U, Nombres, Apellidos, Email, Password, Tipo_Usuario, Escolaridad
						) values ( ?, ?, ?, ?, ?, ?, ? )"
					);
					$insercion->execute([
						$userreg, $nombres, $apellidos, $email, $password_hash, $typeuser, $escolaridad
					]);
					$countinsert = $insercion->rowCount();						

					if ($typeuser == 1) {					//Coordinador de Academia			    	
						$academia = $_POST["academia"];
						$carrera = $_POST["carrera"];
			    		$claveaccess = $_POST["claveaccess"];
						$ciclo = $_POST["ciclomeses"]." ".$_POST["cicloy"];
						$claveaccess_hash = password_hash($claveaccess, PASSWORD_DEFAULT);
						$listaprof = "null";

						$insertacad = $this->pdo->prepare(
							"INSERT INTO academia (
								Academia, Clave_Acceso, Ciclo_Periodo, Lista_Prof, Coordinador_Acad, Carrera
							) values (?, ?, ?, ?, ?, ?)"
						);
						$insertacad->execute([
							$academia, $claveaccess_hash, $ciclo, $listaprof, $userreg, $carrera
						]);

						$insertedacad = $insertacad->rowCount();



						if($insertedacad > 0 && $countinsert > 0)
							echo json_encode(array('error' => false, 'message' => "Registro completado satisfactoriamente."));
						else
							echo json_encode(array('error' => true, 'message' => 'Error al registrase', 'x' => $insertacad->errorInfo()));			    								
					} else if ($typeuser == 2 || $typeuser == 3) {
						if($countinsert > 0)
							echo json_encode(array('error' => false, 'message' => "Registro completado satisfactoriamente."));
						else
							echo json_encode(array('error' => true, 'message' => 'Error al registrarse', 'ins' => $insercion->errorInfo()));
					}
				}
			}	    		   
		}
		
		public function getSessionVariables() {
			if(isset($_SESSION["userreg"]) && isset($_SESSION["usertype"]))
				echo json_encode(array('error' => false, 'userreg' => $_SESSION["userreg"], 'usertype' => $_SESSION["usertype"]));
			else
				echo json_encode(array('error' => true));
		}

		public function getUserForSimple () {
			if (isset($_SESSION["userreg"])) {
				$stmt = $this->pdo->prepare(
					"SELECT * FROM usuario
						WHERE Registro_U = ?"
				);
				$stmt->execute([
					$_SESSION["userreg"]
				]);
				if ($stmt->rowCount() > 0) {
					while ($u = $stmt->fetch(PDO::FETCH_ASSOC)) {
						$user = new usuarioModel;
						$user->setRegistro_U($_SESSION["userreg"]);
						$user->setNombres($u["Nombres"]);
						$user->setApellidos($u["Apellidos"]);
						$user->setEmail($u["Email"]);
					}
					return $user;
				}
				return null;
			}
		}

		public function getUserForSimpleById ($Id_U) {
			$stmt = $this->pdo->prepare(
				"SELECT * FROM usuario
					WHERE Registro_U = ?"
			);
			$stmt->execute([
				$Id_U
			]);
			if ($stmt->rowCount() > 0) {
				while ($u = $stmt->fetch(PDO::FETCH_ASSOC)) {
					$user = new usuarioModel;
					$user->setRegistro_U($u["Registro_U"]);
					$user->setNombres($u["Nombres"]);
					$user->setApellidos($u["Apellidos"]);
					$user->setEmail($u["Email"]);
				}
				return $user;
			}
			return null;
		}		


		public function getUserInfo() {
			if(isset($_SESSION["userreg"]) && isset($_SESSION["usertype"])) {
				
				$userreg = $_SESSION['userreg'];
				$user_info = $this->pdo->prepare(
					"SELECT * from usuario where Registro_U = ?"
				);
				$user_info -> execute([$userreg]);

				$queryrows = $user_info->rowCount();
				if($queryrows != 1) {
					echo json_encode(array('error' => true, 'message' => "Error al obtener información de usuario, favor de intentar más tarde."));
				} else if ($queryrows == 1) {

					$userinfores = $user_info->fetch(PDO::FETCH_ASSOC);
					if($_SESSION["usertype"] == 1) {
						
						$acadinfo = $this->pdo->prepare(
							"SELECT Id_Academia, Academia, Ciclo_Periodo, academia.Carrera FROM 
							easycheckdb.academia join easycheckdb.carrera on academia.Carrera =
							carrera.Id_Carrera where Coordinador_Acad = ?"
						);
						$acadinfo -> execute([$userreg]);

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

		public function updateUserInfo() {	    		    	
			if(isset($_POST["utype"])) {		

				$olduserreg = $_SESSION["userreg"];		//Cambiar variable de sesión al update
				$verfusuarios = $this->pdo->prepare("SELECT Registro_U from usuario where Registro_U = '$olduserreg'");
				$verfusuarios->execute();
				$numveru = $verfusuarios->rowCount();

				if($numveru > 0) {
					$newuserreg = $_POST["newuserreg"];
					$verfnewuserreg = $this->pdo->prepare("SELECT Registro_U from usuario where Registro_U = '$newuserreg'");
					$verfnewuserreg->execute();

					if ($verfnewuserreg->rowCount() == 0) {				//No hay usuario con ese registro --> Se puede actualizar

						$typeuser = $_POST["utype"];
						$email = $_POST["email"];
						$nombres = $_POST["nombres"];
						$apellidos = $_POST["apellidos"];
						if ($typeuser == 1 || $typeuser == 2) {			//Coord o Profesor
							$escolaridad = $_POST["escolaridad"];
						} else if ($typeuser == 3) {					//Alumno
							$escolaridad = null;
						} else { 										//Error, no es tipo de usuario
							echo json_encode(array('error' => true, 'logout' => true));
							return;
						}

						$updateuserstr =$this->pdo->prepare(
							"UPDATE usuario
								set Registro_U = ?,	Nombres = ?, Apellidos = ?, Email = ?, Escolaridad = ?
							where Registro_U = ?"
						);

						$updateuserstr->execute([
							$newuserreg, $nombres, $apellidos, $email, $escolaridad, $olduserreg
						]);

						if($typeuser == 1) {

							$idacad = $_POST["idacad"];
							$academia = $_POST["academia"];
							$carrera = $_POST["carrera"];
							$ciclo = $_POST["ciclomeses"]." ".$_POST["cicloy"];

							$updateacad = $this->pdo->prepare(
								"UPDATE academia
									set Academia = ?, Ciclo_Periodo = ?, Carrera = ?
								where Id_Academia = ?"
							);

							$updateacad->execute(array(
								$academia, $ciclo, $carrera, $idacad
							));

							$updateacadrows = $updateacad->rowCount();

							if ($updateacadrows > 0 && $updateuserstr->rowCount() > 0) {
								$_SESSION["userreg"] = $newuserreg;
								echo json_encode(array(
									'error' => false, 
									'message' => "La actualización de su información se ha realizado satisfactoriamente.",
									'logout' => false)
								);
								return;
							} else {
								echo json_encode(array('error' => true, 
								'message' => 'Error al actualizar su información.', 'logout' => false));
								return;
							}
						} else if ($typeuser == 2 || $typeuser == 3) {
							if($updateuserstr->rowCount() > 0) {
								$_SESSION["userreg"] = $newuserreg;
								echo json_encode(array('error' => false,
								'message' => "La actualización de su información se ha realizado satisfactoriamente.", 'logout' => false));
							} else {
								echo json_encode(array('error' => true, 'message' => 'Error al actualizar su información', 'logout' => false));
							}
						}

					} else if ($verfnewuserreg->rowCount() != 0) {						//Ya hay usuario con ese registro
						echo json_encode(array('error' => true, 'message' => "Ya hay un usuario registrado con ese número de registro.", 'logout' => false));
					}
				} else if ($numveru == 0) {				//No hay usuario con ese registro para actualizar
					echo json_encode(array('error' => true, 'message' => "Error no hay usuario que actualizar.", 'logout' => true));
				}
			} else {
				echo json_encode(array('error' => true, 'message' => "No hay tipo usuario.", 'logout' => true));
			}	    		   
		}

		public function sendMailResetPassword() {
			
		}

		public function checkEmailUser () {
			
		}
	}
?>