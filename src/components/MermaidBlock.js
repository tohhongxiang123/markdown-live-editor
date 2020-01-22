import React, { useEffect, useState } from 'react'
import mermaid from 'mermaid'
import styles from './MermaidBlock.module.scss'

export default function MermaidBlock({chart}) {
    const [diagram, setDiagram] = useState(chart)
    useEffect(() => {
        try {
            mermaid.initialize({
                startOnLoad: true,
                theme: "forest"
            })
            mermaid.contentLoaded()
        } catch(e) {
            setDiagram(e.message)
        }
    }, [chart])

    return (
            <div className={`${styles.mermaidBlock} mermaid`}>
                {diagram}
            </div>
    )
}
