$(document).ready(()=> getData())

const baseUrlApi = "https://api.coincap.io/v2/assets"


function getData(criptoName){

    let url = baseUrlApi

    if(criptoName){
        url += `/${criptoName}`
        $("#page2").show()
        $("#page1").hide()
    } else {
        showPage1()
    }

    $.ajax({
        url: url,
        type: 'GET'
    })
    .fail(function(msg){
                
        if(msg.statusText == "error"){
            $('#mymodal').modal('show')
            $('#modal-message').html("Digite uma criptomoeda válida!")
            showPage1()
        }
    })
    .done(function(data){
        if(criptoName){
            formatCripto(data)
        }else{
            formatCriptos(data)
        }
    })
    
}

function showPage1(){
    $(".titleCard").empty()
    $("#page2").hide()
    $("#page1").show()
}

function formatCripto(cripto){

    const formattedCripto = getCripto(cripto.data)

    const title = `<h5 class="card-title"> ${formattedCripto.symbol} - ${formattedCripto.name}<h5>`
    const price = `<h5 class="card-title">Preço: $${parseFloat(formattedCripto.price).toFixed(2)}</h5>`
    const percent = `<h5 class="card-title">Variação de 24H: ${parseFloat(formattedCripto.changePercent24Hr).toFixed(2)}%</h5>`
    const btn = `<a class='btn btn-primary' target='_blank' href=${ formattedCripto.explorer }>Mais informações</a>`

    clearCard()

    $("#title").html(title)
    $(".card-body").html(price+percent+btn)

}

function clearCard(){
    $(".titleCard").empty()
    $(".card-body").empty()
}

function formatCriptos(data){
    let criptoList = []

    for(let i=0; i < data.data.length; i++){ 
        criptoList.push(getCripto(data.data[i]))
    }
    showCripto(criptoList)
}

function getCripto(cripto){
    return {
        name: cripto.name,
        symbol: cripto.symbol,
        price: cripto.priceUsd,
        changePercent24Hr: cripto.changePercent24Hr,
        explorer: cripto.explorer
    }
}

function showCripto(criptos){
    
    for(let i=0; i< criptos.length; i++){
        
        const btn = `<a class='btn btn-primary' target='_blank' href=${ criptos[i].explorer }>Acessar</a>`
        const price = `${parseFloat(criptos[i].price).toFixed(2)}`
        const change = `${parseFloat(criptos[i].changePercent24Hr).toFixed(2)}`

        $("#user-data").append(`<tr>` +
                                    `<td>` + criptos[i].name + `</td>` +
                                    `<td>` + criptos[i].symbol + `</td>` +
                                    `<td>` + price + `</td>` +
                                    `<td>` + change + `% </td>` + 
                                    `<td>` + btn + `</td>` + 
                            + `</tr>`)
    }
}

function verificarExist(criptoName){

}

$("#search").click(function(){
 
    const criptoname = $("input").val()
 
    if(criptoname){  
        getData(criptoname)
        $("input").val("")
    } else {
        $("#mymodal").modal("show")
        $("#modal-message").html("Digite uma criptomoeda válida!")
    }
})

$("#home").click(function(){
    showPage1()
})