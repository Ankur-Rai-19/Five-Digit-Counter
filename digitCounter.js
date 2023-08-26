var countInterval;

/*It starts the counter.*/
function startCounter()
{
    /* Getting the value of the input field. */
    var number = parseInt(document.getElementById("number").value);

    /* Checking if the input is a number and if it is in the range of 1-99999. */
    if (isNaN(number)) {
        alert("Please enter a number");
        clearInterval(countInterval);   // This is important for the condition when a counter is running and you entered a wrong input for a new counter
        return;
    }
    if (number < 1 || number > 99999) {
        alert("Range out of bounds");
        clearInterval(countInterval);
        return;
    }

    var currentNos = document.querySelectorAll(".counter .current");
    // console.log(currentNos);
    var nextNos = document.querySelectorAll(".counter .next");
    var count = 0;

    // If user clicks on 'Start Counter' button again - remove this function and below line if you don't consider this situation
    resetNumbers(currentNos, nextNos, 5);

    // Clears the previous interval that was running
    clearInterval(countInterval);

/* Calling the function `animate` every 1000 milliseconds. */
    countInterval = setInterval(function ()
    {
        if (count === number) {
            clearInterval(countInterval);
            alert("Counter has stopped");
            return;
        }
        increaseCount(currentNos, nextNos, 4);
        count++;
    }, 1000);

}


/**
 * It resets the numbers in the current and next rows to 0 and 1 respectively.
 *  currentNos - The current numbers that are being displayed.
 *  nextNos - The array of elements that will be used to display the next number.
 *  end - The number of digits to display.
 */
function resetNumbers(currentNos, nextNos, end)
{
    for (var i = 0; i < end; ++i) {
        currentNos[i].innerText = 0;
        nextNos[i].innerText = 1;
    }
}



function increaseCount(currentNos, nextNos, index)
{

    /* Getting the current number that is being displayed. */
    let current = currentNos[index];
    /* Getting the next number that is going to be displayed. */
    let next = nextNos[index];

/* Checking if the current number is 9. If it is, then it calls the function `increaseCount` again with
the index of the previous number. This is because if the current number is 9, then the next number
will be 0 and the number before it will be increased by 1. */
    if (current.innerText == 9) {
        increaseCount(currentNos, nextNos, index - 1);
    }

    /* Adding the class 'animate' to the element with the id 'next'. */
    next.classList.add("animate");

    setTimeout(function ()
    {
        current.innerText = next.innerText; /* Setting the innerText of the current element to the innerText of the next element. */
        next.classList.remove("animate");
        next.innerText = parseInt(next.innerText) + 1;  /* Incrementing the value of the next element by 1. */
        
/* Checking if the next number is greater than 9. If it is, then it sets the next number to 0. This is
because if the current number is 9, then the next number will be 0 and the number before it will be
increased by 1. */
        if (next.innerText > 9) {
            next.innerText = 0;
        }
    }, 500);

}
