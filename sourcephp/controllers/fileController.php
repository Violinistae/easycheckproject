<?php
    class fileController {

        public function __construct() {            
        }

        public function saveFile_getPathForJS () {
            if (!is_uploaded_file($_FILES["file"]["tmp_name"])) {
                echo json_encode (array('error' => true, 'message' => "No se encontraron archivos por almacenar."));
                return;
            } else {                
                
                $targetPath = $_POST["targetPath"];
                $fileName = $_POST["fileName"];
                $fileType = $_POST["fileType"];
                $targetFile = $targetPath . $fileName . "." . $fileType;

                if (isset($_POST["oldfileName"])) {
                    $resReplace = replaceFile($_POST["oldFileName"], $fileType);
                    if ($resReplace == -1) {
                        echo json_encode(array('error' => true));
                        return;
                    }
                }
                
                $res = $this->saveUploadedFile($targetFile);

                switch ($res) {
                    case 1:             //Saved uploaded file
                        echo json_encode(array('error' => false, 'filePath' => $targetFile, 'fileName' => $fileName));
                        return;
                    case 0:             //Cannot save uploaded file
                        echo json_encode(array('error' => true, 'message' => "No se pudo almacenar el archivo, inténtelo más tarde."));
                        return;
                    case -1:            //Uploaded file already exists
                        echo json_encode(array('error' => true, 'message' => "Por favor cambie el nombre del archivo"));
                        return;
                    case -2:            //No uploaded files
                        echo json_encode(array('error' => true, 'message' => "No se encontraron archivos por almacenar."));
                        return;                        
                    default:
                        echo json_encode(array('error' => true, 'message' => "Error de carga y almacenamiento de archivos, inténtelo más tarde."));
                        return;
                }     

            }
        }

        private function saveUploadedFile ($targetFile) {                  

            if (file_exists($targetFile)) { 
                return -1;
            }

            if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
                return 1;
            } else {
                return 0;
            }
                        
        }

        public function create_writeFile () {            
            $contentForFile = $_POST["contentForFile"];
            $targetFile = "./".$_POST["targetPath"].$_POST["fileName"].".txt";

            $fwrite = fopen($targetFile, "w+");
            
            if(fwrite($fwrite, $contentForFile)) {
                fclose($fwrite);
                echo json_encode(array('error' => false, 'message' => "Archivo creado/sobreescrito exitosamente."));
                return;
            } else {
                fclose($fwrite);
                echo json_encode(array('error' => true, 'message' => "No se pudo crear/sobreescribir el archivo."));
                return;
            }     
        }

        private function replaceFile ($oldFileName, $extension) {
            $targetDeleteFile = $targetPath.$oldFileName.$extension; 
            if (delete($targetDeleteFile)) {
                return 1;
            } else {
                return -1;
            }
        }

        public function deleteFile ($oldFileName, $extension) {
            $targetDeleteFile = $targetPath.$oldFileName.$extension; 
            if (delete($targetDeleteFile)) {
                echo json_encode(array('error' => false));
            } else {
                echo json_encode(array('error' => true));
            }
        }
    }
    
?>