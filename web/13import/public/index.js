// import { sum, sub } from './math.js';
// console.log(sum(2,3), sub(1,2));

import {today} from './today/index.js';

const onLoad = () => {
    document.getElementById('app').innerHTML = today();
}

document.addEventListener('DOMContentLoaded', onLoad);
