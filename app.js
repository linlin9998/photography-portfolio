(() => {
  const photos = Array.isArray(window.PHOTOS) ? window.PHOTOS : [];
  const grid = document.querySelector('#photo-grid');
  const count = document.querySelector('.result-count');
  const filters = [...document.querySelectorAll('.filter')];
  const totalCount = document.querySelector('[data-total-count]');
  const viewer = document.querySelector('.viewer');

  if (totalCount) totalCount.textContent = String(photos.length).padStart(2, '0');
  let visible = photos.slice();
  let activeIndex = 0;

  function render(items) {
    visible = items;
    grid.replaceChildren();
    count.textContent = `${String(items.length).padStart(2, '0')} PHOTOGRAPHS`;
    items.forEach((photo, index) => {
      const figure = document.createElement('figure');
      figure.className = 'photo-card';
      figure.tabIndex = 0;
      figure.setAttribute('role', 'button');
      figure.setAttribute('aria-label', `查看照片：${photo.title}`);
      const wrap = document.createElement('div');
      wrap.className = 'photo-image-wrap';
      const image = document.createElement('img');
      image.className = 'photo-image';
      image.src = photo.image;
      image.alt = photo.alt || photo.title;
      image.loading = index < 2 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', () => {
        image.classList.add('is-broken');
        if (!wrap.querySelector('.image-fallback')) {
          const fallback = document.createElement('span');
          fallback.className = 'image-fallback';
          fallback.textContent = 'IMAGE UNAVAILABLE';
          wrap.append(fallback);
        }
      });
      wrap.append(image);
      const caption = document.createElement('figcaption');
      caption.className = 'photo-meta';
      const title = document.createElement('span');
      title.className = 'photo-title';
      title.textContent = photo.title;
      const place = document.createElement('span');
      place.className = 'photo-place';
      place.textContent = `${photo.place} · ${photo.year}`;
      caption.append(title, place);
      figure.append(wrap, caption);
      figure.addEventListener('click', () => openViewer(index));
      figure.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openViewer(index);
        }
      });
      grid.append(figure);
    });
  }

  function openViewer(index) {
    activeIndex = index;
    updateViewer();
    viewer.showModal();
  }

  function updateViewer() {
    const photo = visible[activeIndex];
    if (!photo) return;
    const image = viewer.querySelector('.viewer-image');
    image.src = photo.image;
    image.alt = photo.alt || photo.title;
    viewer.querySelector('.viewer-caption').textContent = `${photo.title}  /  ${photo.place} · ${photo.year}`;
  }

  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    const category = button.dataset.filter;
    render(category === 'all' ? photos : photos.filter(photo => photo.category === category));
  }));

  viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
  viewer.querySelector('.viewer-prev').addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + visible.length) % visible.length;
    updateViewer();
  });
  viewer.querySelector('.viewer-next').addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % visible.length;
    updateViewer();
  });
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') viewer.querySelector('.viewer-prev').click();
    if (event.key === 'ArrowRight') viewer.querySelector('.viewer-next').click();
  });
  render(photos);
})();
