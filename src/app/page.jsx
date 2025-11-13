'use client';

import { useState } from 'react';
import 'regenerator-runtime/runtime'
import TTS from "./TTS";

const Page = () => {
    const [currentText, setCurrentText] = useState('');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
            <div>
                <h1>Text to Speech - Euskera y Español</h1>
                <textarea
                    rows="10"
                    cols="80"
                    placeholder="Escribe tu texto aquí..."
                    value={currentText}
                    onChange={(e) => setCurrentText(e.target.value)}
                    style={{ marginBottom: '20px', fontSize: '16px', padding: '10px' }}
                />
            </div>
            {currentText !== '' && <TTS text={currentText} />}
        </div>
    )
}

export default Page
