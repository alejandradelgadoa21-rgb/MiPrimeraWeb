// Fauna Data Array (sourced from assets and Wikipedia references)
const faunaData = [
    {
        id: 'mapache',
        name: 'Mapache',
        scientificName: 'Procyon lotor',
        emoji: '🦝',
        category: 'mamiferos',
        image: 'assets/mapache.png',
        wikiUrl: 'https://es.wikipedia.org/wiki/Procyon_lotor',
        habitat: 'Bosques y zonas urbanas de América',
        status: 'Preocupación menor (LC)',
        diet: 'Omnívoro',
        description: 'Conocido por su característico "antazad" negro en la cara y sus patas delanteras extremadamente ágiles. Es famoso por la curiosa costumbre de "lavar" su comida en el agua antes de ingerirla.'
    },
    {
        id: 'okapi',
        name: 'Okapi',
        scientificName: 'Okapia johnstoni',
        emoji: '🦓',
        category: 'exoticos',
        image: 'assets/Okapi.png',
        wikiUrl: 'https://es.wikipedia.org/wiki/Okapia_johnstoni',
        habitat: 'Bosques tropicales del Congo',
        status: 'En peligro (EN)',
        diet: 'Herbívoro',
        description: 'Un pariente vivo cercano de la jirafa con rayas similares a las de una cebra en sus patas traseras. Posee una lengua azul/negra tan larga que puede limpiarse sus propias orejas.'
    },
    {
        id: 'kiwi',
        name: 'Kiwi',
        scientificName: 'Apteryx',
        emoji: '🥝',
        category: 'aves',
        image: 'assets/kiwi.png',
        wikiUrl: 'https://es.wikipedia.org/wiki/Apteryx',
        habitat: 'Bosques de Nueva Zelanda',
        status: 'Vulnerable (VU)',
        diet: 'Insectívoro',
        description: 'Un ave no voladora emblemática de Nueva Zelanda. Sus plumas parecen pelaje y tienen fosas nasales en la punta de su largo pico para detectar alimento bajo tierra.'
    },
    {
        id: 'pudu',
        name: 'Pudú',
        scientificName: 'Pudú',
        emoji: '🦌',
        category: 'mamiferos',
        image: 'assets/pudu.png',
        wikiUrl: 'https://es.wikipedia.org/wiki/Pud%C3%BA',
        habitat: 'Bosques templados del Sur de Chile y Argentina',
        status: 'Vulnerable (VU)',
        diet: 'Herbívoro',
        description: 'El ciervo más pequeño del mundo. Es un animal solitario, esquivo y tímido que habita en densos matorrales de la selva valdiviana.'
    },
    {
        id: 'puma',
        name: 'Puma',
        scientificName: 'Puma concolor',
        emoji: '🐆',
        category: 'felinos',
        image: 'assets/Puma.png',
        wikiUrl: 'https://es.wikipedia.org/wiki/Puma_concolor',
        habitat: 'Montañas y bosques de toda América',
        status: 'Preocupación menor (LC)',
        diet: 'Carnívoro',
        description: 'El segundo felino más grande de América. Destaca por su agilidad extraordinaria: puede dar saltos horizontales de hasta 12 metros y verticales de 5 metros.'
    },
    {
        id: 'equidna',
        name: 'Equidna',
        scientificName: 'Tachyglossus aculeatus',
        emoji: '🦔',
        category: 'exoticos',
        image: 'assets/equidna.png',
        wikiUrl: 'https://es.wikipedia.org/wiki/Tachyglossus_aculeatus',
        habitat: 'Australia y Nueva Guinea',
        status: 'Preocupación menor (LC)',
        diet: 'Insectívoro (Hormigas y termitas)',
        description: 'Junto con el ornitorrinco, es uno de los únicos mamíferos que ponen huevos (monotremas). Su cuerpo está cubierto de espinas defensivas y tiene una lengua pegajosa.'
    }
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    renderFaunaCards(faunaData);
    initFaunaSearchAndFilter();
    initModal();
    initContactForm();
});

/* ==========================================
   THEME TOGGLE
   ========================================== */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    setTheme(savedTheme);
    
    themeBtn?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

/* ==========================================
   MOBILE NAVIGATION
   ========================================== */
function initMobileNav() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    mobileBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn?.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

/* ==========================================
   FAUNA GALLERY & FILTER
   ========================================== */
function renderFaunaCards(items) {
    const container = document.getElementById('animals-grid');
    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p style="font-size: 1.1rem;">No se encontraron especies con esa búsqueda.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(animal => `
        <article class="animal-card" data-id="${animal.id}">
            <div class="animal-img-wrapper">
                <img src="${animal.image}" alt="${animal.name}" class="animal-img" loading="lazy" />
                <span class="animal-badge">${animal.emoji} ${animal.category.toUpperCase()}</span>
            </div>
            <div class="animal-content">
                <div class="animal-header">
                    <h3 class="animal-title">${animal.name}</h3>
                    <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic;">${animal.scientificName}</span>
                </div>
                <p class="animal-desc">${animal.description}</p>
                <div class="animal-meta">
                    <span class="meta-chip"><i class="fas fa-utensils"></i> ${animal.diet}</span>
                    <span class="meta-chip"><i class="fas fa-shield-alt"></i> ${animal.status}</span>
                </div>
                <div class="animal-footer">
                    <a href="${animal.wikiUrl}" target="_blank" rel="noopener noreferrer" class="btn-wiki">
                        <i class="fab fa-wikipedia-w"></i> Wikipedia
                    </a>
                    <button class="btn-detail" onclick="openAnimalModal('${animal.id}')" title="Ver detalles completados">
                        <i class="fas fa-expand-alt"></i>
                    </button>
                </div>
            </div>
        </article>
    `).join('');
}

function initFaunaSearchAndFilter() {
    const searchInput = document.getElementById('search-input');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'todos';
    let searchQuery = '';

    function filterData() {
        const filtered = faunaData.filter(animal => {
            const matchesFilter = currentFilter === 'todos' || animal.category === currentFilter;
            const matchesSearch = animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  animal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  animal.scientificName.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
        renderFaunaCards(filtered);
    }

    searchInput?.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterData();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter') || 'todos';
            filterData();
        });
    });
}

/* ==========================================
   ANIMAL DETAIL MODAL
   ========================================== */
function initModal() {
    const modal = document.getElementById('animal-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openAnimalModal(id) {
    const animal = faunaData.find(item => item.id === id);
    if (!animal) return;

    const modal = document.getElementById('animal-modal');
    const img = document.getElementById('modal-img');
    const title = document.getElementById('modal-title');
    const scientific = document.getElementById('modal-scientific');
    const desc = document.getElementById('modal-desc');
    const habitat = document.getElementById('modal-habitat');
    const wikiBtn = document.getElementById('modal-wiki-link');

    if (img) img.src = animal.image;
    if (title) title.innerHTML = `${animal.emoji} ${animal.name}`;
    if (scientific) scientific.textContent = animal.scientificName;
    if (desc) desc.textContent = animal.description;
    if (habitat) habitat.textContent = animal.habitat;
    if (wikiBtn) wikiBtn.href = animal.wikiUrl;

    modal?.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('animal-modal');
    modal?.classList.remove('active');
}

/* ==========================================
   CONTACT FORM & TOAST
   ========================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        form.reset();
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
