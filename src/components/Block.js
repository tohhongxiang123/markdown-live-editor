import React from 'react'

export default function Block({block, setCurrentIndex}) {
    const updateBlock = () => console.log('update block')
    const renderBlock = (block) => {
        switch(block.type) {
            case 'h1':
                return <h1>{block.text}</h1>
            case 'h2':
                return <h2>{block.text}</h2>
            case 'h3':
                return <h3>{block.text}</h3>
            case 'h4':
                return <h4>{block.text}</h4>
            case 'h5':
                return <h5>{block.text}</h5>
            case 'h6':
                return <h6>{block.text}</h6>
            default:
                return <p>{block.text}</p>
        }
    }
    return (
        <div data-offset={block.index} onClick={() => setCurrentIndex(block.index)} onInput={updateBlock} onBlur={updateBlock}>
            {renderBlock(block)}
        </div>
    )
}
