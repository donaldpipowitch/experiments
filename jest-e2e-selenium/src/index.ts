import { add } from './add';
import { subtract } from './subtract';

const addElement = document.createElement('p');
addElement.classList.add('e2e-add');
addElement.appendChild(document.createTextNode(`1 + 2 = ${add(1, 2)}`));

const subtractElement = document.createElement('p');
subtractElement.classList.add('e2e-subtract');
subtractElement.appendChild(
  document.createTextNode(`1 - 2 = ${subtract(1, 2)}`)
);

const app = document.getElementById('app')!;
app.innerHTML = '';
app.appendChild(addElement);
app.appendChild(subtractElement);
