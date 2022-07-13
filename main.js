'use strict';

const openModal = () =>
  document.getElementById('modal').classList.add('active');

const closeModal = () => {
  clearFileds();
  document.getElementById('modal').classList.remove('active');
};

c;

//CRUD
//delete
const deleteClient = (index) => {
  const dbClient = readClient();
  dbClient.splice(index, 1);
  setLocalStorage(dbClient);
};
//update
const upDateClient = (index, client) => {
  const dbClient = readClient();
  dbClient[index] = client;
  setLocalStorage(dbClient);
};
//read
const readClient = () => getLocalStorage();
//create
const createClient = (client) => {
  const dbClient = getLocalStorage();

  dbClient.push(client);
  setLocalStorage(dbClient);
};
//
//campos validos
const isValidFields = () => {
  return document.getElementById('form').reportValidity();
};
//
//limpar campos
const clearFileds = () => {
  const fields = document.querySelectorAll('.modal-field');
  fields.forEach((field) => (field.value = ''));
};
// vincular o crud ao layout
const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      celular: document.getElementById('celular').value,
      cidade: document.getElementById('cidade').value,
    };
    createClient(client);
    upDateTable();
    closeModal();
  }
};

const createRow = (client) => {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
         <td>${client.nome}</td>
          <td>${client.email}</td>
          <td>${client.celular}</td>
          <td>${client.cidade}</td>
          <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
          </td>`;
  document.querySelector('#tableClient>tbody').appendChild(newRow);
};
const clearTable = () => {
  const rows = document.querySelectorAll('#tableClient>tbody tr');
  rows.forEach((row) => row.parentNode.removeChild(row));
};

const upDateTable = () => {
  const dbClient = readClient();
  clearTable();
  dbClient.forEach(createRow);
};
upDateTable();
//eventos
document
  .getElementById('cadastrarCliente')
  .addEventListener('click', openModal);

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('salvar'), addEventListener('click', saveClient);
