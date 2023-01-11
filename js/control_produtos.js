
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_relacao')) ?? [{ nomeGrupo: "", idsProdutos: [] }]
const setLocalStorage = (dbRelacao) => localStorage.setItem("db_relacao", JSON.stringify(dbRelacao))

// CRUD 
const deleteRelacao = (index) => {
    const dbRelacao = readRelacao()
    dbRelacao.splice(index, 1)
    setLocalStorage(dbRelacao)
}

const updateRelacao = (index, relacao) => {
    const dbRelacao = readRelacao()
    dbRelacao[index] = relacao
    setLocalStorage(dbRelacao)
}

const readRelacao = () => getLocalStorage()

const createRelacao = (relacao) => {
    const dbRelacao = getLocalStorage()
    dbRelacao.push(relacao)
    setLocalStorage(dbRelacao)
}

window.onload = () => {
    loadGrupos()
}

const loadGrupos = () => {
    var listGroups = document.getElementById('showGrupos');
    listGroups.innerHTML = ''
    JSON.parse(localStorage.getItem('db_grupo')).map((val) => {
        listGroups.innerHTML += `
        <a class="list-group-item list-group-item-action" id="list-` + val.nome + `-list" data-bs-toggle="list" role="tab" aria-controls="list-` + val.nome + `" onclick="selecaoGrupos()">` + val.nome + `</a>
        `
    })
}

const selecaoGrupos = () => {
    var selectedGroup = document.getElementsByClassName('active')[0].innerHTML
    loadIds()
    return selectedGroup
}

const selecaoProduto = () => {
    var checkboxes = document.querySelectorAll('.form-check-input')
    for (var checkbox of checkboxes) {
        var idsTemps = []
        let selectedGroup = document.getElementsByClassName('active')[0].innerHTML
        getLocalStorage().map(function (e) {
            if (e.nomeGrupo == selectedGroup) {
                idsTemps = e.idsProdutos
            }
        })
        checkbox.addEventListener('click', function () {
            if (this.checked == true) {
                idsTemps.push(this.value)
            } else {
                idsTemps = idsTemps.filter(e => e !== this.value)
            }
        })
    }

    document.getElementById('linkProduto').addEventListener('click', function () {

        let nomeGrupoSelected = document.getElementsByClassName('active')[0].innerHTML
        let dbRelacao = getLocalStorage()

        const itemDb = {
            nomeGrupo: nomeGrupoSelected,
            idsProdutos: idsTemps
        }

        const objIndex = dbRelacao.find(objIndex => objIndex.nomeGrupo === nomeGrupoSelected)

        if (objIndex == undefined) {
            createRelacao(itemDb)
        } else {
            updateRelacao(dbRelacao.indexOf(objIndex), itemDb)
        }
    })
}