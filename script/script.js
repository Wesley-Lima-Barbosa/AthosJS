//Lista instanciada para futuro uso

var list = new Array();

//Esconde o formulário de e-mails
function EsconderForm() {
    document.getElementById("divform").style.visibility = "hidden";
}

function Usuarios() {   
    //Esconde o formulário de envio de e-mails    
    EsconderForm();

    //Cria um novo tabulator para listar as requisições
    var table = new Tabulator("#list-table", {
        //Configura o link da API, método e headers e faz a requisição
        ajaxURL: "https://api.backendless.com/5B47E127-88D3-2562-FF22-589138DA6B00/AB3D4F84-00B8-4787-FF90-0527E5132500/data/usuario",
        ajaxConfig: "GET",
        ajaxContentType: {
            headers: {
                'Content-Type': 'application/json',
            }
        },

        //Ajusta o layout com os nomes das colunas e coloca os dados requisitados na tabela
        layout: "fitColumns",
        columns: [
            { title: "Nome", field: "nome", sortable: true, width: 200 },
            { title: "Email", field: "email", sortable: true },
            { title: "Condominio", field: "condominio.nomeCondominio", sortable: true },

        ],

    });



}
function Administradoras() {
    //Esconde o formulário de envio de e-mails    
    EsconderForm();

    //Cria um novo tabulator para listar as requisições
    var table = new Tabulator("#list-table", {
        //Configura o link da API, método e headers e faz a requisição
        ajaxURL: "https://api.backendless.com/5B47E127-88D3-2562-FF22-589138DA6B00/AB3D4F84-00B8-4787-FF90-0527E5132500/data/administradora",
        ajaxConfig: "GET",
        ajaxContentType: {
            headers: {
                'Content-Type': 'application/json',
            }
        },
        //Ajusta o layout com os nomes das colunas e coloca os dados requisitados na tabela
        layout: "fitDataFill",
        columns: [
            { title: "Nome", field: "nomeAdministradora", sortable: true, width: 200 }
        ],

    });


}


function Condominios() {
    //Esconde o formulário de envio de e-mails    
    EsconderForm();

    //Cria um novo tabulator para listar as requisições
    var table = new Tabulator("#list-table", {
        //Configura o link da API, método e headers e faz a requisição
        ajaxURL: "https://api.backendless.com/5B47E127-88D3-2562-FF22-589138DA6B00/AB3D4F84-00B8-4787-FF90-0527E5132500/data/condominio",
        ajaxConfig: "GET",
        ajaxContentType: {
            headers: {
                'Content-Type': 'application/json',
            }
        },
        //Ajusta o layout com os nomes das colunas e coloca os dados requisitados na tabela
        layout: "fitColumns",
        columns: [
            { title: "Nome", field: "nomeCondominio", sortable: true, width: 200 },
            { title: "Administradora", field: "administradora.nomeAdministradora", sortable: true }

        ],

    });
}
function Emails() {
    //Esconde o formulário de envio de e-mails    
    EsconderForm();

    //Cria um novo tabulator para listar as requisições
    var table = new Tabulator("#list-table", {
        //Configura o link da API, método e headers e faz a requisição
        ajaxURL: "https://api.backendless.com/5B47E127-88D3-2562-FF22-589138DA6B00/AB3D4F84-00B8-4787-FF90-0527E5132500/data/email",
        ajaxConfig: "GET",
        ajaxContentType: {
            headers: {
                'Content-Type': 'application/json',
            }
        },
        //Ajusta o layout com os nomes das colunas e coloca os dados requisitados na tabela
        layout: "fitColumns",
        columns: [
            { title: "De", field: "de", sortable: true, width: 200 },
            { title: "Para", field: "para", sortable: true },
            { title: "Assunto", field: "assunto", sortable: true },
            { title: "Conteúdo", field: "conteudo", sortable: true },


        ],

    });
}
function FormEnviar() {
    //Limpa a tabela de listagem para dar espaço ao formulário
    document.getElementById("list-table").innerHTML = "";

    //Instancia variaveis com os combobox's para futuro uso
    var remetente = document.getElementById("remetente");
    var destinatario = document.getElementById("destinatario");

    //Faz o formulário ficar visível
    document.getElementById("divform").style.visibility = "visible";

    //Limpa os combobox's para não ter itens duplicados
    $('#remetente').children().remove();
    $('#destinatario').children().remove();

    //Configura Headers e Método para requisição, e faz a requisição na API
    fetch("https://api.backendless.com/5B47E127-88D3-2562-FF22-589138DA6B00/AB3D4F84-00B8-4787-FF90-0527E5132500/data/usuario", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

        //Após a resposta, retorna o json para uma lista
    }).then(response => { return response.json() }).then(data => {
        var index = 0;
        for (element in data) {
            {
                //Manda o email para a lista
                list.push(data[element].email)

                //Cria options para ser colocada nos combobox' 
                var option = document.createElement("option");
                var option2 = document.createElement("option");
                
                //Muda as propriedades dos options criados
                option.value = index;
                option.textContent = data[element].nome;
                option2.value = index;
                option2.textContent = data[element].nome;

                //Faz o appendchild dos options nos combobox's
                destinatario.appendChild(option);
                remetente.appendChild(option2);
                
                //Faz o número do index aumentar por cada item
                index++;
            }
        }

    });
}
async function EnviarEmail() {
//Instancia as variaveis para criação do json
var remet = document.getElementById("remetente");
var desti = document.getElementById("destinatario");
var assun = document.getElementById("assunto");
var conte = document.getElementById("conteudo");
var email = { "de": list[remet.selectedIndex], "assunto": assun.value, "conteudo": conte.value, "para": list[desti.selectedIndex] }

//Modifica a variável para json
const json = JSON.stringify(email);

//Muda as opções para ser usada no Fetch, colocando já o body.
const options = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: json
};

//Faz o PUT na API
const putapi = await fetch("https://api.backendless.com/5B47E127-88D3-2562-FF22-589138DA6B00/AB3D4F84-00B8-4787-FF90-0527E5132500/data/email", options);

//Se foi feito o PUT com sucesso, dá um alert com sucesso, caso contrário, com erro.
if(putapi.ok)
{
    alert("E-mail enviado com sucesso!")
}
else
{
    alert("Ocorreu um erro, por favor, tente novamente.")
}


//Limpa os valores dos inputs
    assun.value = "";
    conte.value = "";
}

//Previne que a página seja recarregada ao dar submit no formulário
$("#divform").submit(function(e) {
    e.preventDefault();
});