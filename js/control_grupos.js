'use strict'

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_grupo')) ?? []
const setLocalStorage = (dbGrupo) => localStorage.setItem("db_grupo", JSON.stringify(dbGrupo))

const getLocalStorageR = () => JSON.parse(localStorage.getItem('db_relacao')) ?? [{ nomeGrupo: "", idsProdutos: [] }]
const setLocalStorageR = (dbRelacao) => localStorage.setItem("db_relacao", JSON.stringify(dbRelacao))

var auxNomeGrupo = []

// CRUD dos Grupos.
const updateRelacao = (index, relacao) => {
    const dbRelacao = getLocalStorageR()
    dbRelacao[index] = relacao
    setLocalStorageR(dbRelacao)
}

const deleteRelacao = (nomeGrupoDelete) => {
    const dbRelacao = getLocalStorageR()
    dbRelacao.map(function (e) {
        if (e.nomeGrupo === nomeGrupoDelete) {
            for (var i = 0; i < getLocalStorageR().length; i++) {
                if (getLocalStorageR()[i].nomeGrupo === nomeGrupoDelete) {
                    dbRelacao.splice(i, 1)
                }
            }
        }
    })
    setLocalStorageR(dbRelacao)
}

const deleteGrupo = (index) => {
    const dbGrupo = readGrupo()
    dbGrupo.splice(index, 1)
    setLocalStorage(dbGrupo)
}

const updateGrupo = (index, grupo) => {
    const dbGrupo = readGrupo()
    dbGrupo[index] = grupo
    setLocalStorage(dbGrupo)
}

const readGrupo = () => getLocalStorage()

const createGrupo = (grupo) => {
    const dbGrupo = getLocalStorage()
    dbGrupo.push(grupo)
    setLocalStorage(dbGrupo)
}

// Relação com os layout.
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const recebeNomeGrupo = (grupoNome) => {
    getLocalStorageR().map(function (e) {
        if (e.nomeGrupo === grupoNome) {
            document.getElementById('salvar').addEventListener('click', function () {
                for (var i = 0; i < getLocalStorageR().length; i++) {
                    if (getLocalStorageR()[i].nomeGrupo === grupoNome) {
                        const relacao = {
                            nomeGrupo: auxNomeGrupo,
                            idsProdutos: getLocalStorageR()[i].idsProdutos
                        }
                        updateRelacao(i, relacao)
                    }
                }
            })
        }
    })
}

const clearFields = () => {
    const fields = document.querySelectorAll('.form-field')
    fields.forEach(field => field.value = "")
    document.getElementById('nome').dataset.index = 'new'
}

const saveGrupo = () => {
    if (isValidFields()) {
        const grupo = {
            nome: document.getElementById('nome').value
        }
        auxNomeGrupo = grupo.nome
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createGrupo(grupo)
            updateTable()
            clearFields()
        } else {
            updateGrupo(index, grupo)
            updateTable()
            clearFields()
        }
    }
}

const createRow = (grupo, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${grupo.nome}</td>
        <td>
            <button type="button" class="button btn btn-success" id="edit-${index}">Editar</button>
            <button type="button" class="button btn btn-danger" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableGrupo>tbody').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableGrupo>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbGrupo = readGrupo()
    clearTable()
    dbGrupo.forEach(createRow)
}

const fillFields = (grupo) => {
    document.getElementById('nome').value = grupo.nome
    document.getElementById('nome').dataset.index = grupo.index
}

const editGrupo = (index) => {
    const grupo = readGrupo()[index]
    grupo.index = index
    recebeNomeGrupo(grupo.nome)
    fillFields(grupo)
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editGrupo(index)
        } else {
            const grupo = readGrupo()[index]
            const response = confirm(`Deseja realmente excluir o grupo ${grupo.nome}`)
            if (response) {
                const nomeGrupoDelete = readGrupo()[index].nome
                deleteRelacao(nomeGrupoDelete)
                deleteGrupo(index)
                updateTable()
            }
        }
    }
}

updateTable()

// Eventos
document.getElementById('salvar')
    .addEventListener('click', saveGrupo)

document.querySelector('#tableGrupo>tbody')
    .addEventListener('click', editDelete)

document.getElementById('cancelar')
    .addEventListener('click', clearFields)
