function tryLowerCase(word) {
    const letters = []
    for (const letter of word) {
        try {
            letters.push(letter.toLowerCase())
        } catch(e) {
            letters.push(letter)
        }
    }
    return letters.join('')
}

export default tryLowerCase