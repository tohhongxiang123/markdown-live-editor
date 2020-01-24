import React, { useEffect, useState } from 'react'
import mermaid from 'mermaid'
import styles from './MermaidBlock.module.scss'

export default function MermaidBlock({chart}) {
    const [error, setError] = useState(null)
    // we use a useLayoutEffect here so that the user does not see the repaint everytime he updates something
    useEffect(() => {
        try {
            if (!chart) return
            mermaid.initialize({
                startOnLoad: true,
                theme: "forest"
            })
            mermaid.contentLoaded()
        } catch(e) {
            setError(e.message)
        }
    }, [chart])

    return chart ? (
            <div className={`${styles.mermaidBlock} mermaid`}>
                {error ? <pre>{error}</pre> : chart}
            </div>
        ) : (
            <div className={styles.mermaidBlock}>
            </div>
        )
            
    
}
