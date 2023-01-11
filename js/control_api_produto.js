const options = {
    method: 'POST',
    url: 'http://localhost:3000/exec_sql_servidor',
    headers: { 'Content-Type': 'application/json' },
    data: { sql: 'select * from tb_produto' }
}

const getLocalStoragej = () => JSON.parse(localStorage.getItem('db_relacao')) ?? [{ nomeGrupo: "", idsProdutos: [] }]

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
            testefuncao()
        }
    })
}

const testefuncao = () => {
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









// const loadIds = () => {
//     let selectedGroup = document.getElementsByClassName('active')[0].innerHTML
//     getLocalStoragej().map(function (e) {
//         if (e.nomeGrupo == selectedGroup) {
//             for (var i = 0; i < getLocalStoragej().length; i++) {
//                 if (getLocalStoragej()[i].nomeGrupo === selectedGroup) {
//                     var auxIds = getLocalStoragej()[i].idsProdutos
//                     axios.request(options).then(function (response) {
//                         loadProdutos = () => {
//                             var containerProdutosa = document.getElementById('showProdutos');
//                             containerProdutosa.innerHTML = ''
//                             response.data.body.map((val) => {
//                                 //aqui é para trazer já marcado os produtos da relaçao de cada grupo
//                                 let isselected = ''

//                                 // if (val.ID_PRODUTO == '-999') {
//                                 //     isselected = 'checked'
//                                 // }
//                                 for (var j = 0; j < auxIds.length; j++) {
//                                     if (val.ID_PRODUTO == auxIds[j]) {
//                                         isselected = 'checked'
//                                     }

//                                 }
//                                 containerProdutosa.innerHTML += `
//                                 <div class="border border-1 mb-1 rounded">
//                                     <div class="form-check p-1 justify-content-start">
//                                         <input class="form-check-input m-1" type="checkbox" value="`+ val.ID_PRODUTO + `" id="` + val.ID_PRODUTO + `" ` + isselected + `>
//                                         <label class="form-check-label ms-1 d-flex justify-content-between" for="`+ val.ID_PRODUTO + `">
//                                             <div>
//                                                 `+ val.DESCRICAO + `
//                                             </div>
//                                             <div>
//                                                 Cod. `+ val.ID_PRODUTO + `
//                                             </div>
//                                         </label>
//                                     </div>
//                                 </div>
//                                 `;
//                                 // mostra os produtos resgatados da API
//                             })
//                         }
//                         //loadGrupos()
//                         loadProdutos()
//                         //selecaoProduto()

//                     }).catch(function (error) {
//                         console.error(error)
//                     });
//                 } else {
//                     axios.request(options).then(function (response) {
//                         loadProdutos = () => {
//                             var containerProdutos = document.getElementById('showProdutos');
//                             containerProdutos.innerHTML = ''
//                             response.data.body.map((val) => {
//                                 //aqui é para trazer já marcado os produtos da relaçao de cada grupo
//                                 let isselected = ''
//                                 // mostra os produtos resgatados da API
//                                 containerProdutos.innerHTML += `
//                                 <div class="border border-1 mb-1 rounded">
//                                     <div class="form-check p-1 justify-content-start">
//                                         <input class="form-check-input m-1" type="checkbox" value="`+ val.ID_PRODUTO + `" id="` + val.ID_PRODUTO + `" ` + isselected + `>
//                                         <label class="form-check-label ms-1 d-flex justify-content-between" for="`+ val.ID_PRODUTO + `">
//                                             <div>
//                                                 `+ val.DESCRICAO + `
//                                             </div>
//                                             <div>
//                                                 Cod. `+ val.ID_PRODUTO + `
//                                             </div>
//                                         </label>
//                                     </div>
//                                 </div>
//                                 `;
//                             })
//                         }
//                         //loadGrupos()
//                         loadProdutos()
//                         //selecaoProduto()

//                     }).catch(function (error) {
//                         console.error(error)
//                     });
//                 }
//             }
//         }
//     })


// }

// getLocalStoragej().map(function (e) {
//     //console.log(e.idsProdutos)
//     for (var i = 0; i < getLocalStoragej().length + 1; i++) {
//         console.log(e.idsProdutos[i])
//         //console.log(selection)
//     }
// })


// axios.request(options).then(function (response) {
//     loadProdutos = () => {
//         var containerProdutos = document.getElementById('showProdutos');
//         response.data.body.map((val) => {
//             //aqui é para trazer já marcado os produtos da relaçao de cada grupo
//             let isselected = ''

//             // if (val.ID_PRODUTO == '-999') {
//             //     isselected = 'checked'
//             // }
//             // mostra os produtos resgatados da API
//             containerProdutos.innerHTML += `
//             <div class="border border-1 mb-1 rounded">
//                 <div class="form-check p-1 justify-content-start">
//                     <input class="form-check-input m-1" type="checkbox" value="`+ val.ID_PRODUTO + `" id="` + val.ID_PRODUTO + `" ` + isselected + `>
//                     <label class="form-check-label ms-1 d-flex justify-content-between" for="`+ val.ID_PRODUTO + `">
//                         <div>
//                             `+ val.DESCRICAO + `
//                         </div>
//                         <div>
//                             Cod. `+ val.ID_PRODUTO + `
//                         </div>
//                     </label>
//                 </div>
//             </div>
//             `;
//         })
//     }
//     //loadGrupos()
//     loadProdutos()
//     //selecaoProduto()

// }).catch(function (error) {
//     console.error(error)
// });