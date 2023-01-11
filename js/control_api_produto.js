const options = {
    method: 'POST',
    url: 'http://localhost:3000/exec_sql_servidor',
    headers: { 'Content-Type': 'application/json' },
    data: { sql: 'select * from tb_produto' }
}

const getLocalStoragej = () => JSON.parse(localStorage.getItem('db_relacao')) ?? [{ nomeGrupo: "", idsProdutos: [] }]

//traz para a página da realação dos produtos os nome e códigos internos dos produtos vindos da API já com os produtos marcados da relação.
const loadIds = () => {
    let selectedGroup = document.getElementsByClassName('active')[0].innerHTML
    getLocalStoragej().map(function (e) {
        if (e.nomeGrupo == selectedGroup) {
            axios.request(options).then(function (response) {
                loadProdutos = () => {
                    var containerProdutos = document.getElementById('showProdutos')
                    containerProdutos.innerHTML = ''
                    response.data.body.map((val) => {
                        if (e.idsProdutos.includes(JSON.stringify(val.ID_PRODUTO))) {
                            containerProdutos.innerHTML += `
                            <div class="border border-1 mb-1 rounded">
                                <div class="form-check p-1 justify-content-start">
                                    <input class="form-check-input m-1" type="checkbox" value="`+ val.ID_PRODUTO + `" id="` + val.ID_PRODUTO + `" checked>
                                    <label class="form-check-label ms-1 d-flex justify-content-between" for="`+ val.ID_PRODUTO + `">
                                        <div>
                                            `+ val.DESCRICAO + `
                                        </div>
                                        <div>
                                            Cod. `+ val.COD_INTERNO + `
                                        </div>
                                    </label>
                                </div>
                            </div>
                            `
                        } else {
                            containerProdutos.innerHTML += `
                            <div class="border border-1 mb-1 rounded">
                                <div class="form-check p-1 justify-content-start">
                                    <input class="form-check-input m-1" type="checkbox" value="`+ val.ID_PRODUTO + `" id="` + val.ID_PRODUTO + `">
                                    <label class="form-check-label ms-1 d-flex justify-content-between" for="`+ val.ID_PRODUTO + `">
                                        <div>
                                            `+ val.DESCRICAO + `
                                        </div>
                                        <div>
                                            Cod. `+ val.COD_INTERNO + `
                                        </div>
                                    </label>
                                </div>
                            </div>
                            `
                        }
                    })
                }
                loadProdutos()
                selecaoProduto()
            }).catch(function (error) {
                console.error(error)
            });
        }
        if (e.idsProdutos == '') {
            loadGrupoVazio()
        }
    })
}

//traz uma a lista dos produtos sem marcação, pois ainda não tem uma relação.
const loadGrupoVazio = () => {
    axios.request(options).then(function (response) {
        var containerProdutosB = document.getElementById('showProdutos')
        containerProdutosB.innerHTML = ''
        response.data.body.map((val) => {
            containerProdutosB.innerHTML += `
            <div class="border border-1 mb-1 rounded">
                <div class="form-check p-1 justify-content-start">
                    <input class="form-check-input m-1" type="checkbox" value="`+ val.ID_PRODUTO + `" id="` + val.ID_PRODUTO + `">
                    <label class="form-check-label ms-1 d-flex justify-content-between" for="`+ val.ID_PRODUTO + `">
                        <div>
                            `+ val.DESCRICAO + `
                        </div>
                        <div>
                            Cod. `+ val.COD_INTERNO + `
                        </div>
                    </label>
                </div>
            </div>
            `
        })
        selecaoProduto()
    }).catch(function (error) {
        console.error(error)
    })
    selecaoProduto()
}