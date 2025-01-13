const trData = document.querySelector("#tr-data");
const tBody = document.querySelector('#t-body');
const container = document.querySelector('#listagem-container')

async function req() {
    const response = await fetch('http://localhost/back-end/index.php');
    const data = await response.json()
    
    return data;
}

const main =  async ()=>{
    const data = await req();
    const chaves = Object.keys(data[0]);
    chaves.forEach(e=>{
        if(e=== 'name' || e=== 'email'){
        const th = document.createElement('th')
        th.innerHTML= e;
        trData.appendChild(th)
        }
    })
    data.forEach(e=>{
        //console.log(Object.keys(e));
        const trd = document.createElement('tr')    
        const valores = Object.values(e);                
        valores.forEach(val=>{
            const tableFilter= valores.indexOf(val);
            if(tableFilter === 1 || tableFilter === 2 ){                     
                const td= document.createElement('td')
                td.innerHTML = val
                trd.appendChild(td)
            }
        })
        const editBtn = document.createElement('button')
        editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square '+ e.id+'"></i>'
        editBtn.classList.add('editBtn', 'actionBtn', e.id)
        trd.appendChild(editBtn)
        const delBtn = document.createElement('button')
        delBtn.innerHTML = '<i class="fa-solid fa-trash '+ e.id+'"></i>'
        delBtn.classList.add('delBtn', 'actionBtn', e.id)
        trd.appendChild(delBtn)
        tBody.appendChild(trd)
        
    })

    
    const btns = document.querySelectorAll('.actionBtn')
    const arrBtns = [...btns]//transformando nodelist em arr
    arrBtns.forEach(btn=>{
        getId(btn)
    })

}
const getId = (element)=>{
    element.addEventListener('click',  async e=>{
        e.preventDefault();
        const id = e.target.classList[2];
        let btnType = '';
        if(e.target.classList[1] === 'actionBtn'){
            btnType=e.target.classList[0]}
        else{
            btnType=e.target.classList[1]
        }
        if(btnType === 'delBtn' || btnType==='fa-trash'){
            let = confirm("O cadastro será excluído permanentemente, deseja prosseguir?")
            if(confirm){
                delCadastro(id)
                location.reload();
            }
        }
        console.log(btnType);
        
        if(btnType=== 'fa-pen-to-square' || btnType ==='editBtn'){
            const res = await singleData(id);
            let currentName =  res[0].name
            let currentEmail = res[0].email     
            console.log({
                currentName, currentEmail
            });
            
            container.innerHTML =
            ` <form>
            <div class="input-field">
                <span>Nome:</span>
                <input type="text" value="${currentName}" id="name" >
            </div>
            <div class="input-field">
                <span>Email:</span>
                <input type="text" value="${currentEmail}" id="email" placeholder="insira seu e-mail">
            </div>
            <div class="buttons input-field">
                <button onclick="main()">Voltar</button>
                <button id="update" >Confirmar</button>
            </div>
        </form>`
        }
        const updateBtn = document.getElementById('update');
        
        updateBtn.addEventListener('click',e=>{
        const newName = document.getElementById('name').value;
        const newEmail= document.getElementById('email').value;
            e.preventDefault()
           update(id, newName, newEmail);
           location.reload();
        })      
        
   
    })
}

const delCadastro= async (id)=>{
    const del = await fetch(`http://localhost/back-end/index.php?id=${id}`, {
        method: 'DELETE'
    });
    const data = await del.json()
    return data;
}

const singleData =  async (id) =>{
    const singleData = await fetch('http://localhost/back-end/index.php?id='+ id )
    const res = await singleData.json()   
    return res
}

const update = async (id, name, email) => {
    const params = new URLSearchParams();
    params.append('name', name);
    params.append('email', email);
    console.log(params);
    

    const response = await fetch(`http://localhost/back-end/index.php?id=${id}`, {
        method: 'PUT',
        body: params
    });

    const data = await response.json();
    main();
};

main()