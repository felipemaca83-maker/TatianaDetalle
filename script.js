// --- CONFIGURACIÓN GLOBAL ---
window.onload = () => {
  crearParticulas();
};

function siguientePantalla(n) {
  reproducirMusica();
  const actuales = document.querySelectorAll('.pantalla');
  actuales.forEach(p => {
    p.classList.remove('activa');
    p.style.display = 'none';
  });

  const proxima = document.getElementById('pantalla' + n);
  if (proxima) {
    proxima.classList.add('activa');
    proxima.style.display = 'flex';

    // --- EL TRUCO ESTÁ AQUÍ ---
    if (n === 4) {
      // Si entramos a la pantalla 4, esperamos un segundo y arrancamos las letras
      setTimeout(iniciarTexto, 500);
    }

    if (n === 5) {
      // Si entramos a la 5, activamos el contador de días
      setInterval(actualizarContador, 1000);
    }
  }
}

// --- LÓGICA DE MÚSICA ---
function reproducirMusica() {
  const audio = document.getElementById("backgroundAudio");
  if (audio && audio.paused) {
    audio.volume = 0; // Empezamos en silencio
    audio.play().then(() => {
      // Efecto de subida gradual (Fade In)
      let vol = 0;
      const fadeIn = setInterval(() => {
        if (vol < 0.4) { // Volumen máximo 40%
          vol += 0.05;
          audio.volume = vol;
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }).catch(err => {
      // Esto solo pasará si el usuario no ha tocado nada aún
      console.log("Esperando interacción para sonar...");
    });
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
        "1": [
          "Esas primeras noches donde el mundo se detenía entre luces y música. ✨", // Foto 1: Beso discoteca
          "Nuestra complicidad siempre fue nuestra mejor cara. 🤪",                 // Foto 2: Caritas discoteca
          "Repitiendo lugares, pero creando momentos totalmente nuevos.",          // Foto 3: Discoteca otra fecha
          "Gozando de fiestas y risas, con el corazón más feliz que nunca. 🎤", // Foto 4: Concierto/Feria
          "Tu espejo sabe bien cuántas sonrisas me robaste desde el principio. 🤳✨", // Foto 5: Espejo habitación
          "Citas sencillas, hamburguesas y la mejor compañía del universo.",       // Foto 6: Restaurante
          "Nuestro primer cierre de año... y el inicio de nuestra vida juntos. ❤️"        // Foto 7: Primer 31 de diciembre
        ],
        "2": [
          "Celebrar mi vida fue el mejor regalo que me dio ese año. 🎂",             // Foto 1: Cumpleaños de él
          "Un año más para ti, pero esta vez, con el amor de mi vida al lado. ✨",          // Foto 2: Cumpleaños de ella
          "Bajo el calor del Valle, descubriendo que cualquier lugar es perfecto contigo.", // Foto 3: Cali
          "Otro diciembre sumando momentos y brindando por nosotros. 🥂",           // Foto 4: Segundo diciembre
          "Cruzando fronteras y coleccionando sellos en el corazón. 🇪🇨",            // Foto 5: Límite Ecuador
          "Aventureros por naturaleza, cómplices por elección.",                    // Foto 6: Ecuador
          "Caminando la capital, sintiendo que el frío de Bogotá no existía si me dabas la mano. 🏙️", // Foto 7: Bogotá Plaza
          "Tocando el cielo en Monserrate, pero sintiendo los pies en la tierra porque estaba a tu lado. ✨",
          "Momentos que se vuelven hogar, compartiendo lo que más queremos. 🏡",      // Foto 9: Selfie con los suegros (campo)
          "Tú, yo y la paz de estar donde pertenecemos. ❤️",                        // Foto 10: Selfie solos (campo)
          "Donde el mar nos susurró que esto era para siempre. 🌊",                  // Foto 11: Playa Tumaco
          "Besos con sabor a sal y arena, en nuestro paraíso personal. 💋",          // Foto 12: Beso Tumaco
          "Cerrando capítulos en el lago Calima, agradecido por cada aventura a tu lado. ⛵" // Foto 13: Lago Calima
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

// --- LÓGICA DEL VIDEO DE PROPUESTA ---
const videoIntermedio = document.getElementById('videoIntermedio');
const btnVideoSiguiente = document.getElementById('btnVideoSiguiente');

if (videoIntermedio) {
  videoIntermedio.onended = function () {
    btnVideoSiguiente.style.display = "block";
    btnVideoSiguiente.scrollIntoView({ behavior: 'smooth' });
  };
}

// Esta es la función que debe llamar el botón del video
function avanzarALaSeccion4() {
  videoIntermedio.pause();
  siguientePantalla(4); // Salta directamente a la carta
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
  const messageText = `Mirar atrás es ver cuánto hemos construido. \n\n
Empezamos siendo dos tormentas que chocaban, con temperamentos iguales y miedos que a veces nos hacían dudar. \n\n
Perdimos la cuenta de las veces que las lágrimas ganaron y de los momentos en que parecía que el orgullo nos separaría.\n\n` +
    `Pero tú, que decías que nunca buscarías a nadie, terminaste siendo la razón por la que yo decidí cambiarlo todo. \n\n
Dejé atrás las noches vacías por la paz de despertar a tu lado. Cambié mi mundo porque entendí que ningún lugar es mejor que nuestro hogar.\n\n` +
    `Hoy, ver nuestro hogar, construyéndolo con esfuerzo, nuestras cosas compradas a pulso y saber que somos equipo, en cada fiesta familiar y en cada viaje, es mi mayor orgullo. \n\n` +
    `Gracias por no rendirte cuando éramos difíciles, por ayudarme a ser mi mejor versión y por construir este "nosotros" que hoy es inquebrantable. \n\n` +
    `Te amo para siempre. ❤️`;

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

  // --- DETENER LA MÚSICA ---
  const audio = document.getElementById("backgroundAudio");
  if (audio) {
    // Bajamos el volumen gradualmente para que no sea un corte brusco
    let vol = audio.volume;
    const fadeOut = setInterval(() => {
      if (vol > 0.05) {
        vol -= 0.05;
        audio.volume = vol;
      } else {
        clearInterval(fadeOut);
        audio.pause(); // Detiene la reproducción
        audio.currentTime = 0; // Reinicia la canción al segundo 0
      }
    }, 100);
  }

  // Mensaje final
  alert("Eres mi mejor decisión, hoy y siempre. ❤️");

  // Opcional: Si quieres que la página se reinicie o se cierre
  // window.location.reload(); 
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
function actualizarContador() {
  const fechaInicio = new Date('2022-01-30T00:00:00');
  const ahora = new Date();

  const diferencia = ahora - fechaInicio;

  // Cálculos de tiempo
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  // Formato de salida
  const contadorHTML = `
        <div class="contador-container">
            <span class="dias-grande">${dias} días</span>
            <div class="tiempo-detalle">
                ${horas}h ${minutos}m ${segundos}s
            </div>
            <p class="contador-leyenda">Escribiendo nuestra historia desde el 30.01.2022</p>
        </div>
    `;

  const contenedor = document.getElementById('contador-amor');
  if (contenedor) {
    contenedor.innerHTML = contadorHTML;
  }
}

// Actualizar cada segundo para que se vea el movimiento
setInterval(actualizarContador, 1000);