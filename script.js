'use strict';

(() => {
  const variants = {
    100: { sku: '01306', price: 326.4, oldPrice: 349.2 },
    500: { sku: '01307', price: 1432, oldPrice: 1646 },
    1000: { sku: '01308', price: 2064, oldPrice: 2592 },
    5000: { sku: '01309', price: 6320, oldPrice: 8710 },
  };

  const currency = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const form = document.querySelector('#purchase-form');
  const sku = document.querySelector('#product-sku');
  const price = document.querySelector('#product-price');
  const oldPrice = document.querySelector('#product-old-price');
  const discount = document.querySelector('#product-discount');
  const savings = document.querySelector('#product-savings');
  const buttonWeight = document.querySelector('#button-weight');
  const status = document.querySelector('#cart-status');

  function updateVariant() {
    const weight = form.elements.weight.value;
    const variant = variants[weight];

    // Keep kopecks visible for the 100 g option, as in the assignment.
    const formatPrice = (amount) => currency.format(amount).replace(/,00(?=\s)/u, '');
    sku.textContent = variant.sku;
    price.textContent = formatPrice(variant.price);
    oldPrice.textContent = formatPrice(variant.oldPrice);
    savings.textContent = formatPrice(variant.oldPrice - variant.price);
    discount.textContent = `−${Math.round((1 - variant.price / variant.oldPrice) * 100)}%`;
    buttonWeight.textContent = `${weight} г`;
    status.textContent = '';
  }

  form.addEventListener('change', updateVariant);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = `Вы выбрали «Ананасовый улун», ${form.elements.weight.value} г, ${price.textContent}. Это демонстрационная страница: заказ не оформляется.`;
  });

  // Restore a coherent state if the browser retained a previously selected radio.
  updateVariant();
  form.querySelector('fieldset').disabled = false;
  form.querySelector('button[type="submit"]').disabled = false;

  const dialog = document.querySelector('.image-dialog');
  const zoomButton = document.querySelector('.zoom-button');
  const closeButton = dialog.querySelector('.dialog-close');

  if (typeof dialog.showModal === 'function') {
    zoomButton.hidden = false;
    zoomButton.addEventListener('click', () => dialog.showModal());
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) {
        dialog.close();
      }
    });
  }
})();
