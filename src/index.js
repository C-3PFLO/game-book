import { sayHello } from './helloWorld';

const helloComponent = document.createElement('div');
helloComponent.innerHTML = sayHello('someone');

document.body.appendChild(helloComponent);
