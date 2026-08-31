# assets-source

Originales de los que se derivan los assets publicados. **Esta carpeta no se
despliega**: queda fuera de `public/`, así que no entra en el build ni suma peso
al sitio, pero sigue versionada para no perder las fuentes.

## Contenido

| Archivo | Deriva en |
|---|---|
| `img/imagen_mia.jpg` (7,1 MB) | — |
| `img/imagen_mia.webp` (2,9 MB) | `public/img/imagen_mia_{240,480,768}.webp` |
| `img/ml/correlacion_pca.png` (308 KB) | `public/img/ml/correlacion_pca.webp` (16 KB) |
| `favicon/gen_favicon.py` | `public/{favicon.ico,apple-touch-icon.png,icon-192.png,icon-512.png,icon-maskable-512.png}` |

Antes vivían en `public/img/`, así que se subían enteros en cada deploy (~10 MB)
aunque el sitio solo usa las variantes redimensionadas.

## Regenerar las variantes

Los tres tamaños corresponden a los breakpoints de `profile.image.sources` en
`src/data/site.ts`: 240 para móvil, 480 desde 641 px y 768 desde 1024 px.

```sh
# con ImageMagick
magick assets-source/img/imagen_mia.webp -resize 240x public/img/imagen_mia_240.webp
magick assets-source/img/imagen_mia.webp -resize 480x public/img/imagen_mia_480.webp
magick assets-source/img/imagen_mia.webp -resize 768x public/img/imagen_mia_768.webp
```

`public/og-image.jpg` (1200×630) también se genera a partir de
`public/img/imagen_mia_768.webp`.

## Capturas de proyecto

Las capturas de `public/img/<slug>/` deben tener su original aquí, en
`assets-source/img/<slug>/`, y publicarse solo en **WebP**.

### `tocata` — hecho

Originales en `assets-source/img/tocata/`, publicadas en `public/img/tocata/`:

Cubren las **tres aplicaciones** del producto:

| Publicada | De dónde sale |
|---|---|
| `dj-biblioteca.webp` | Escritorio (Electron), pestaña *Biblioteca* |
| `cliente-pedir.webp` | Web del cliente: pedir canciones tras escanear el QR |
| `cliente-enviada.webp` | Web del cliente: confirmación «Lista enviada» |
| `meseros-qr.webp` | Dos capturas de la app Android compuestas lado a lado |
| `dj-presentacion.webp` | Escritorio, pestaña *Presentación* |

Tres decisiones que conviene no deshacer al regenerarlas:

- En `dj-biblioteca` **se tapó la ruta local**, que dejaba ver el nombre de
  usuario de Windows. El original sin tapar sigue en `assets-source/`.
- A las dos de la web del cliente **se les recortó la barra de marcadores** del
  navegador, que mostraba enlaces personales (corte en y=35 e y=14).
- Los pantallazos de móvil van **compuestos en una imagen apaisada**: sueltos,
  un 720×1600 dentro del recuadro `aspect-[16/10]` de la card queda diminuto y
  con franjas enormes a los lados.

### `icar-rsa` — hecho

Una sola imagen, `app-monitoreo.webp`: las tres pantallas compuestas de
izquierda a derecha, contando el flujo — resumen con CAR promedio y serie
temporal · bandeja de muestreos con grado, CAR y estado · mapa con el punto
georreferenciado y su ficha.

Originales en `assets-source/img/icar-rsa/`. La captura de login está ahí como
`login-descartada.jpeg`: no aporta nada en un portafolio.

Las capturas llegaron por WhatsApp a **540×1200**, la mitad de la resolución del
dispositivo. Si hace falta más calidad, con el móvil conectado por USB se
capturan a 1080×2400 con `adb exec-out screencap -p > salida.png`.

Objetivo: ancho máximo 1400 px y menos de 150 KB por imagen.

### Convertir a WebP

Con ImageMagick, si está instalado:

```sh
magick assets-source/img/<slug>/captura.png -resize 1400x -quality 90 public/img/<slug>/captura.webp
```

Sin ImageMagick, con Pillow (es lo que se usó para `correlacion_pca`):

```sh
python -c "from PIL import Image; im=Image.open('assets-source/img/ml/correlacion_pca.png'); im.save('public/img/ml/correlacion_pca.webp','WEBP',quality=90,method=6)"
```

`quality=90` mantiene legibles los textos de gráficas y capturas de interfaz;
por debajo de 85 empiezan a emborronarse las etiquetas pequeñas.

## Hojas de vida

Los dos PDFs de `public/documents/` **se generan**, no se editan a mano:

