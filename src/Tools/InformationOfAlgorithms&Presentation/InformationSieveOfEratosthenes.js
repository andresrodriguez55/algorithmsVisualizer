const information={
    name: "Sieve of Eratosthenes",
    information: "Given a number, the algorithm will find the prime numbers less than or equivalent to the given number.\n\nThe algorithm works as follows, given a limit number the algorithm will start accepting all numbers less than or equivalent to the limit number as primes, continuously the algorithm will start from 2, being prime it will take it as a pivot and advance on the other numbers.\n\nIf any of the other numbers contains the pivot multiplier, it will write them down as non-primes, once finished with the other numbers it will follow the same process with the following numbers, as long as the pivots are prime and are less than the root of the input number.",
    pseudocode: "SOE(n)\n\tisPrime🠔[true, true, ..., ...(n+1)]\n\tisPrime[0]🠔false\n\tisPrime[1]🠔false\n\tfor number🠔2 to sqrt(n) do\n\t\tif isPrime[number] then\n\t\t\tmultiplier🠔2\n\t\t\twhile number*multiplier≤n do\n\t\t\t\tisPrime[number*multiplier]🠔false\n\t\t\t\tmultiplier🠔multiplier+1\n\treturn isPrime"
};

export default information;