<?php
    class fileController {

        public function saveFile_getPathForJS () {
            if (is_uploaded_file($_FILES["file"]["tmp_name"])) {                   

                $fileName = $_POST["fileName"];
                $targetPath = $_POST["targetPath"];

                $target_file = $targetPath . $fileName;
                $res = $this->saveUploadedFile($target_file);

                switch ($res) {
                    case 1:             //Saved uploaded file
                        echo json_encode(array('error' => false, 'path' => $target_file));
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
                        echo json_encode(array('error' => true, 'message' => "No se pudo almacenar el archivo, inténtelo más tarde."));
                        return;
                }     

            } else {
                echo json_encode (array('error' => true, 'message' => "No se encontraron archivos por almacenar."));
            }
        }

        private function saveUploadedFile ($target_file) {                  

            // Check if file already exists
            if (file_exists($target_file)) { 
                return -1;
            }

            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                return 1;
            } else {
                return 0;
            }
                        
        }
    }
    
?>