/*************************************************************************************************/
/* Script managing the core game loop : retrieving and checking typed lyrics, and managing score */
/*************************************************************************************************/

function compareLyrics(lyrics, typedLyrics) {
    const points_per_type = {
        'perfect': 0, // Multiplier for perfect typing bonus, currently set to 0 because we work in percentages
        'correct_position': 1,
        'correct_word': 0.5,
        'incorrect_word': -0.5
    }
    let score = 0;

    // Split lyrics into words
    lyrics = simplfyLyrics(lyrics);
    typedLyrics = simplfyLyrics(typedLyrics);

    const lyricsWords = lyrics.split(''); // Split lyrics into letters
    const typedLyricsWords = typedLyrics.split('');

    // Check the words that are both correct and at the right place
    let correct_position_words = 0;
    for (let i = 0; i < lyricsWords.length; i++) {
        if (typedLyricsWords[i] === lyricsWords[i]) {
            score += points_per_type['correct_position'];
            typedLyricsWords[i] = null; // Mark the word as already checked
            lyricsWords[i] = null; // Mark the word as already checked
            correct_position_words++;
        }
    }

    if (correct_position_words === lyricsWords.length && typedLyricsWords.every(word => word === null)) score +=  points_per_type['correct_position'] * points_per_type['perfect'] * lyricsWords.length // Bonus for perfect typing

    // Check the words that are correct but not at the right place
    let incorrect_position_letters = 0;
    for (let i = 0; i < lyricsWords.length; i++) {
        if (typedLyricsWords.includes(lyricsWords[i]) && lyricsWords[i] !== null) { // If the word has been typed and was not already checked (either for being correctly placed or correctly typed)
            typedLyricsWords[typedLyricsWords.indexOf(lyricsWords[i])] = null; // Mark the word as already checked
            lyricsWords[i] = null; // Mark the word as already checked
            incorrect_position_letters++;
        }
    }

    if (incorrect_position_letters / lyricsWords.length > 0.75) score += points_per_type['correct_word'] * (1 - incorrect_position_letters / lyricsWords.length); // If the lyrics typed were mostly correct (but contained typos or otherwise mistakes) the player still gets some points for the letters that were correct

    // Check the words that are simlpy incorrect
    for (let i = 0; i < typedLyricsWords.length; i++) {
        if (typedLyricsWords[i] !== null) score += points_per_type['incorrect_word']; // Every word that wasn't already marked for being correct in some way is therefore incorrect
    }

    // Convert score to percentage
    score /= lyricsWords.length;
    score = Math.max(0, score) * 100;
    return score.toFixed(2);
}



function simplfyLyrics(lyrics) {
    // Function used to simplify lyrics so that the game is less strict about details like punctuation and capitalization
    lyrics = lyrics.replace(/[.,\/#!$%\^&\*;:{}=\-_`~]/g,""); // Remove punctuation
    lyrics = lyrics.replace(/\(.*?\)/g, ''); // Remove text between parentheses (since it's often background vocals)
    lyrics = lyrics.replace(/\s{2,}/g, ' '); // Remove extra spaces that may have been created in the process
    return lyrics.toLowerCase(); // Ignore capitalization
}


module.exports = {compareLyrics}; // Export the function to be used in the server.js file