'use client';

import { useState, useRef, useEffect } from 'react';
import {list_voices} from './list-voices'
import styles from './TTS.module.css';

const languages=list_voices;
const languagesLoading=false;

export default function TTS({text}) {
 
  const [language, setLanguage] = useState('eu-ES');
  const [name, setName] = useState('eu-ES-Standard-B');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const audioRef = useRef(null);

  const handleSpeak = async () => {
    if (!text.trim()) {
      alert('Por favor, escribe algún texto.');
      return;
    }
    setLoading(true);
    setAudioUrl('');
    try {
      const response = await fetch('/api/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, languageCode: language, name }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al sintetizar voz:', error);
      alert('Error al generar el audio.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const selectedVoice = languages.find((lang) => lang.name === name);
  const currentLanguageCode = selectedVoice?.code || language;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <span className={styles.icon}>🔊</span>
            Configuración de Voz
          </h2>
        </div>

        <div className={styles.content}>
          {/* Selector de Voz */}
          <div className={styles.formGroup}>
            <label htmlFor="voice-select" className={styles.label}>
              Selecciona una voz
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="voice-select"
                value={name}
                onChange={(e) => {
                  const selectedVoice = languages.find((lang) => lang.name === e.target.value);
                  setLanguage(selectedVoice.code);
                  setName(selectedVoice.name);
                  setAudioUrl('');
                }}
                className={styles.select}
                disabled={languagesLoading}
              >
                {languagesLoading ? (
                  <option>Cargando voces...</option>
                ) : (
                  languages.map((lang, index) => (
                    <option key={index} value={lang.name}>
                      {`${lang.name} (${lang.ssmlGender}, ${lang.code})`}
                    </option>
                  ))
                )}
              </select>
            </div>
            {selectedVoice && (
              <div className={styles.voiceInfo}>
                <span className={styles.badge}>
                  {currentLanguageCode === 'eu-ES' ? '🔵 Euskera' : '🔴 Español'}
                </span>
                <span className={styles.badge}>
                  {selectedVoice.ssmlGender === 'MALE' ? '👨 Masculino' : '👩 Femenino'}
                </span>
              </div>
            )}
          </div>

          {/* Controles */}
          <div className={styles.controls}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Velocidad de reproducción: {playbackSpeed.toFixed(1)}x
              </label>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className={styles.slider}
              />
              <div className={styles.sliderLabels}>
                <span>0.5x</span>
                <span>1.0x</span>
                <span>2.0x</span>
              </div>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={() => setAutoPlay((val) => !val)}
                />
                <span>Reproducir automáticamente</span>
              </label>
            </div>
          </div>

          {/* Botón de Generar */}
          <button 
            onClick={handleSpeak} 
            className={`${styles.button} ${loading ? styles.buttonLoading : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Generando audio...
              </>
            ) : (
              <>
                <span>🎵</span>
                Generar Audio
              </>
            )}
          </button>

          {/* Reproductor de Audio */}
          {audioUrl && (
            <div className={styles.audioPlayer}>
              <div className={styles.audioHeader}>
                <span className={styles.audioIcon}>🎧</span>
                <span>Audio generado</span>
              </div>
              <audio 
                controls
                src={audioUrl}
                autoPlay={autoPlay}
                ref={audioRef}
                className={styles.audio}
              ></audio>
              <button
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = audioUrl;
                  a.download = `speech-${Date.now()}.mp3`;
                  a.click();
                }}
                className={styles.downloadButton}
              >
                <span>⬇️</span>
                Descargar Audio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
