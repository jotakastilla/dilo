const CART_STORAGE_KEY = 'dilo-vinilo-demo-cart';
const cartButton = document.querySelector('#cart-button');
const cartCount = document.querySelector('#cart-count');
const cartDialog = document.querySelector('#cart-dialog');
const cartClose = document.querySelector('.cart-close');
const cartItems = document.querySelector('#cart-items');
const cartEmpty = document.querySelector('#cart-empty');
const cartSummary = document.querySelector('#cart-summary');
const cartTotal = document.querySelector('#cart-total');
const cartContinue = document.querySelector('#cart-continue');
const preparingDialog = document.querySelector('#preparing-dialog');
const preparingClose = document.querySelector('.preparing-close');
const preparingBack = document.querySelector('#preparing-back');

function readCart() { try { return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []; } catch { return []; } }
let cart = readCart();
function saveCart() { try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); } catch {} }
function itemCount() { return cart.reduce((total, item) => total + item.quantity, 0); }
function updateCartCount() { const count = itemCount(); cartCount.textContent = count; cartCount.setAttribute('aria-label', `${count} ${count === 1 ? 'selección' : 'selecciones'}`); }
function renderCart() {
  const empty = cart.length === 0;
  cartItems.replaceChildren(...cart.map((item) => {
    const row = document.createElement('article'); row.className = 'cart-item';
    row.innerHTML = `<div class="cart-item-image"><img src="${item.cover}" alt=""></div><div class="cart-item-copy"><strong>${item.album}</strong><span>${item.artist} · para “${item.mood}”</span></div><div class="cart-item-actions"><button type="button" data-action="decrease" data-id="${item.id}" aria-label="Quitar una unidad">−</button><span aria-label="Cantidad">${item.quantity}</span><button type="button" data-action="increase" data-id="${item.id}" aria-label="Añadir una unidad">+</button><button class="cart-remove" type="button" data-action="remove" data-id="${item.id}">Quitar</button></div>`;
    return row;
  }));
  cartEmpty.hidden = !empty; cartSummary.hidden = empty; cartContinue.disabled = empty;
  cartTotal.textContent = `${itemCount()} ${itemCount() === 1 ? 'disco demo' : 'discos demo'}`;
  updateCartCount(); saveCart();
}
function addToCart(detail) { const id = `${detail.mood}-${detail.album.album}`; const existing = cart.find((item) => item.id === id); if (existing) existing.quantity += 1; else cart.push({ id, mood: detail.mood, artist: detail.album.artist, album: detail.album.album, cover: detail.album.cover, quantity: 1 }); renderCart(); }
document.addEventListener('cart:add', (event) => addToCart(event.detail));
cartButton.addEventListener('click', () => { renderCart(); cartDialog.showModal(); cartClose.focus(); });
cartClose.addEventListener('click', () => cartDialog.close());
cartDialog.addEventListener('click', (event) => { if (event.target === cartDialog) cartDialog.close(); });
cartItems.addEventListener('click', (event) => { const button = event.target.closest('button[data-action]'); if (!button) return; const item = cart.find((entry) => entry.id === button.dataset.id); if (!item) return; if (button.dataset.action === 'increase') item.quantity += 1; if (button.dataset.action === 'decrease') item.quantity -= 1; if (button.dataset.action === 'remove' || item.quantity < 1) cart = cart.filter((entry) => entry.id !== item.id); renderCart(); });
cartContinue.addEventListener('click', () => { cartDialog.close(); preparingDialog.showModal(); preparingClose.focus(); });
preparingClose.addEventListener('click', () => preparingDialog.close());
preparingBack.addEventListener('click', () => preparingDialog.close());
preparingDialog.addEventListener('click', (event) => { if (event.target === preparingDialog) preparingDialog.close(); });
renderCart();
