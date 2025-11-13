# Text to Speech - Euskera y Español

Fork del proyecto original [vimlesh1975/texttospeech](https://github.com/vimlesh1975/texttospeech) modificado para:

- **Voz por defecto**: eu-ES-Standard-B (Euskera)
- **Idiomas disponibles**: Solo Euskera (eu-ES) y Español (es-ES)
- **Funcionalidad**: Solo Text-to-Speech (TTS)

## Características

- Interfaz simplificada con solo la funcionalidad de conversión de texto a voz
- Soporte para múltiples voces de Google Cloud Text-to-Speech en euskera y español
- Control de velocidad de reproducción
- Descarga de audio generado
- Reproducción automática opcional

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Configuración

Asegúrate de tener configuradas las credenciales de Google Cloud Text-to-Speech API en las variables de entorno necesarias.
