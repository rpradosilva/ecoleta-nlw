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





