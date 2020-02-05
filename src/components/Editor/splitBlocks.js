function splitBlocks(block) {
    let blocks = []
    let currentBlock = []
    let collect = 0
    
    const list = block.split('\n\n')
    
    for (let i=0; i<list.length;i++) {
        if (list[i].match(/^```/) && list[i].match(/```$/)) {
            // single block matches ``` (code) ```
            blocks.push(list[i])
            continue
        } else if ((list[i].match(/```$/) || list[i].match(/```\n$/)) && collect > 0) {
            // end of the block matches end of fenced code block. Done collecting
            currentBlock.push(list[i])
            blocks.push(currentBlock.join('\n\n'))
            currentBlock = []
            collect -= 1
            continue
        } else if (list[i].match(/^```/)) {
            // start of block matches start of fenced code block. Begin collecting
            collect += 1
            currentBlock.push(list[i])
            continue
        } else if (collect) {
            currentBlock.push(list[i])
        } else {
            blocks.push(list[i])
        }

        if (currentBlock && collect === 0) {
            blocks = [...blocks, ...currentBlock]
        }
    }  

    return blocks
}

export default splitBlocks