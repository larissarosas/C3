var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

fetch('http://localhost:3000')
.then(data => data.json())
.then(resp => {
    for(pessoa of resp){
        L.marker([pessoa.position.latitude, pessoa.position.longitude]).addTo(mymap).bindPopup(pessoa.nome); 
    }
   
})


consultar.addEventListener('click', function (event) {
    event.preventDefault()
    var nome = document.querySelector('#nome').value;
    estouAqui(nome)
})

function estouAqui(nome) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pin)
        return true
    } else {
        x.innerHTML = "Não é possível identificar a localização"
        return false
    }
}


function pin(posicao) {
    latitude = posicao.coords.latitude
    longitude = posicao.coords.longitude
    L.marker([latitude, longitude]).addTo(mymap).bindPopup(nome.value)
    mymap.setView([latitude, longitude], 5);
}


function cadastrarForm() {
    if (consultarForm()) {
        var req = new XMLHttpRequest()
        req.open("post", "http://localhost:3000/")
        req.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        var pessoa = {
            "nome": document.forms["cadastro"]["nome"].value,
            "email": document.forms["cadastro"]["email"].value,
            "position": {
                "latitude": document.forms["cadastro"]["latitude"].value,
                "longitude": document.forms["cadastro"]["longitude"].value
            }
        }
        req.send(JSON.stringify(pessoa))
    }
    window.location.reload();
}

function consultarForm() {
    var nome = document.forms["cadastro"]["nome"].value
    var email = document.forms["cadastro"]["email"].value
    var longitude = document.forms["cadastro"]["longitude"].value
    var latitude = document.forms["cadastro"]["latitude"].value

    if (nome == "" || email == "" || longitude == "" || latitude == "") {
        alert("Preencha todos os campos solicitados abaixo");
        return false
    } else {
        return true
    }
}