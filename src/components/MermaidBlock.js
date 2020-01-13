import React, { useEffect } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({startOnLoad: true})

export default function MermaidBlock({chart}) {
    try {
        mermaid.contentLoaded()
        return (
            <div className="mermaid">
                {chart}
            </div>
        )
    } catch(e) {
        console.log(e);
        return <div>Error</div>
    }
}
