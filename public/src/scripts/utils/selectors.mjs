export const $ = (selector, context = document) => context.querySelector(selector) 
|| context.querySelector(`#${selector}`) 
|| context.querySelector(`.${selector}`);

export const $$ = (selector, context = document) => context.querySelectorAll(selector) 
|| context.querySelectorAll(`.${selector}`);