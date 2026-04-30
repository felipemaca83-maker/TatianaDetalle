// --- CONFIGURACIÓN GLOBAL ---
window.onload = () => {
  crearParticulas();
};

// --- NAVEGACIÓN ENTRE PANTALLAS ---
function siguientePantalla(n) {
  const actuales = document.querySelectorAll('.pantalla');
  actuales.forEach(p => {
    p.classList.remove('activa');
    p.style.display = 'none';
  });

  const proxima = document.getElementById('pantalla' + n);
  if (proxima) {
    proxima.classList.add('activa');
    proxima.style.display = 'flex';
  }

  // Activar música al entrar a los carruseles (Pantalla 3)
  if (n === 3) {
    reproducirMusica();
  }
}

// --- LÓGICA DE MÚSICA ---
function reproducirMusica() {
  const audio = document.getElementById("backgroundAudio");
  if (audio && audio.paused) {
    audio.volume = 0;
    audio.play().then(() => {
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 150);
    }).catch(err => console.error("Error audio:", err));
  }
}

// --- LÓGICA DE CARRUSELES ---
document.querySelectorAll(".carrusel-seccion").forEach(seccion => {
  const slides = seccion.querySelectorAll(".slide");
  const dotsContainer = seccion.querySelector(".dots");
  let current = 0;

  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("activa");
      dotsContainer.appendChild(dot);
    });
  }

  const actualizarDots = () => {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((d, i) => d.classList.toggle("activa", i === current));
  };

  seccion.addEventListener("click", (e) => {
    if (e.target.closest('.btn-generic')) return;

    if (current < slides.length - 1) {
      slides[current].classList.remove("activa");
      current++;
      slides[current].classList.add("activa");

      // 1. Obtenemos el número de sección actual desde el atributo data
      const numSeccion = seccion.getAttribute('data-seccion');

      // 2. Definimos los textos por sección
      const textosPorSeccion = {
        "1": ["Aqui va una indicacion", "💬", "Y pensar que nuestra vida cambió con un solo \"Hola\"... 💬", "Desde ese instante, sin saberlo, algo mágico empezó a crecer.", "Nuestras charlas se volvieron refugio y nuestra historia comenzó a escribirse.", "Poco a poco, esa conexión se hizo más fuerte que la distancia y el tiempo.", "Y sin entenderlo del todo en ese momento... El destino ya nos estaba trazando el camino para encontrarnos. ❤️", "Aquel cuento que leímos... esa historia que nos hizo detenernos a pensar."],
        "2": [
          "Esa primera vez que vibramos al mismo ritmo, entre luces y música.",       // Concierto
          "Descubrimos que los momentos más sencillos eran nuestros favoritos...",    // Picnic 1
          "Días de sol, tranquilidad y esa paz que solo sentía estando a tu lado.",    // Picnic 2
          "Poco a poco, el 'tú' y el 'yo' se fue transformando en un 'nosotros'.",    // Picnic 3
          "Compartiendo risas, cenas y confesiones que nos hacían más cercanos.",      // Restaurante
          "Aún no había etiquetas, pero mi corazón ya sabía que eras tú. ❤️"          // Cierre sección
        ],
        "3": [
          "Y por fin, el 'nosotros' se hizo oficial ante el mundo... 🥂",          // Foto 1: Beso restaurante
          "Ver tu sonrisa iluminarse con ese detalle fue mi mejor regalo. 💐",    // Foto 2: Ella con flores
          "Un momento que guardaré siempre como el inicio de lo mejor.",          // Foto 3: Beso y ramo
          "Porque no importa el lugar, si es contigo, el paisaje es perfecto.",    // Foto 4: Beso otro lugar
          "Admiro todo de ti, y me hace feliz ser quien cuide de tu alegría.",    // Foto 5: Beso mejilla
          "En la cercanía de tus besos encontré mi lugar favorito en el mundo.",  // Foto 6: Beso corto
          "Buscando siempre mil formas de recordarte lo especial que eres... ✨", // Foto 7: Él con flores (espalda)
          "Porque somos un equipo único, en este y en cualquier universo. ¡Te elijo a ti! ❤️" // Foto 8: Pokémon
        ],
      };

      // 3. Buscamos el span específico DE ESTA SECCIÓN
      const textoContenedor = seccion.querySelector(".info-slide-externo span");

      if (textoContenedor && textosPorSeccion[numSeccion]) {
        textoContenedor.style.opacity = 0;
        setTimeout(() => {
          // Usamos el array de textos que corresponda a esta sección
          textoContenedor.textContent = textosPorSeccion[numSeccion][current];
          textoContenedor.style.opacity = 1;
        }, 200);
      }

      actualizarDots();
    }
  });

  const btn = seccion.querySelector(".siguiente-carrusel");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const nextElement = seccion.nextElementSibling;
      if (nextElement && nextElement.classList.contains('carrusel-seccion')) {
        seccion.style.display = "none";
        nextElement.classList.add("visible");
        nextElement.style.display = "flex";
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});

