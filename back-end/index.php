<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
$transacao = new PDO('mysql:host=localhost;dbname=defaultdb', 'root', '');
$reqMethod = $_SERVER['REQUEST_METHOD'];
$id = filter_input(INPUT_GET, 'id' );

switch($reqMethod ){
    case 'GET':
        try{
        if($id){
            $consulta = $transacao->prepare("SELECT id, name, email FROM users WHERE id = :id");
            $consulta->execute(['id' =>$id]);
            echo json_encode($consulta->fetchAll(PDO::FETCH_ASSOC));
        }else{
            $consulta = $transacao->query("SELECT * FROM users");
            echo json_encode($consulta->fetchAll(PDO::FETCH_ASSOC));
        }
    }catch(PDOException $error){
        echo json_encode(['Erro ao fazer requisicao']);
        error_log($error->getMessage());
    }
    break;
    case 'POST':
            try{
            if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
                $name = $_POST['name'];
                $email = $_POST['email'];
                $password = $_POST['password'];
                if(strlen($password)<6){
                    echo json_encode("A senha nao pode ter comprimento menor do que 6 caracteres");
                    return;
                }
    
                $insert = $transacao->prepare("INSERT INTO users (name, email, password) VALUES (:name, :email, :password)");
                $insert->execute(['name' => $name, 'email' => $email, 'password' => $password]);
                echo json_encode(['ok']);                
            } else {
                echo json_encode(['error' => 'Campos obrigatórios faltando: name, email, password']);
            }
        }catch(PDOException $error){
            echo json_encode(['Ja existe um usuario cadastrado com esse endereco de e-mail']);
            
            error_log($error->getMessage());
        }
        break;
    case 'DELETE':
        if($id){
        try {
            $apagar = $transacao->prepare("DELETE FROM users WHERE id = :id");
            $apagar->execute(['id' =>$id]);
            echo json_encode([
                "Usuario de id: ".$id." deletado."
            ]);
        } catch (PDOException $e) {
            echo json_encode(['Erro na exclusão do usuario de '.$id.'.']);
            error_log($error->getMessage());
        }};
     break;
     case 'PUT':
        if($id){
            try{
            $consulta = $transacao->prepare("SELECT id, name, email FROM users WHERE id = :id");
            $consulta->execute(['id' =>$id]);
            
            $resultado = $consulta->fetchAll(PDO::FETCH_ASSOC)[0];
            $currentName = $resultado['name'];
            $currentEmail = $resultado['email'];
           
            echo json_encode($currentName);
        
            parse_str(file_get_contents("php://input"), $putData);
            $newName = $putData['name'];
            $newEmail = $putData['email'];

        if(strlen($newName)>0 && $newName !== $currentName){
            $currentName = $newName;
        }
        
        if(strlen($newEmail)>0 && $newEmail !== $currentEmail){
            $currentEmail = $newEmail;
        }   
        $atualizar = $transacao->prepare("UPDATE users SET name= :name, email= :email where id= :id");
        $atualizar->execute(['id' =>$id, 'name' => $currentName, 'email'=>$currentEmail]);
        }
        catch (PDOException $e) {
            echo json_encode(['Erro na atualização de cadastro do usuario de '.$id.'.']);
            error_log($error->getMessage());
        }
        }
    break;            
    default:
        echo 'Metódo de requisição http: '.$reqMethod;
    break;
    }

$transacao = null;
?>