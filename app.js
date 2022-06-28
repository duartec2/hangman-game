window.app = () => {
    const words = [
        'SERVICIO POSTAL',
        'EQUIPO DE SONIDO',
        'CIENCIA FICCIÓN'
    ];

    return {
        lives: 5,
        word: '',
        keysPressed: [],
        alphabet: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
        checkWord: '',
        start() {
            this.word = words[Math.floor(Math.random() * words.length)];
            this.checkWord = this.word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '');
         },

        pressed(char) {
            this.keysPressed.push(char);
            this.checkWord = this.checkWord.replace(new RegExp(char, 'gi'), '');

            if(this.word.indexOf(char) === -1) {
                this.lives--;
            }
        },

        has(char) {
            char = char.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return this.keysPressed.includes(char);
        },
    }
};