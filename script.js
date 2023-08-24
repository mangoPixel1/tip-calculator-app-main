function calculateTip (tipPercent) {
    document.querySelector('.reset-button').classList.add('reset-enabled');
    
    document.querySelector('.billInput').classList.remove('error-input');
    document.querySelector('.numPeopleInput').classList.remove('error-input');
    document.querySelector('#bill-title > p').classList.remove('visible');
    document.querySelector('#numPeople-title > p').classList.remove('visible');
    
    let billAmount = document.querySelector('.billInput').value;
    let numPeople = document.querySelector('.numPeopleInput').value;

    if (isNaN(parseFloat(billAmount)) || isNaN(parseFloat(numPeople))) {
        if (isNaN(parseFloat(billAmount))) {
            // alert("Bill can't be zero");
            document.querySelector('.billInput').classList.add('error-input');
            document.querySelector('#bill-title > p').classList.add('visible');
        }
        
        if (isNaN(parseFloat(numPeople))) {
            //alert("Number of People can't be zero");
            document.querySelector('.numPeopleInput').classList.add('error-input');
            document.querySelector('#numPeople-title > p').classList.add('visible');
        }
        return;
    }

    let bill = parseFloat(billAmount);
    let people = parseFloat(numPeople);
    let tip = (parseFloat(tipPercent) / 100);

    const totalTip = bill * tip;
    const totalAmount = bill + totalTip;

    if (isNaN(totalTip) || isNaN(totalAmount)) {
        return;
    }

    document.querySelector('#tip-per-person').textContent = "$" + `${(totalTip / people).toFixed(2)}`;
    document.querySelector('#total-per-person').textContent = "$" + `${(totalAmount / people).toFixed(2)}`;

    //document.querySelector('.reset-button').classList.add('reset-enabled');
}

const tipButtons = document.querySelectorAll('.tip-button');

tipButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelector('.custom').classList.remove('invisible');
        document.querySelector('.custom-tip-input').classList.add('invisible');

        if (event.target.classList.contains('selected')) {
            return; // if button clicked is already selected: do nothing
        }

        tipButtons.forEach(tipButton => { // Remove the selected class from currently selected button
            if (tipButton.classList.contains('selected')) {
                tipButton.classList.remove('selected');
            }
        });

        if (event.target.classList.contains('custom')) {
            document.querySelector('.custom').classList.add('invisible');
            document.querySelector('.custom-tip-input').classList.remove('invisible');
        } else {
            event.target.classList.add('selected');
            const tipPercent = event.target.textContent.slice(0, -1);
            calculateTip(tipPercent);
        }
        
        
    });
});

document.querySelector('.custom-tip-input').addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        calculateTip(event.target.value);
    }
});

// Reset all values when reset button is clicked
document.querySelector('.reset-button').addEventListener('click', () => {
    document.querySelector('.billInput').value = null;
    document.querySelector('.numPeopleInput').value = null;
    
    tipButtons.forEach(tipButton => { // Remove the selected class from currently selected button
        if (tipButton.classList.contains('selected')) {
            tipButton.classList.remove('selected');
        }
    });

    document.querySelector('.billInput').classList.remove('error-input');
    document.querySelector('.numPeopleInput').classList.remove('error-input');
    document.querySelector('#bill-title > p').classList.remove('visible');
    document.querySelector('#numPeople-title > p').classList.remove('visible');

    document.querySelector('#tip-per-person').textContent = "$0.00";
    document.querySelector('#total-per-person').textContent = "$0.00";

    document.querySelector('.reset-button').classList.remove('reset-enabled');
});