import tabs from './modules/tabs';
import data from './modules/data';
import cards from './modules/cards';
import form from './modules/form';
import loader from './modules/loader';
import modal from './modules/modal';
import slid from './modules/slid';
import accardion from './modules/accardion';
import { openModal } from './modules/modal';
window.addEventListener("DOMContentLoaded", () => {
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 20000);
    tabs();
    data();
    cards();
    form(modalTimer);
    loader();
    modal("[data-modal]", ".modal", modalTimer);
    slid();
    accardion();


});