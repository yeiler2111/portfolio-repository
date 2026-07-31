# assets-source

Originales de los que se derivan los assets publicados. **Esta carpeta no se
despliega**: queda fuera de `public/`, así que no entra en el build ni suma peso
al sitio, pero sigue versionada para no perder las fuentes.

## Contenido

| Archivo | Deriva en |
|---|---|
| `img/imagen_mia.jpg` (7,1 MB) | — |
| `img/imagen_mia.webp` (2,9 MB) | `public/img/imagen_mia_{240,480,768}.webp` |

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
