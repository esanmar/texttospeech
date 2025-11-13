'use client';

import { useState } from 'react';
import 'regenerator-runtime/runtime'
import TTS from "./TTS";
import styles from './page.module.css';

const Page = () => {
    const [currentText, setCurrentText] = useState('');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <span className={styles.titleIcon}>🎙️</span>
                        Text to Speech
                    </h1>
                    <p className={styles.subtitle}>
                        Convierte texto a voz en Euskera y Español
                    </p>
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Escribe tu texto</h2>
                        <span className={styles.charCount}>
                            {currentText.length} caracteres
                        </span>
                    </div>
                    
                    <textarea
                        className={styles.textarea}
                        rows="8"
                        placeholder="Escribe o pega aquí el texto que quieres convertir a voz..."
                        value={currentText}
                        onChange={(e) => setCurrentText(e.target.value)}
                    />

                    {currentText.trim() === '' && (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>✍️</span>
                            <p>Escribe algo para comenzar</p>
                        </div>
                    )}
                </div>

                {currentText.trim() !== '' && (
                    <div className={styles.ttsContainer}>
                        <TTS text={currentText} />
                    </div>
                )}
            </main>

            <footer className={styles.footer}>
                <p>
                    Powered by Google Cloud Text-to-Speech API
                </p>
            </footer>
        </div>
    )
}

export default Page
