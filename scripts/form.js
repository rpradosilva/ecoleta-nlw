// Rodar Estados
populateUfs()

// Quando Alterar o estado
document
    .querySelector("[name=uf]")
    .addEventListener("change", getCities)
    // Importar Estados

function populateUfs() {
    const ufSelect = document.querySelector("[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

// Importar Cidades com base nos estados
function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=ufname]")

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`)
        .then(res => res.json())
        .then(states => {
            for (state of states) {
                citySelect.innerHTML += `<option value="${state.nome}">${state.nome}</option>`
            }
            citySelect.disabled = false
        })
}

// Selecionar opções de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")
for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// Adicionar ou remover seleção
let selectedItems = []
const collectedItems = document.querySelector("[name=items]")

function handleSelectedItem(event) {
    const itemLi = event.target
    const itemId = itemLi.dataset.id

    itemLi.classList.toggle("selected")

    const alreadySelected = selectedItems.findIndex(
        item => item == itemId
    )
    if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(
            item => item != itemId
        )
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems

}