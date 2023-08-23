function calculateTip (tipPercent) {
    let billAmount = document.querySelector('#billInput').value;
    let numPeople = document.querySelector('#numPeopleInput').value;

    let bill = parseInt(billAmount);
    let people = parseInt(numPeople);
    let tip = (parseInt(tipPercent) / 100);
    

    /*if (billAmount.length > 0 && numPeople.length > 0) {
        bill = parseInt(billAmount);
        people = parseInt(numPeople);
    }*/

    const totalTip = bill * tip; // (bill * tip).toFixed(2);
    const totalAmount = bill + totalTip;

    document.querySelector('#tip-per-person').textContent = "$" + `${(totalTip / people).toFixed(2)}`;
    document.querySelector('#total-per-person').textContent = "$" + `${(totalAmount / people).toFixed(2)}`;

    document.querySelector('.reset-button').classList.add('reset-enabled');
}

const tipButtons = document.querySelectorAll('.tip-button');

tipButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.classList.contains('selected')) {
            return; // if button clicked is already selected: do nothing
        }

        tipButtons.forEach(tipButton => { // Remove the selected class from currently selected button
            if (tipButton.classList.contains('selected')) {
                tipButton.classList.remove('selected');
            }
        });

        event.target.classList.add('selected');
        const tipPercent = event.target.textContent.slice(0, -1);
        calculateTip(tipPercent);
    });
});

document.querySelector('.reset-button').addEventListener('click', () => {
    document.querySelector('#billInput').value = null;
    document.querySelector('#numPeopleInput').value = null;
    
    tipButtons.forEach(tipButton => { // Remove the selected class from currently selected button
        if (tipButton.classList.contains('selected')) {
            tipButton.classList.remove('selected');
        }
    });

    document.querySelector('#tip-per-person').textContent = "$0.00";
    document.querySelector('#total-per-person').textContent = "$0.00";

    document.querySelector('.reset-button').classList.remove('reset-enabled');
});