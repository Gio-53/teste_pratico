
const cadastro = async (name, email, password) => {
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);

        const response = await fetch('http://localhost/back-end/index.php', {
            method: 'POST',
            body: formData
        });
       
        const responseText = await response.text();  
        const res = JSON.parse(responseText);
        
        if(res == 'Ja existe um usuario cadastrado com esse endereco de e-mail'){
            alert('Ja existe um usuario cadastrado com esse endereco de e-mail');
            return;
        }else{
            location.reload()
        }
        
    
}

const submitBtn = document.getElementById('submitBtn')
submitBtn.addEventListener('click', e=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (name === "" || email === "" || password === "") {
        alert("Todos os campos são obrigatórios!");
        return;
    }
    if(password.length<6){
        alert("A senha deve ter pelo menos 6 caracteres");
        return;
    }
        cadastro(name, email, password)
})



