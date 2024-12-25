// Select the input field and all buttons
const inputField = document.querySelector('.input');
const buttons = document.querySelectorAll('.button');

let currentInput = ''; // To store the current input string

// Function to evaluate the input string
const calculate = (input) => {
    try {
        // Replace custom operators with valid JavaScript operators
        input = input.replace(/x/g, '*').replace(/%/g, '/100');
        return eval(input);
    } catch (error) {
        return 'Error';
    }
};

// Add event listeners to all buttons
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;

        switch (value) {
            case 'C':
                currentInput = ''; // Clear the input
                inputField.value = '';
                break;

            case '=':
                currentInput = calculate(currentInput).toString(); // Calculate the result
                inputField.value = currentInput;
                break;

            case 'x':
            case '/':
            case '+':
            case '-':
            case '.':
            case '%':
                currentInput += value; // Append operators and dot
                inputField.value = currentInput;
                break;

            default:
                currentInput += value; // Append numbers
                inputField.value = currentInput;
                break;
        }
    });
});
