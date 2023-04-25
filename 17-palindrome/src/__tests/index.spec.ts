import { PalindromeChecker } from "..";

describe('palindrome checker', function () {
    let palindromeChecker: PalindromeChecker;

    beforeEach(function () {
        palindromeChecker = new PalindromeChecker();
    });
    it('should be able to tell that "mom" is a palindrome', function () {
        expect(palindromeChecker.isAPalindrome('mom')).toBeTruthy();
    });
    it('should be able to tell that "bill" isn\'t a palindrome', function () {
        expect(palindromeChecker.isAPalindrome('bill')).toBeFalsy();
    });
    it('should be able to tell that "Mom" is a palindrome', function () {
        expect(palindromeChecker.isAPalindrome("Mom")).toBeTruthy();
    });
    it('should be able to tell that "Was It A Rat I Saw" is a palindrome', function() {
        expect(palindromeChecker.isAPalindrome("Was It A Rat I Saw")).toBeTruthy();
    });
    it('should be able to tell that "Never Odd or Even" is palindrome', function() {
        expect(palindromeChecker.isAPalindrome("Never Odd or Even")).toBeTruthy();
    });
});