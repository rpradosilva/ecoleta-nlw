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

populateUfs()

document
    .querySelector("[name=uf]")
    .addEventListener("change", getCities)



const itemsToCollect = document.querySelectorAll(".items-grid li")
for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

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


//console.log(alreadySelected)

/*


const urlAPI = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"
const ufInput = document.querySelector("[name=ufname]")

function consultAPI(url, dataType) {
    const dataTypeSelect = document.querySelector(`[name=${dataType}]`)

    fetch(url)
        .then(res => res.json())
        .then(items => {
            for (const item of items) {
                dataTypeSelect.innerHTML += `<option value="${item.id}">${item.nome}</option>`
            }
            if (dataType == "city") {
                dataTypeSelect.disabled = false
            } else {
                document.addEventListener("change", () => {
                    const indexOfSelectedState = event.target.selectedIndex
                    ufInput.value = event.target.options[indexOfSelectedState].text
                    consultAPI(`${urlAPI}${event.target.value}/municipios`, "city")
                })
            }
        })

}

consultAPI(urlAPI, "uf")

*/



