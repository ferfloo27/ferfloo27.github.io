# Portafolio — Fernando Calle Gonzales

Portafolio personal de una sola página hecho con **HTML, CSS y JavaScript puro** (sin frameworks),
listo para publicarse gratis en GitHub Pages.

## 📁 Estructura

```
portfolio/
├── index.html        → la página principal (todas las secciones)
├── styles.css        → estilos, tema claro/oscuro y diseño responsive
├── script.js         → menú móvil, cambio de tema, animaciones
├── cv.html           → plantilla del CV (fuente del PDF)
└── assets/
    ├── Fernando-Calle-Gonzales-CV.pdf   → CV descargable
    └── favicon.svg                      → ícono de la pestaña
```

## ▶️ Ver el sitio localmente

El sitio usa archivos separados (CSS/JS), así que conviene abrirlo con un pequeño servidor
local en lugar de hacer doble clic al HTML.

**Opción 1 — Python** (ya lo tienes instalado). En la carpeta `portfolio/`:

```bash
python -m http.server 8000
```

Luego abre en el navegador: `http://localhost:8000`

**Opción 2 — VS Code:** instala la extensión *Live Server* y haz clic en **"Go Live"**.

## 🚀 Publicar gratis en GitHub Pages

1. Crea un repositorio nuevo en GitHub (por ejemplo `portfolio`).
2. Sube el contenido de esta carpeta:
   ```bash
   git init
   git add .
   git commit -m "Portafolio inicial"
   git branch -M main
   git remote add origin https://github.com/ferfloo27/portfolio.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   elige la rama `main` y la carpeta `/ (root)`. Guarda.
4. En 1–2 minutos tu sitio estará en: `https://ferfloo27.github.io/portfolio/`
5. Actualiza esa URL en la etiqueta `og:url` de `index.html` (hay un `TODO` marcado).

## 🧩 Tema speedcubing / "Scramble"

- **Fondo atmosférico:** halos de luz en los colores del cubo que se desplazan lento
  + una notación de scramble (R U R' U'…) como textura sutil en el hero.
- **6 colores del cubo** como acentos: números de sección, bordes de habilidades,
  puntos de datos y el trío de stickers en cada tarjeta de proyecto.
- **Tipografía de cronómetro** (Space Mono) para números, stats y la notación.
- **Cubo mini** que gira según el scroll (abajo a la izquierda, solo en desktop).

## 📝 Cosas por completar (marcadas como `TODO` en el código)

- **Tu mejor tiempo de 3x3:** en `index.html`, dentro de `cube-stats`, reemplaza el `—`
  del `data-stat="best"` por tu tiempo real (ej: `18.42`). Hay un `TODO` marcado.
- **Capturas de los proyectos:**
  - ✅ **ReciboToPDF** ya tiene captura (login de la app) dentro de un mockup de celular.
    Si consigues una captura del formulario de recibo o del PDF (ya con sesión iniciada),
    reemplaza `assets/recibo-login.jpg` y quedará aún mejor.
  - **BLD3x3 (cuando lo tengas):** guarda la captura vertical como `assets/bld3x3.jpg` y en su
    tarjeta cambia el bloque del placeholder por el mismo mockup:
    `<div class="project__media project__media--phone"><div class="phone-mock"><img src="assets/bld3x3.jpg" alt="Captura de BLD3x3" loading="lazy"></div><span class="project__badge">Android nativo</span></div>`
  - Los demás proyectos son pasados y se quedan con el placeholder "Captura pendiente".
- **Foto de perfil (opcional):** si prefieres tu foto en vez del cubo, puedes añadirla en el hero.
- **APK / demos** de BLD3x3 y Recetas App, si llegas a publicarlos.

## 🔄 Regenerar el PDF del CV

Si editas `cv.html` y quieres actualizar el PDF descargable:

1. Abre `cv.html` en el navegador.
2. `Ctrl + P` → **Destino: Guardar como PDF** → Márgenes: *Ninguno* / *Predeterminado*.
3. Guarda el archivo como `assets/Fernando-Calle-Gonzales-CV.pdf` (reemplaza el existente).

## ✅ Buenas prácticas incluidas

- SEO básico: `title`, `meta description`, Open Graph y datos estructurados (Schema.org).
- Accesibilidad: enlace "saltar al contenido", HTML semántico, `aria-label`, foco visible,
  y respeto por `prefers-reduced-motion`.
- Seguridad: enlaces externos con `rel="noopener noreferrer"` y `meta referrer`.
- Responsive y tema claro/oscuro (recuerda la preferencia del usuario).
