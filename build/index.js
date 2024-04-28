import { ValueNotifier } from "./value.notifier.js"
(function app(){
let ele_vny_column_5479 = document.createElement('vny-column');
ele_vny_column_5479.setAttribute('style','{display:flex;flex-direction:column;}');
let ele_vny_column_661 = document.createElement('vny-column');
ele_vny_column_661.setAttribute('data-css','css_counter')
ele_vny_column_661.setAttribute('style','{display:flex;flex-direction:column;}');
let ele_vny_text_9005 = document.createElement('vny-text');
ele_vny_text_9005.setAttribute('data-css','css_counter')
let ele_signal_3304 = new ValueNotifier(0);
ele_vny_text_9005.innerText = '0'
ele_signal_3304.subcribe(() => ele_vny_text_9005.innerText = `${ele_signal_3304.value}` );
ele_vny_column_661.appendChild(ele_vny_text_9005);
let ele_vny_row_5756 = document.createElement('vny-row');
ele_vny_row_5756.setAttribute('data-css','css_counter')
ele_vny_row_5756.setAttribute('style','{display:flex;}');
let ele_vny_button_1965 = document.createElement('vny-button');
ele_vny_button_1965.setAttribute('data-css','css_counter')
ele_vny_button_1965.innerText = '+'
ele_vny_button_1965.addEventListener('click', (e) => ele_signal_3304.set((v) => v + 10));
ele_vny_row_5756.appendChild(ele_vny_button_1965);
let ele_vny_button_5951 = document.createElement('vny-button');
ele_vny_button_5951.setAttribute('data-css','css_counter')
ele_vny_button_5951.innerText = '-'
ele_vny_button_5951.addEventListener('click', (e) => ele_signal_3304.set((v) => v - 1));
ele_vny_row_5756.appendChild(ele_vny_button_5951);
ele_vny_column_661.appendChild(ele_vny_row_5756);
ele_vny_column_5479.appendChild(ele_vny_column_661);
let ele_vny_column_2419 = document.createElement('vny-column');
ele_vny_column_2419.setAttribute('data-css','css_counter')
ele_vny_column_2419.setAttribute('style','{display:flex;flex-direction:column;}');
let ele_vny_text_7874 = document.createElement('vny-text');
ele_vny_text_7874.setAttribute('data-css','css_counter')
let ele_signal_230 = new ValueNotifier(100);
ele_vny_text_7874.innerText = '100'
ele_signal_230.subcribe(() => ele_vny_text_7874.innerText = `${ele_signal_230.value}` );
ele_vny_column_2419.appendChild(ele_vny_text_7874);
let ele_vny_row_6824 = document.createElement('vny-row');
ele_vny_row_6824.setAttribute('data-css','css_counter')
ele_vny_row_6824.setAttribute('style','{display:flex;}');
let ele_vny_button_5500 = document.createElement('vny-button');
ele_vny_button_5500.setAttribute('data-css','css_counter')
ele_vny_button_5500.innerText = '+'
ele_vny_button_5500.addEventListener('click', (e) => ele_signal_230.set((v) => v + 10));
ele_vny_row_6824.appendChild(ele_vny_button_5500);
let ele_vny_button_3502 = document.createElement('vny-button');
ele_vny_button_3502.setAttribute('data-css','css_counter')
ele_vny_button_3502.innerText = '-'
ele_vny_button_3502.addEventListener('click', (e) => ele_signal_230.set((v) => v - 1));
ele_vny_row_6824.appendChild(ele_vny_button_3502);
ele_vny_column_2419.appendChild(ele_vny_row_6824);
ele_vny_column_5479.appendChild(ele_vny_column_2419);
document.querySelector('body')?.appendChild(ele_vny_column_5479);
}());

