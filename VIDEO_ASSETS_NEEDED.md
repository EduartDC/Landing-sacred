# 🎥 Archivos de Video Necesarios para el Hero

Para que el video de fondo de la Riviera Maya funcione correctamente, necesitas agregar los siguientes archivos en la carpeta `public/`:

## Archivos Requeridos:

### 1. Video Principal (Desktop)

- **Archivo**: `riviera-maya-video.mp4`
- **Ubicación**: `/public/riviera-maya-video.mp4`
- **Especificaciones**:
  - Formato: MP4 (H.264)
  - Resolución: 1920x1080 (Full HD) mínimo
  - Duración: 10-30 segundos (para loop)
  - Tamaño: Máximo 10MB para buena carga
  - Sin audio (muted)

### 2. Video Alternativo (Compatibilidad)

- **Archivo**: `riviera-maya-video.webm`
- **Ubicación**: `/public/riviera-maya-video.webm`
- **Especificaciones**:
  - Formato: WebM (VP9/VP8)
  - Mismas especificaciones que el MP4
  - Para navegadores que no soportan MP4

### 3. Imagen Poster (Carga inicial)

- **Archivo**: `riviera-maya-poster.jpg`
- **Ubicación**: `/public/riviera-maya-poster.jpg`
- **Especificaciones**:
  - Formato: JPG optimizado
  - Resolución: 1920x1080
  - Tamaño: Máximo 500KB
  - Frame representativo del video

### 4. Imagen Fallback (Móviles)

- **Archivo**: `riviera-maya-fallback.jpg`
- **Ubicación**: `/public/riviera-maya-fallback.jpg`
- **Especificaciones**:
  - Formato: JPG optimizado
  - Resolución: 1920x1080
  - Tamaño: Máximo 300KB
  - Para dispositivos móviles (ahorro de datos)

## Contenido Sugerido del Video:

### Elementos Visuales Ideales:

- 🏖️ **Playas de arena blanca** con agua turquesa
- 🌴 **Palmeras** meciéndose suavemente
- 🏛️ **Ruinas mayas** (Tulum, Chichen Itzá)
- 🌊 **Olas suaves** llegando a la orilla
- 🐠 **Cenotes** con agua cristalina
- 🌅 **Atardecer dorado** sobre el mar
- 🚤 **Actividades acuáticas** sutiles
- 🦎 **Flora y fauna** tropical

### Características Técnicas:

- **Movimiento sutil**: Evitar movimientos bruscos
- **Colores vibrantes**: Azules, verdes y dorados
- **Transiciones suaves**: Para un loop perfecto
- **Estabilizado**: Sin movimientos de cámara jerky
- **Bien iluminado**: Preferiblemente durante golden hour

## Optimización:

### Para MP4:

```bash
# Comando FFmpeg para optimizar (opcional)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart riviera-maya-video.mp4
```

### Para WebM:

```bash
# Comando FFmpeg para WebM (opcional)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 riviera-maya-video.webm
```

## Fuentes Recomendadas:

1. **Pexels Videos**: https://www.pexels.com/videos/
2. **Unsplash Videos**: https://unsplash.com/videos/
3. **Pixabay Videos**: https://pixabay.com/videos/
4. **Coverr**: https://coverr.co/
5. **Videezy**: https://www.videezy.com/

### Búsquedas Sugeridas:

- "Riviera Maya beach"
- "Tulum ruins ocean"
- "Mexico Caribbean coast"
- "Tropical beach paradise"
- "Maya civilization coastline"

## Estado Actual:

✅ **Código implementado**: Hero component con video background
✅ **Estilos responsive**: Desktop video, mobile fallback
✅ **Optimización**: Lazy loading y poster frame
❌ **Archivos faltantes**: Los 4 archivos listados arriba

## Próximos Pasos:

1. Descargar o crear los archivos de video e imágenes
2. Colocarlos en la carpeta `public/`
3. Verificar que los nombres coincidan exactamente
4. Probar en diferentes dispositivos y navegadores
5. Ajustar overlay si es necesario para legibilidad

¡Una vez agregues estos archivos, tendrás un hero espectacular con video de la Riviera Maya! 🌴🏖️
