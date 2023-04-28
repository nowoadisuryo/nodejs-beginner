export class PalindromeChecker {
    isAPalindrome(sentenceOrWord: string): boolean {
        const reversedSentenceOrWord = sentenceOrWord.split("").reverse().join("");
        const allSpace = /\s/g;
        return reversedSentenceOrWord.replace(allSpace, '').toLowerCase() === sentenceOrWord.replace(allSpace, '').toLowerCase();
    }
}