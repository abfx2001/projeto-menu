const options = {
    method: 'POST',
    url: 'http://localhost:3000/exec_sql_servidor',
    headers: { 'Content-Type': 'application/json' },
    data: { sql: 'select * from tb_produto' }
}

const getLocalStorageM = () => JSON.parse(localStorage.getItem('db_relacao')) ?? [{ nomeGrupo: "", idsProdutos: [] }]

window.onload = () => {
    reloadMenu()
}
//mostra os grupos e produtos relacionados na página princípal do Menu
const reloadMenu = () => {
    getLocalStorageM().map(function (e) {
        if (e.nomeGrupo !== '') {
            var tabsGrupos = document.getElementById('myTab')
            tabsGrupos.innerHTML += `
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="categoria-2" data-bs-toggle="tab" data-bs-target="#tab-`+ e.nomeGrupo.replace(/\s/g, '') + `" type="button" role="tab">` + e.nomeGrupo + `</button>
            </li>
            `
            var tabGruposContent = document.getElementById('myTabContent')
            tabGruposContent.innerHTML += `
            <div class="tab-pane fade show " id="tab-`+ e.nomeGrupo.replace(/\s/g, '') + `" role="tabpanel" tabindex="">
                <div class="alert-scroll" id="`+ e.nomeGrupo + `">
                </div>
            </div>
            `
        }
    })

    reloadMenuProduto()
}

//adiciona os modais e demonstrativos dos produtos. 
const reloadMenuProduto = () => {
    axios.request(options).then(function (response) {
        const apiContent = response.data.body
        getLocalStorageM().map(function (e) {
            var produtosTabsContent = document.getElementById(e.nomeGrupo)
            for (var i = 0; i < e.idsProdutos.length; i++) {
                var filtrado = apiContent.filter(function (obj) { return obj.ID_PRODUTO == e.idsProdutos[i] })
                produtosTabsContent.innerHTML += `
                <a data-bs-toggle="modal" data-bs-target="#Modal`+ e.idsProdutos[i] + `` + e.nomeGrupo.replace(/\s/g, '') + `">
                    <div class="alert alert-white border mb-1 d-flex justify-content-between" role="alert">
                        <div>
                            `+ filtrado[0].DESCRICAO + `
                        </div>
                        <div>
                            `+ filtrado[0].UND + ` - R$: ` + filtrado[0].VL_UNITARIO + `
                        </div>
                    </div>
                </a>
                <div class="modal fade" id="Modal`+ e.idsProdutos[i] + `` + e.nomeGrupo.replace(/\s/g, '') + `">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-1" id="ModalLabel">`+ filtrado[0].DESCRICAO + `</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-8">
                                        <p>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam est veritatis omnis unde aspernatur inventore corporis 
                                            libero in quae nam. Error corrupti sit consequatur, officia aspernatur repellat excepturi facilis iure.
                                        </p>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Opcional 1...</label>
                                        </div>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Opcional 2...</label>
                                        </div>
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Opcional 3...</label>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <img src="`+ filtrado[0].URL_FOTO + `" class="card-img-top" alt="">
                                        <p>
                                            Cód. `+ filtrado[0].COD_INTERNO + `
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <p class="fs-2 position-absolute start-0 ms-3">
                                    `+ filtrado[0].UND + ` R$ ` + filtrado[0].VL_UNITARIO + `
                                </p>
                                <button type="button" class=" btn btn-success" id="btn-modal" data-bs-dismiss="modal">Adicionar ao Carrinho</button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            }
        })
    }).catch(function (error) {
        console.error(error)
    });
}