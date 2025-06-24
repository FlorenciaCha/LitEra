"use strict"
var maximo=600;
var bucle;
var velocidadRapida = false;

var medio, reproducir, pausa, play, barra, progreso, retroceder, adelantar, subir, bajar, mute, velocidad, detener;
let botonTema;
var volumenAnterior = 1; //volumen por defecto
function iniciar() {
    medio=document.getElementById('medio');
    reproducir=document.getElementById('reproducir'); //boton play
    pausa = document.getElementById('pausa'); //boton pausa
    play =document.getElementById('iconoPlay');
    barra=document.getElementById('barra');
    progreso=document.getElementById('progreso');
    retroceder = document.getElementById('retroceder');
    adelantar = document.getElementById('adelantar');
    subir = document.getElementById('subirVolumen');
    bajar = document.getElementById('bajarVolumen');
    mute = document.getElementById('mute');
    velocidad = document.getElementById('velocidad');
    detener = document.getElementById('detener');
    botonTema = document.getElementById('cambiarTema');

    reproducir.addEventListener('click', presionar, false);
    barra.addEventListener('click', mover, false);
    retroceder.addEventListener('click', retroceder10s, false);
    adelantar.addEventListener('click', adelantar10s, false);
    subir.addEventListener('click', subirVolumen, false);
    bajar.addEventListener('click', bajarVolumen, false);
    mute.addEventListener('click', toggleMute, false);
    velocidad.addEventListener('click', toggleVelocidad, false);
    detener.addEventListener('click', detenerVideo, false);
    botonTema.addEventListener('click', cambiarTema, false);    
}
function presionar(){
    if(!medio.paused && !medio.ended) {
        medio.pause();
        play.innerHTML='play_circle';
        window.clearInterval(bucle);
    }else{
        medio.playbackRate = velocidadRapida ? 4 : 1;
        medio.play();
        play.innerHTML='pause';
        bucle=setInterval(estado, 1000);
    }
}
function estado(){
    if(!medio.ended){
        //var total=parseInt(medio.currentTime*maximo/medio.duration);
        var total = Math.min(maximo, parseInt(medio.currentTime * maximo / medio.duration));

        progreso.style.width=total+'px';
    }else{
        progreso.style.width='0px';
        //reproducir.innerHTML='play_circle'; // vuelve al ícono play cuando termina
        play.innerHTML = 'play_circle';
        window.clearInterval(bucle);
    }
}
function mover(e){
    if(!medio.paused && !medio.ended){
        var ratonX=e.pageX-barra.offsetLeft;
        var nuevoTiempo=ratonX*medio.duration/maximo;
        medio.currentTime=nuevoTiempo;
        progreso.style.width=ratonX+'px';
    }
}

function retroceder10s(){
    medio.currentTime = Math.max(0, medio.currentTime - 10);
}

function adelantar10s(){
    medio.currentTime = Math.min(medio.duration, medio.currentTime + 10);
}

function subirVolumen() {
    medio.volume = Math.min(1, medio.volume + 0.2);
}

function bajarVolumen() {
    medio.volume = Math.max(0, medio.volume - 0.2);
}


function toggleMute() {
    if (medio.volume > 0) {
        volumenAnterior = medio.volume;
        medio.volume = 0;
        document.getElementById('iconoMute').innerHTML = 'volume_off';
    } else {
        medio.volume = volumenAnterior;
        document.getElementById('iconoMute').innerHTML = 'volume_up';
    }
}


function toggleVelocidad() {
    var botonVel = document.getElementById('velocidad');
    var iconoVel = document.getElementById('iconoVelocidad');

    velocidadRapida = !velocidadRapida;

    medio.playbackRate = velocidadRapida ? 4 : 1;

    if (velocidadRapida) {
        botonVel.classList.add('activo');
        iconoVel.innerHTML = 'speed';
    } else {
        botonVel.classList.remove('activo');
        iconoVel.innerHTML = 'speed_2x';
    }
}


function detenerVideo() {
    medio.pause();
    medio.currentTime = 0;
    play.innerHTML = 'play_circle';
    progreso.style.width = '0px';
    window.clearInterval(bucle);
}


var tema = 1; // 1 = oscuro, 2 = claro

function cambiarTema() {
    const contenedor = document.querySelector('.contenedor-reproductor');
    const icono = document.getElementById('iconoTema');

    const temas = {
    1: { // tema claro
        '--color1': '#f2f2f2',
        '--color2': '#ffffff',
        '--color3': '#abbfe2',
        '--color4': '#cce6ff',
        '--color5': '#546BB9',
        '--color6': '#000000',
        '--colorFondo': '#ffffff', 
        '--colorTexto': '#000000'
    },
    2: { // tema oscuro
        '--color1': '#546BB9',
        '--color2': '#8194d5',
        '--color3': '#abbfe2',
        '--color4': '#fbd8bf',
        '--color5': '#fdb9b1',
        '--color6': '#f2f2f2',
        '--colorFondo': '#546BB9', 
        '--colorTexto': '#f2f2f2'
    }
};

    tema = (tema === 1) ? 2 : 1;
    const nuevo = temas[tema];

    if (tema === 1) {
        nuevo['--colorIconoTema'] = '#546BB9';
    } else {
        nuevo['--colorIconoTema'] = '#f2f2f2';
    }

    for (let propiedad in nuevo) {
        contenedor.style.setProperty(propiedad, nuevo[propiedad]);
    }

    icono.innerHTML = (tema === 1) ? 'light_mode' : 'dark_mode';
}




window.addEventListener('load', iniciar, false);