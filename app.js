window.app = () => {
    const options = {
        lives: 10,
        tries: 0,
        started: false,
        loading: false,
        word: '',
        wordDefinition: '',
        keysPressed: [],
        alphabet: 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',
        checkWord: ''
    };

    async function getRandomWord() {
        try {
            const response = await fetch('https://palabras-aleatorias-public-api.herokuapp.com/random');
            if (!response.ok) {
                console.error(`Something went wrong: ${response.status} - ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return {
        ...options,
        start() {
            //this.reset();
            this.loading = true;
            getRandomWord().then(data => {
                this.word = data.body.Word.toUpperCase();
                this.checkWord = this.word.replace(/ /g, '');
                this.wordDefinition = data.body.DefinitionMD;
                this.loading = false;
                this.started = true;
            });
         },
        reset() {
           this.options = options; 
        }, 
        pressed(letter) {

            this.tries++;
            this.keysPressed.push(letter);
            
            if(this.word.indexOf(letter) === -1) {
                this.lives--;
            } else {
                this.checkWord = this.checkWord.replace(new RegExp(letter, 'gi'), '');
            }

            console.log(this.checkWord);
            
        },
    }
};