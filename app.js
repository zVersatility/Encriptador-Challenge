var txtTareaEntrada = document.getElementById('textareaIngresaTexto');
var txtTareaSalida = document.getElementById('txttareaDevuelveTexto');

var imagenEncriptar = document.getElementById('imagenEncripta');
var divParrafosAside = document.getElementById('div__parrafos__aside');
var botonCopiar = document.getElementById('botonCopiar');
var mensajeCopiado = document.getElementById('spanCopiado');

function validarTexto() {
    let txtTexto = txtTareaEntrada.value.trim();

    if (txtTexto === "") {
        alert("No hay nada para encriptar");
        return false;
    } else {
        let caracteresAcentos = /[áéíóúÁÉÍÓÚñÑüÜ]/;
        let caracteresEspeciales = /[!@#\$%\^&\*\(\)_\+\-\=\{\}\[\]\|\\:;'",<>\.\?\/¿?]/;
        let caracteresPermitidos = /^[a-z\s]+$/;
        let caracteresNumeros = /\d/;
        let caracteresEmojis = /[\u{1F600}-\u{1F64F}]/u;
        let contieneVocal = /[aeiou]/;

        if (caracteresAcentos.test(txtTexto)) {
            alert("No se permiten acentos");
            return false;
        } else if (caracteresEspeciales.test(txtTexto)) {
            alert("No se permiten caracteres especiales");
            return false;
        } else if (caracteresNumeros.test(txtTexto)) {
            alert("No se permiten números");
            return false;
        } else if (caracteresEmojis.test(txtTexto)) {
            alert("No se permiten emojis");
            return false;
        } else if(!caracteresPermitidos.test(txtTexto)){
            alert("No se permiten mayúsculas");
            return false;
        } else if (!contieneVocal.test(txtTexto)) {
            alert("El texto ingresado no es valido");
            return false;
        }
        return true;
    }
}



function modificarElementos(){

    imagenEncriptar.style.display='none';
    divParrafosAside.style.display='none';
    txtTareaSalida.style.display='block';
    botonCopiar.style.display='block';
    
}

function modificarElementosCopiar(){

    txtTareaSalida.style.display="none"
    mensajeCopiado.style.display="block";
    txtTareaSalida.value="";
    botonCopiar.style.display="none";
    imagenEncriptar.style.display="block";

}

function encriptarTexto(){

   if(validarTexto()){

    modificarElementos();

    let entrada = txtTareaEntrada.value;

    let remplazos = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    for (let key in remplazos) {
        let regex = new RegExp(key, 'g');
        entrada = entrada.replace(regex, remplazos[key]);
    }

   txtTareaSalida.value=entrada;
   txtTareaEntrada.value="";
   

   }
}

function desencriptarTexto(){

    let entrada = txtTareaEntrada.value;

    if(validarTexto()){

        modificarElementos();

        let remplazos = {
            'enter': 'e',
             'imes': 'i',
             'ai'  : 'a',
             'ober': 'o',
             'ufat': 'u'
        };

        for (let key in remplazos) {
            let regex = new RegExp(key, 'g');
            entrada = entrada.replace(regex, remplazos[key]);
        }
    
       txtTareaSalida.value=entrada;
       txtTareaEntrada.value="";

    } 


}

function CopiarTexto(){

    txtTareaSalida.select();
    txtTareaSalida.setSelectionRange(0,99999);

    navigator.clipboard.writeText(txtTareaSalida.value).then(function(){

     
        modificarElementosCopiar();


        setTimeout(function(){
            mensajeCopiado.style.display="none";
            divParrafosAside.style.display="block";
           
        },2000 );

        

    }, function(err){
        alert("Error al copiar el texto : ", err);
    });

   


}



    
