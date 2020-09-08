import {today} from './today/index.js';
import classes from './main.css';

const onLoad = () => {
    document.getElementById('app').innerHTML = today();
}

document.addEventListener('DOMContentLoaded', onLoad);