const videoEspecial = document.getElementById('videoIntermedio');
const btnSiguiente = document.getElementById('btnVideoSiguiente');

// Detectar cuando el video termina
videoEspecial.onended = function () {
  btnSiguiente.style.display = "block"; // Mostramos el botón
  btnSiguiente.classList.add("fadeInAnim"); // Una pequeña animación de entrada
};

// Opcional: Si quieres que el video se reproduzca solo cuando entren a esa sección
function checkVideoPlay(n) {
  if (n === 3) {
    videoEspecial.play();
  } else {
    videoEspecial.pause();
    videoEspecial.currentTime = 0; // Reiniciar si salen de la sección
  }
}

// --- TRANSICIÓN A PANTALLA FINAL (VIDEO) ---
function irAlFinal() {
  document.getElementById('pantalla3').style.display = 'none';
  const p4 = document.getElementById('pantalla4');
  p4.classList.add('activa');
  p4.style.display = 'flex';
  iniciarTexto();
}

// --- EFECTO MÁQUINA DE ESCRIBIR ---
function iniciarTexto() {
  const messageText = `En definitiva... 

Nuestra historia es mi favorita. ✨ 

Todo empezó en ese salón de clases, entre apuntes y risas compartidas, sin imaginar que el destino nos estaba sentando en el mismo camino. Fuimos mejores amigos, el apoyo del otro cuando el mundo afuera parecía complicado. 

Pasamos por tormentas, sanamos heridas de pasados que dolieron y nos acompañamos en el proceso de volver a encontrarnos a nosotros mismos. 

Pero el destino es curioso... y una noche, entre copas y risas, esos celos inesperados nos delataron. Fue el momento en que nuestras miradas cambiaron y entendimos que lo que sentíamos ya no cabía en la palabra "amistad". 🥰

Desde ahí, cada salida, cada concierto, cada picnic y cada detalle se volvió un motivo más para elegirte. Gracias por ser mi lugar seguro, por transformar los días grises en momentos llenos de color y por permitirme escribir este cuento contigo. 🫶🏽

Te quiero, hoy y siempre. ❤️`;

  const messageEl = document.getElementById("message");
  messageEl.textContent = "";
  let i = 0;

  function typeMessage() {
    if (i < messageText.length) {
      let char = messageText.charAt(i);
      messageEl.textContent += char;
      i++;

      let delay = 50;
      if (",".includes(char)) delay = 400;
      if (".✨😍💪🏼🥰🤭🫶🏽💕😎".includes(char)) delay = 800;
      if ("\n".includes(char)) delay = 600;

      setTimeout(typeMessage, delay);
      const container = messageEl.parentElement;
      container.scrollTop = container.scrollHeight;
    } else {
      document.getElementById("readButton").style.display = "inline-block";
    }
  }
  setTimeout(typeMessage, 1000);
}

// --- PANTALLAS DE CIERRE ---
function finishMessage() {
  document.getElementById("pantalla4").style.display = "none";
  const p5 = document.getElementById("pantalla5");
  p5.classList.add("activa");
  p5.style.display = "flex";

  setTimeout(() => {
    p5.style.display = "none";
    const p6 = document.getElementById("pantalla6");
    p6.classList.add("activa");
    p6.style.display = "flex";
  }, 7000);
}

function cerrarProyecto() {
  console.log("Botón finalizar presionado");
  alert("Gracias por leer hasta el final. ¡Te quiero mucho! ❤️");
}

// --- SISTEMA DE PARTÍCULAS ---
function crearParticulas() {
  const container = document.body;
  for (let i = 0; i < 150; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = (Math.random() * 3 + 1) + 'px';
    p.style.width = size;
    p.style.height = size;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.opacity = Math.random();
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
}