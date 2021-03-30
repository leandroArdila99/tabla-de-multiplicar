document.writeln("Bienbenidos a nuestro supermercado" + "<br>");

var info="  para tu cocina y para toda tu familia";
var atencion="  las 07:00am hasta las 08:00pm";

document.writeln("Aca encontraras todo lo que necesitas" + info +"<br>" +"Nos encontraras desde" + atencion );

function mostrar(info, atencion){
    document.writeln("<br>" + "Hola" + " "+ info + " "+ "tu edad es:" + " "+ atencion);

}
mostrar("juan valdes", 50);

function get(numbre) {
    fetch("http://127.0.0.1:3001/table/" + numbre).then(data => {
        window.location.replace('./productos.html')
    });
}

async function readTable() {
    await fetch("http://127.0.0.1:3001/table")
        .then(response => response.json())
        .then(data => {
            var text = '';
            console.log(data)
            for (item in data) {
                text = text + data[item] + '<br/>'
            }
            console.log(text)
            document.getElementById('tabled').innerHTML = text;
        });
}

function data() {
    var number = document.getElementById('numm').value;
    if (number > 0) {
        get(number);
    } else {
        alert('el numero debe ser mayor a cero');
    }
}
