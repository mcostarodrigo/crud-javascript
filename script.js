// Array global para armazenar os dados
let pessoas = JSON.parse(localStorage.getItem("pessoas")) || []; // Carrega os dados existentes do localStorage, ou cria um array vazio se ainda não houver dados.

// Contador de IDs
let idCounter = pessoas.length > 0 ? pessoas[pessoas.length - 1].id + 1 : 1; // Ajusta o contador de IDs // Operador ternário (? :): // Ele segue a estrutura: condição ? valor_se_verdadeiro : valor_se_falso.

function show() {
  //capturando dados

  let nome = document.getElementById("nome").value;
  let e_mail = document.getElementById("e-mail").value;
  let telefone = document.getElementById("telefone").value;
  let res = document.getElementById("res");

  nome = nome.toUpperCase(); // Captura o nome e transforma em maiusculas
  nome = nome.trim(); //O método trim() não modifica a string original; em vez disso, retorna uma nova string com os espaços removidos.

  //Validação de dados

  if (!nome || !e_mail || !telefone) {
    res.innerHTML = "Por favor, preencha todos os campos";
    return;
  }

  // Cria o objeto person com os dados capturados

  const person = {
    id: idCounter,
    nome: nome,
    e_mail: e_mail,
    telefone: telefone,
  };

  // Adiciona o objeto ao array
  pessoas.push(person);

  // Incrementa o contador de IDs para a próxima pessoa
  idCounter++;

  // Atualiza o localStorage com os novos dados
  localStorage.setItem("pessoas", JSON.stringify(pessoas));

  res.innerHTML = `Dados salvos com sucesso!! Total de ${pessoas.length} salvos!`;
}

function ShowDisplay() {
  // Mostra lista de pessoas salvos no localStorage
  let res = document.getElementById("res");
  res.innerHTML = `${JSON.stringify(pessoas, null, 2)} </br> `;
}

function showById() {
  // showById(): Esta função lê o ID inserido pelo usuário, procura a pessoa correspondente no array pessoas usando o método find(), e exibe os detalhes dessa pessoa.

  let res = document.getElementById("res");

  let idBuscar = parseInt(document.getElementById("codigoCliente").value); // pegando as informações do input com código do cliente que o usuário deseja buscar.

  // Encontra a pessoa com o ID correspondente // Este é o argumento de find(), que é uma função callback de flecha (arrow function). Esta função será executada para cada elemento do array pessoas até encontrar um que atenda à condição.

  let pessoaEncontrada = pessoas.find((person) => person.id === idBuscar);

  if (pessoaEncontrada) {
    res.innerHTML = `ID: ${pessoaEncontrada.id}<br>Nome: ${pessoaEncontrada.nome}<br>E-mail: ${pessoaEncontrada.e_mail}<br>Telefone: ${pessoaEncontrada.telefone}`;
  } else {
    res.innerHTML = "Pessoa não encontrada com o ID fornecido";
  }
}

function showByName() {
  let nomeBuscar = document.getElementById("nomeCliente").value.toUpperCase(); // Captura o nome e transforma em maiusculas

  nomeBuscar = nomeBuscar.trim(); //O método trim() não modifica a string original; em vez disso, retorna uma nova string com os espaços removidos.

  //O método find() do JavaScript retorna apenas o primeiro elemento que satisfaz a condição fornecida. Se você deseja continuar procurando e obter todos os resultados que correspondem à condição, você deve usar o método filter() em vez de find().

  let pessoas = JSON.parse(localStorage.getItem("pessoas")) || []; // Obtém os dados do localStorage

  let pessoaEncontrada = pessoas.filter((person) =>
    person.nome.toUpperCase().includes(nomeBuscar)
  ); // Verifica se o nomeBuscar está incluído em person.nome

  if (pessoaEncontrada.length > 0) {
    // Verifica se há pelo menos uma pessoa encontrada.
    // Exibe todos os resultados
    res.innerHTML = pessoaEncontrada
      .map(
        (person) =>
          `ID: ${person.id} <br> Nome: ${person.nome} <br> E-mail: ${person.e_mail}<br> Telefone: ${person.telefone}`
      )
      .join("<br><br>");
  } else {
    res.innerHTML = "Pessoa não encontrada com o nome fornecido";
  }

  console.log(pessoas);
}

function editperson() {
  let idToEdit = parseInt(document.getElementById("editId").value); // ID da pessoa que será editada
  let newName = document.getElementById("editNome").value.toUpperCase();
  let newEmail = document.getElementById("editEmail").value;
  let newPhone = document.getElementById("editTelefone").value;
  let res = document.getElementById("res");

  newName = newName.trim();

  // Verifica se todos os campos foram preenchidos
  if (!newName || !newEmail || !newPhone) {
    res.innerHTML = "Por favor, preencha todos os campos de edição.";
    return;
  }

  // Encontra a pessoa com o ID correspondente
  let personIndex = pessoas.findIndex((person) => person.id === idToEdit);

  if (personIndex !== -1) {
    // Atualiza os dados da pessoa encontrada
    pessoas[personIndex] = {
      id: idToEdit,
      nome: newName,
      e_mail: newEmail,
      telefone: newPhone,
    };

    // Atualiza o localStorage com os dados modificados
    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    res.innerHTML = `Dados atualizados com sucesso!`;
  } else {
    res.innerHTML = "Pessoa não encontrada com o ID fornecido.";
  }
}

function del() {

  let idToDelete = parseInt(document.getElementById('deleteId').value); // ID da pessoa que será excluida
  let res = document.getElementById('res')

  // Encontra a pessoa com o ID correspondente
  let locId = pessoas.findIndex((person) => person.id === idToDelete);

  if (locId!== -1) {
    // Remove a pessoa do array 'pessoas'
    pessoas.splice(locId, 1); // splice(locId, 1): Este método remove 1 elemento a partir do índice locId. No caso, remove a pessoa encontrada no array pessoas.

    // Atualiza o localStorage com o array 'pessoas' atualizado
    localStorage.setItem('pessoas', JSON.stringify(pessoas));

  res.innerHTML = `Pessoa com ID ${idToDelete} foi excluída com sucesso.`;
} else {
  // Caso o ID não seja encontrado, exibe uma mensagem de erro
  res.innerHTML = `Pessoa com ID ${idToDelete} não foi encontrada.`;
}

}
