// 1. LÓGICA DE APERTURA
function abrirInvitacion() {
    const sobre = document.getElementById('pantalla-sobre');
    const invitacion = document.getElementById('pantalla-invitacion');

    // sobre.classList.add('hidden');
    sobre.style.transform = 'scale(1.08)';
sobre.style.filter = 'blur(8px)';
sobre.style.opacity = '0';
    
    setTimeout(() => {
        sobre.style.display = 'none';
        invitacion.classList.remove('hidden');
        document.body.classList.add('scroll-active');
        
        iniciarAnimaciones();
        setInterval(actualizarReloj, 1000);
        setInterval(cambiarFoto, 3000);
    }, 800);
}

// 2. REVEAL AL HACER SCROLL
function iniciarAnimaciones() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(seccion => observer.observe(seccion));
}

// 3. GALERÍA FADE
let indiceFoto = 0;
function cambiarFoto() {
    const fotos = document.querySelectorAll('.foto-boda');
    const puntos = document.querySelectorAll('.punto');
    
    if (fotos.length === 0) return;

    fotos[indiceFoto].classList.remove('active');
    puntos[indiceFoto].classList.remove('active');

    indiceFoto = (indiceFoto + 1) % fotos.length;

    fotos[indiceFoto].classList.add('active');
    puntos[indiceFoto].classList.add('active');
}

// 4. RELOJ CUENTA REGRESIVA
const fechaBoda = new Date("August 8, 2026 15:30:00").getTime();

function actualizarReloj() {
    const ahora = new Date().getTime();
    const dif = fechaBoda - ahora;
    const cont = document.querySelector(".reloj-container");

    if (!cont || dif <= 0) {
        if(cont) cont.innerHTML = "¡LLEGÓ EL MOMENTO!";
        return;
    }

    const d = Math.floor(dif / (1000 * 60 * 60 * 24));
    const h = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((dif % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = d.toString().padStart(2, '0');
    document.getElementById("horas").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutos").innerText = m.toString().padStart(2, '0');
    document.getElementById("segundos").innerText = s.toString().padStart(2, '0');
}

// 5. CONTROL DE MÚSICA
function toggleMusica() {
    const audio = document.getElementById("musicaBoda");
    const icono = document.getElementById("icono-musica");

    if (audio.paused) {
        audio.play();
        icono.className = "pause-icon";
    } else {
        audio.pause();
        icono.className = "play-icon";
    }
}