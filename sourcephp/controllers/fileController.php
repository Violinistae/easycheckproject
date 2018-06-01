<?php
    class fileController {

        public function __construct() {            
        }

        private function saveUploadedFile ($targetFile, $targetTxtFile) {                  

            if (file_exists($targetTxtFile)) { 
                return -1;
            }

            if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
                return 1;
            } else {
                return 0;
            }
                        
        }

        public function saveFile_getPathForJS () {
            if (!is_uploaded_file($_FILES["file"]["tmp_name"])) {
                echo json_encode (array('error' => true, 'message' => "No se encontraron archivos por almacenar."));
                return;
            } else {                
                
                $targetPath = $_POST["targetPath"];
                $fileName = $_POST["fileName"];
                $fileType = $_POST["fileType"];
                $txtFileTargetPath = $_POST["targetPathTxt"];

                $targetFile = $targetPath . $fileName . "." . $fileType;
                $targetTxtFile = $txtFileTargetPath . $fileName . ".txt";
                
                $res = $this->saveUploadedFile($targetFile, $targetTxtFile);

                switch ($res) {
                    case 1:             //Saved uploaded file
                        echo json_encode(array(
                            'error' => false, 
                            'targetFile' => $targetFile, 
                            'filePath' => $targetPath,
                            'fileName' => $fileName)
                        );
                        return;
                    case 0:             //Cannot save uploaded file
                        echo json_encode(array(
                            'error' => true, 
                            'message' => "No se pudo almacenar el archivo, inténtelo más tarde.")
                        );
                        return;
                    case -1:            //Uploaded file already exists
                        echo json_encode(array(
                            'error' => true, 
                            'message' => "Por favor cambie el nombre del archivo")
                        );
                        return;
                    case -2:            //No uploaded files
                        echo json_encode(array(
                            'error' => true, 
                            'message' => "No se encontraron archivos por almacenar.")
                        );
                        return;                        
                    default:
                        echo json_encode(array(
                            'error' => true,
                            'message' => "Error de carga y almacenamiento de archivos, inténtelo más tarde.")
                        );
                        return;
                }     

            }
        }

        public function create_writeFile () {
            $contentForFile = $_POST["contentForFile"];
            $targetFile = "./".$_POST["targetPath"].$_POST["fileName"].".txt";

            $fwrite = fopen($targetFile, "w+");
            
            if(fwrite($fwrite, $contentForFile)) {
                fclose($fwrite);
                echo json_encode(array(
                    'error' => false, 
                    'message' => "Archivo creado/sobreescrito exitosamente.")
                );
                return;
            } else {
                fclose($fwrite);
                echo json_encode(array(
                    'error' => true, 
                    'message' => "No se pudo crear/sobreescribir el archivo.")
                );
                return;
            }
        }

        public function deleteFile () {
            $targetDeleteFile = $_POST["targetFile"];
            if (unlink($targetDeleteFile)) {
                echo json_encode(array('error' => false));
            } else {
                echo json_encode(array('error' => true));
            }
        }

        public function getContentFile () {
            $targetFile = "./".$_POST["targetFile"];
            $fread = fopen($targetFile, "r");

            if(filesize($targetFile) > 0){
                $fileContent = fread($fread, filesize($targetFile));
                $fileContent = nl2br($fileContent);
                fclose($fread);
                echo json_encode(array(
                    'error' => false, 
                    'fileContent' => $fileContent
                ));
                return;
                
            } else {
                fclose($fread);
                echo json_encode(array(
                    'error' => true
                ));
                return;
            }
            
        }
    }
    
?>