'use strict';

/**
 * =============================================
 * PrimeRX - Scripts principales
 * =============================================
 */

// =============================================
// 1. FILTRO DE CATEGORÍAS DE PRODUCTOS
// =============================================
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card[data-category]');

/**
 * Filtra los productos según la categoría seleccionada
 * @param {string} category - La categoría a filtrar ('todos' para mostrar todos)
 */
function filterProducts(category) {
    productCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'todos' || cardCategory === category) {
            // Mostrar producto con animación
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Trigger reflow para la animación
            void card.offsetWidth;
            
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            // Ocultar producto
            card.style.display = 'none';
        }
    });
}

if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Resetear estilos de todos los botones
            categoryBtns.forEach(b => {
                b.classList.remove('bg-blue-600', 'text-white');
                b.classList.add('bg-gray-200', 'hover:bg-gray-300');
            });
            
            // Activar el botón seleccionado
            btn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
            btn.classList.add('bg-blue-600', 'text-white');
            
            // Filtrar productos por categoría
            const selectedCategory = btn.dataset.category || 'todos';
            filterProducts(selectedCategory);
        });
    });
}

// =============================================
// 2. MODAL DE PRODUCTO
// =============================================
const modalProducto = document.getElementById('modalProducto');

/**
 * Abre el modal con la información del producto
 * @param {HTMLElement} btn - Botón que contiene los datos del producto
 */
function openProductModal(btn) {
    if (!modalProducto || !btn) return;

    // Rellenar datos desde los atributos data-* del botón
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalRating = document.getElementById('modalRating');
    const modalDesc = document.getElementById('modalDesc');
    const modalPresentations = document.getElementById('modalPresentations');
    const modalFlavors = document.getElementById('modalFlavors');
    const modalImage = document.getElementById('modalImage');

    if (modalTitle) modalTitle.textContent = btn.dataset.title || '';
    if (modalPrice) modalPrice.textContent = btn.dataset.price || '';
    if (modalRating) modalRating.textContent = btn.dataset.rating || '';
    if (modalDesc) modalDesc.textContent = btn.dataset.desc || '';
    if (modalPresentations) modalPresentations.textContent = btn.dataset.presentations || '';
    if (modalFlavors) modalFlavors.textContent = btn.dataset.flavors || '';
    if (modalImage) modalImage.src = btn.dataset.image || '';

    // Mostrar modal
    modalProducto.classList.remove('hidden');
    modalProducto.classList.add('flex');

    // Desactivar scroll del fondo
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal del producto
 */
function closeProductModal() {
    if (!modalProducto) return;

    modalProducto.classList.remove('flex');
    modalProducto.classList.add('hidden');

    // Restaurar scroll del fondo
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', (e) => {
    if (modalProducto && modalProducto.classList.contains('flex') && e.target === modalProducto) {
        closeProductModal();
    }
});

// =============================================
// 3. MENÚ MÓVIL (HAMBURGUESA)
// =============================================
const menuBtn = document.getElementById('menu-btn');
const menuLinks = document.getElementById('menu-links');

if (menuBtn && menuLinks) {
    // Toggle del menú al hacer clic en el botón hamburguesa
    menuBtn.addEventListener('click', () => {
        menuLinks.classList.toggle('hidden');
    });

    // Cerrar el menú al hacer clic en cualquier enlace
    const links = menuLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.classList.add('hidden');
        });
    });

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !menuLinks.contains(e.target)) {
            menuLinks.classList.add('hidden');
        }
    });
}