| Fuente | Genera |
|---|---|
| `cv/cv_data.py` | contenido (experiencia, habilidades, educación, contacto) |
| `cv/build_cv.py` | `public/documents/HvAts.pdf` y `public/documents/hvHarvard.pdf` |

Antes no había fuente: los PDFs estaban sueltos y no se podían actualizar sin
rehacerlos desde cero en Word o en un generador online. Por eso se quedaron sin
la experiencia en Alegra y con el año de grado desactualizado.

### Actualizar el CV

1. Edita **solo** `cv/cv_data.py` (es la fuente única para ambos formatos).
2. Regenera:

```sh
python assets-source/cv/build_cv.py
```

Renderiza con Chrome headless (`--print-to-pdf`), que conserva la capa de texto y
los hipervínculos. Si no hay Chrome, el script prueba con Edge.

`cv/ats.html` y `cv/visual.html` son **artefactos**: el script los sobrescribe en
cada ejecución. Sirven para abrir el diseño en el navegador y afinar el CSS, pero
los cambios de contenido van en `cv_data.py`.

### Los dos formatos

- **HvAts.pdf** — una columna, sin tablas ni fondos de color, encabezados
  literales (`EXPERIENCIA PROFESIONAL`, `HABILIDADES TÉCNICAS`). Cada término de
  habilidades va en un `<span>` sin salto de línea: sin eso Chrome parte palabras
  como «Speech-to-text» por el guion y la capa de texto que lee un filtro ATS
  queda rota.
- **hvHarvard.pdf** — dos columnas, reproduciendo la maqueta del PDF anterior.
  Medidas tomadas del original: banda superior `#414042` de 218 pt, barra lateral
  `#EEEEEF` de 214 pt, títulos `#333E50`, cuerpo `#77787B`, Arial.

El reparto de secciones entre páginas es **explícito** (cada `.page` es una hoja
fija con `overflow: hidden`). Si añades experiencia y el contenido deja de caber,
se recorta en silencio: tras regenerar, comprueba que todos los bullets siguen en
la capa de texto y revisa las páginas antes de publicar.

### `seprinort` — hecho

Capturas del sitio en producción (`https://seprinort.com/`), enviadas por el
autor: `hero.webp`, `servicios.webp` (acordeón de servicios desplegado) y
`nosotros.webp`. Originales en `assets-source/img/seprinort/`.

### `matrimonio` — hecho

No son fotos: son **recortes de la demo desplegada**, tomadas con Chrome
headless sobre el build. Como el sitio usa `min-h-screen` y anima la entrada con
`motion-v`, para capturar la página entera hay que servir una copia del `dist`
con este override inyectado en el `<head>`:

```html
<style>
*,*::before,*::after{min-height:0 !important;opacity:1 !important}
.h-screen{height:520px !important}
</style>
```

Sin él, el hero ocupa todo el viewport y el resto del contenido queda en
`opacity: 0`. Los recortes publicados son el hero, la ficha del evento con la
cuenta regresiva y el formulario de confirmación.

### `nicolle-xv` — hecho

`invitacion.webp` son tres tramos de la invitación compuestos lado a lado (la
página es una columna de 520x7000, ilegible entera dentro del recuadro 16/10),
y `panel.webp` es el panel de gestión en modo demo.

Para capturar hay que servir una copia del `dist` con este override, porque el
sobre de apertura tapa el contenido y GSAP deja las secciones en opacity 0:

```html
<style>
.intro-overlay{display:none !important}
*,*::before,*::after{opacity:1 !important}
.section{height:auto !important;min-height:0 !important}
</style>
```

Para el panel, además, hay que dejar la sesión lista en `sessionStorage`
(`nicolle_demo_admin`, `nicolle_admin_authed`, `nicolle_admin_token`) y servir
con fallback SPA, porque `/admin/dashboard/home` es una ruta en history mode.


## Regenerar el favicon

La fuente de verdad de la marca es `public/favicon.svg`: el monograma **YS** del
header (`src/components/shared/Logo.vue`) sobre el degradado
`primary-500 → secondary-500`. Los navegadores modernos usan ese SVG; el `.ico` y
los PNG existen como respaldo para Safari, iOS y la instalación como PWA.

`favicon/gen_favicon.py` replica la misma geometría del SVG con Pillow (no hay
rasterizador de SVG en el proyecto), así que **cualquier cambio de trazo, color o
radio hay que aplicarlo en los dos archivos** o el icono de la pestaña dejará de
coincidir con el del header.

```sh
python assets-source/favicon/gen_favicon.py public
```

`icon-maskable-512.png` es aparte a propósito: va a sangre y con la marca al 80 %
para sobrevivir al recorte circular que Android aplica a los iconos `maskable`.
