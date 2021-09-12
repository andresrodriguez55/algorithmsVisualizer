const information={
    name: "Extended Euclid's Algorithm",
    information: "Here we will focus on demonstrating the extended euclidean algorithm which helps us find the bezout coefficients, finally we will show a small implementation in the C language.",
    imageLink1: "https://drive.google.com/uc?id=1P7JdMAh6SSxLQPxC5Q_ujDhbNlZ0hJJ1",
    imageExplication1: "As we can see, we have first written what exactly the Euclidean algorithm does in each iteration.\n\nTaking the first iteration we show that we can reshape it in such a way that we can find an equivalence to the multipliers x and y, this means that in the following iterations we can apply the same logic, which means that we can already see that we will implement a recursive algorithm, now the doubt it will be when it should stop.\n\nThen we take the last iteration which is the one that gives us the result, when we open it we can see that as a multiplier the result would have a one, which here we can draw the conclusion that if the algorithm took as input this last iteration it should return the value of x as 1 and that of y as 0.\n\nNow let's see the implementation of the algorithm in the C language.",
    imageLink2: "https://drive.google.com/uc?id=1P3-sq7XzmfCeAWxtXf-JY6Hu-HEndHLx"
};
export default information;