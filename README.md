# Portafolio — Fernando Calle Gonzales

Landing page de mi portafolio profesional como **desarrollador mobile** (Android / Kotlin · Flutter).
Una sola página con mis proyectos, habilidades y CV descargable.

### 🌐 Ver en vivo
**https://ferfloo27.github.io/**

## ✨ Sobre el proyecto
Sitio de una sola página, con un tema visual inspirado en el **speedcubing** (soy cubero):
el nombre se "resuelve" al cargar como un cubo, notaciones de algoritmos animadas de fondo
y los colores del cubo como acentos.

Secciones: inicio · sobre mí · habilidades · proyectos · logros · experiencia · formación · contacto.

## 🛠️ Hecho con
HTML, CSS y JavaScript puro (sin frameworks ni dependencias). Diseño responsive,
modo claro/oscuro, animaciones con `prefers-reduced-motion` respetado y SEO básico.

## 📬 Contacto
- GitHub: [@ferfloo27](https://github.com/ferfloo27)
- LinkedIn: [Fernando Calle Gonzales](https://www.linkedin.com/in/fernando-calle-gonzales/)
- Email: fercallg@gmail.com

---

<details>
<summary>⚙️ Ejecutar y editar localmente</summary>

Como usa archivos CSS/JS separados, conviene abrirlo con un pequeño servidor local.
En esta carpeta:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

**Regenerar el PDF del CV:** edita `cv.html`, ábrelo en el navegador, `Ctrl + P` →
*Guardar como PDF* → guarda en `assets/Fernando-Calle-Gonzales-CV.pdf`.

**Agregar capturas de proyectos:** guarda la imagen en `assets/` y, en la tarjeta
correspondiente de `index.html`, reemplaza el bloque "Captura pendiente" por tu `<img>`
(para apps móviles, usa el mockup `project__media--phone`).
</details>
