export class PalindromeChecker {
    isAPalindrome(str: string): boolean {
        const reversed = str.split("").reverse().join("");
        return reversed.replace(/\s/g, '').toLowerCase() === str.replace(/\s/g, '').toLowerCase();
    }
}