// categorias
const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white');
            b.classList.add('bg-gray-200', 'hover:bg-gray-300');
        });
        btn.classList.remove('bg-gray-200', 'hover:bg-gray-300');
        btn.classList.add('bg-blue-600', 'text-white');
        console.log(`Filtering by: ${btn.textContent.trim()}`);
    });
});

// modal del producto
function openProductModal(btn) {
    const modal = document.getElementById('modalProducto');

    // Rellenar datos desde los atributos del botón
    document.getElementById('modalTitle').textContent = btn.dataset.title || '';
    document.getElementById('modalPrice').textContent = btn.dataset.price || '';
    document.getElementById('modalRating').textContent = btn.dataset.rating || '';
    document.getElementById('modalDesc').textContent = btn.dataset.desc || '';
    document.getElementById('modalPresentations').textContent = btn.dataset.presentations || '';
    document.getElementById('modalFlavors').textContent = btn.dataset.flavors || '';
    document.getElementById('modalImage').src = btn.dataset.image || '';

    // Mostrar modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Desactivar scroll de fondo
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    const modal = document.getElementById('modalProducto');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});

// Cerrar clic fuera del modal
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalProducto');
    if (modal.classList.contains('flex') && e.target === modal) closeProductModal();
});

const menuBtn = document.getElementById('menu-btn');
const menuLinks = document.getElementById('menu-links');

menuBtn.addEventListener('click', () => {
    menuLinks.classList.toggle('hidden');
});

// Opcional: cerrar el menú al hacer clic en un enlace
const links = menuLinks.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', () => {
    menuLinks.classList.add('hidden');
    });
});