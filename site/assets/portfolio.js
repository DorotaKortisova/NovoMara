/* Progressive enhancements for a manual project slideshow and image viewer. */
(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const initNavigation = () => {
    const toggle = document.querySelector('[data-menu-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    if (!toggle || !nav) return;

    const mobile = window.matchMedia('(max-width: 780px)');
    let open = false;
    const render = () => {
      nav.hidden = mobile.matches && !open;
      toggle.setAttribute('aria-expanded', String(mobile.matches && open));
    };
    toggle.addEventListener('click', () => {
      open = !open;
      render();
    });
    nav.addEventListener('click', (event) => {
      if (!event.target.closest('a')) return;
      open = false;
      render();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !open || !mobile.matches) return;
      open = false;
      render();
      toggle.focus();
    });
    const onViewportChange = () => {
      open = false;
      render();
    };
    if (mobile.addEventListener) mobile.addEventListener('change', onViewportChange);
    else mobile.addListener(onViewportChange);
    render();
  };

  const compactProjects = window.matchMedia('(min-width: 900px) and (min-height: 580px)');

  const initProjectGallery = (slide, title) => {
    const media = slide.querySelector('.project-media');
    const stage = media?.querySelector('.project-gallery-stage');
    if (!stage) return null;
    const figures = Array.from(stage.children).filter((item) => item.tagName === 'FIGURE');
    if (!figures.length) return null;
    let currentImage = 0;

    const toolbar = document.createElement('div');
    toolbar.className = 'project-gallery-toolbar';
    toolbar.dataset.projectGalleryToolbar = '';
    const count = document.createElement('div');
    count.className = 'project-gallery-count';
    const label = document.createElement('span');
    label.className = 'project-gallery-label';
    label.textContent = 'Images';
    const counter = document.createElement('span');
    counter.dataset.projectImageCounter = '';
    count.append(label, counter);
    const selectors = document.createElement('div');
    selectors.className = 'project-image-selectors';
    selectors.setAttribute('role', 'group');
    selectors.setAttribute('aria-label', `Images in ${title}`);
    const status = document.createElement('p');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');

    const buttons = figures.map((figure, index) => {
      const source = figure.querySelector('img');
      figure.id ||= `${slide.id}-image-${index + 1}`;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'project-image-selector';
      button.dataset.projectImageSelect = String(index);
      button.setAttribute('aria-controls', figure.id);
      button.setAttribute('aria-label', `Image ${index + 1} of ${figures.length}: ${source?.alt || title}`);
      if (source) {
        const thumbnail = source.cloneNode();
        thumbnail.alt = '';
        thumbnail.loading = 'lazy';
        thumbnail.setAttribute('aria-hidden', 'true');
        button.append(thumbnail);
      }
      const number = document.createElement('span');
      number.className = 'project-image-number';
      number.setAttribute('aria-hidden', 'true');
      number.textContent = String(index + 1).padStart(2, '0');
      button.append(number);
      selectors.append(button);
      return button;
    });
    toolbar.append(count, selectors);
    media.append(toolbar, status);

    const fitImages = () => {
      figures.forEach((figure) => {
        const image = figure.querySelector('img');
        const anchor = figure.querySelector('a');
        if (!image || !anchor) return;
        if (!compactProjects.matches) {
          image.style.removeProperty('width');
          image.style.removeProperty('height');
          return;
        }
        if (figure.hidden || !image.naturalWidth || !image.naturalHeight) return;
        const bounds = anchor.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const scale = Math.min(1, bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
        image.style.width = `${image.naturalWidth * scale}px`;
        image.style.height = `${image.naturalHeight * scale}px`;
      });
    };
    figures.forEach((figure) => figure.querySelector('img')?.addEventListener('load', fitImages));
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(fitImages);
      figures.forEach((figure) => {
        const anchor = figure.querySelector('a');
        if (anchor) observer.observe(anchor);
      });
    } else window.addEventListener('resize', fitImages, { passive: true });

    const render = () => {
      figures.forEach((figure, index) => { figure.hidden = compactProjects.matches && index !== currentImage; });
      buttons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === currentImage)));
      counter.textContent = `${String(currentImage + 1).padStart(2, '0')} / ${String(figures.length).padStart(2, '0')}`;
      toolbar.hidden = !compactProjects.matches;
      media.dataset.galleryReady = 'true';
      media.dataset.galleryCompact = String(compactProjects.matches);
      requestAnimationFrame(fitImages);
    };
    const select = (index, { announce = true } = {}) => {
      const previousFigure = figures[currentImage];
      const focusWasInsideImage = previousFigure.contains(document.activeElement);
      currentImage = (index + figures.length) % figures.length;
      render();
      if (announce) status.textContent = `${title}. Image ${currentImage + 1} of ${figures.length}. ${figures[currentImage].querySelector('img')?.alt || ''}`;
      if (focusWasInsideImage && previousFigure !== figures[currentImage]) buttons[currentImage].focus({ preventScroll: true });
    };
    buttons.forEach((button, index) => button.addEventListener('click', () => select(index)));
    media.addEventListener('keydown', (event) => {
      if (!compactProjects.matches || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      event.stopPropagation();
      select(currentImage + (event.key === 'ArrowRight' ? 1 : -1));
    });
    const onViewportChange = () => {
      const focusedIndex = figures.findIndex((figure) => figure.contains(document.activeElement));
      if (focusedIndex >= 0) currentImage = focusedIndex;
      render();
    };
    if (compactProjects.addEventListener) compactProjects.addEventListener('change', onViewportChange);
    else compactProjects.addListener(onViewportChange);
    render();
    return { moveBy: (delta) => select(currentImage + delta), render };
  };

  const initProjectDetails = (slide) => {
    const details = slide.querySelector('[data-project-details-scroll]');
    const hint = slide.querySelector('[data-project-scroll-hint]');
    if (!details || !hint) return () => {};
    const render = () => {
      if (slide.hidden) return;
      // Decide against the space available without the hint. Its own footprint
      // must not make otherwise fitting content look as though it overflows.
      let hintSpace = 0;
      if (!hint.hidden && compactProjects.matches) {
        const style = window.getComputedStyle(hint);
        hintSpace = hint.getBoundingClientRect().height +
          (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0);
      }
      const availableHeight = details.clientHeight + hintSpace;
      const overflow = compactProjects.matches && details.scrollHeight > availableHeight + 2;
      details.tabIndex = overflow ? 0 : -1;
      details.dataset.overflow = String(overflow);
      hint.hidden = !overflow;
      // Reading clientHeight here measures the final layout after hint changes.
      const moreBelow = details.scrollTop + details.clientHeight < details.scrollHeight - 4;
      hint.textContent = moreBelow ? 'Scroll for more details ↓' : '↑ More project details above';
    };
    let renderQueued = false;
    const scheduleRender = () => {
      if (renderQueued) return;
      renderQueued = true;
      requestAnimationFrame(() => {
        renderQueued = false;
        render();
      });
    };
    details.addEventListener('scroll', render, { passive: true });
    details.addEventListener('toggle', scheduleRender, true);
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(scheduleRender);
      observer.observe(details);
      Array.from(details.children).forEach((child) => observer.observe(child));
    } else window.addEventListener('resize', render, { passive: true });
    if (compactProjects.addEventListener) compactProjects.addEventListener('change', render);
    else compactProjects.addListener(render);
    render();
    return render;
  };

  const initCarousel = (carousel) => {
    const slides = Array.from(carousel.querySelectorAll('[data-project-slide]'));
    if (!slides.length) return;

    const selectors = Array.from(carousel.querySelectorAll('[data-project-select]'));
    const previous = carousel.querySelector('[data-project-prev]');
    const next = carousel.querySelector('[data-project-next]');
    const counter = carousel.querySelector('[data-project-counter]');
    const status = carousel.querySelector('[data-project-status]');
    let current = 0;

    const titleFor = (slide) => slide.dataset.projectTitle ||
      slide.querySelector('.project-title, .project-info h2, .project-info h3, h2, h3')?.textContent.trim() ||
      slide.dataset.projectSlide;

    const galleries = new Map(slides.map((slide) => [slide, initProjectGallery(slide, titleFor(slide))]));
    const detailRenderers = new Map(slides.map((slide) => [slide, initProjectDetails(slide)]));

    const indexFromHash = () => {
      if (!window.location.hash) return -1;
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); }
      catch { return -1; }
      return slides.findIndex((slide) => slide.id === id || `project-${slide.dataset.projectSlide}` === id);
    };

    const alignCompactFrame = () => {
      if (!compactProjects.matches) return;
      const headerBottom = document.querySelector('.site-header')?.getBoundingClientRect().bottom || 0;
      if (Math.abs(carousel.getBoundingClientRect().top - headerBottom) <= 1) return;
      carousel.scrollIntoView({ block: 'start', behavior: 'instant' });
    };

    const select = (index, { announce = true, updateHash = false, alignFrame = false } = {}) => {
      const selected = (index + slides.length) % slides.length;
      const previousSlide = slides[current];
      const focusWasInsideSlide = previousSlide.contains(document.activeElement);
      current = selected;
      const activeSlide = slides[current];

      slides.forEach((slide, slideIndex) => { slide.hidden = slideIndex !== current; });
      selectors.forEach((button) => {
        const active = button.dataset.projectSelect === activeSlide.dataset.projectSlide;
        button.setAttribute('aria-pressed', String(active));
      });
      if (counter) counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      if (previous) previous.setAttribute('aria-label', `Previous project: ${titleFor(slides[(current - 1 + slides.length) % slides.length])}`);
      if (next) next.setAttribute('aria-label', `Next project: ${titleFor(slides[(current + 1) % slides.length])}`);

      if (announce && status) status.textContent = `${titleFor(activeSlide)}. Project ${current + 1} of ${slides.length}.`;
      if (updateHash) {
        const hash = activeSlide.id || `project-${activeSlide.dataset.projectSlide}`;
        try { window.history.replaceState(null, '', `#${encodeURIComponent(hash)}`); }
        catch { /* Selection remains usable if the browser restricts history. */ }
      }

      // A keyboard gesture from a link in the previous slide must not strand focus.
      if (focusWasInsideSlide && previousSlide !== activeSlide) {
        const activeSelector = selectors.find((button) => button.dataset.projectSelect === activeSlide.dataset.projectSlide);
        (activeSelector || next || previous)?.focus({ preventScroll: true });
      }
      requestAnimationFrame(() => {
        galleries.get(activeSlide)?.render();
        detailRenderers.get(activeSlide)?.();
        if (alignFrame) alignCompactFrame();
      });
    };

    selectors.forEach((button) => {
      const index = slides.findIndex((slide) => slide.dataset.projectSlide === button.dataset.projectSelect);
      if (index < 0) return;
      if (slides[index].id) button.setAttribute('aria-controls', slides[index].id);
      button.addEventListener('click', (event) => {
        event.preventDefault();
        select(index, { updateHash: true, alignFrame: true });
      });
    });
    previous?.addEventListener('click', () => select(current - 1, { updateHash: true, alignFrame: true }));
    next?.addEventListener('click', () => select(current + 1, { updateHash: true, alignFrame: true }));

    carousel.addEventListener('keydown', (event) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target.closest('input, textarea, select, [contenteditable="true"], dialog')) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      select(current + (event.key === 'ArrowRight' ? 1 : -1), { updateHash: true, alignFrame: true });
    });

    // Gesture detection only enhances the image area; vertical reading stays native.
    carousel.querySelectorAll('.project-media').forEach((media) => {
      let start = null;
      let suppressClickUntil = 0;
      media.addEventListener('pointerdown', (event) => {
        if (event.pointerType !== 'touch' || !event.isPrimary) return;
        start = { x: event.clientX, y: event.clientY, id: event.pointerId, at: Date.now() };
      }, { passive: true });
      media.addEventListener('pointerup', (event) => {
        if (!start || event.pointerId !== start.id) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        const elapsed = Date.now() - start.at;
        start = null;
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5 || elapsed > 900) return;
        suppressClickUntil = Date.now() + 400;
        const gallery = galleries.get(media.closest('[data-project-slide]'));
        if (compactProjects.matches && gallery) gallery.moveBy(dx < 0 ? 1 : -1);
        else select(current + (dx < 0 ? 1 : -1), { updateHash: true, alignFrame: true });
      }, { passive: true });
      media.addEventListener('pointercancel', () => { start = null; }, { passive: true });
      media.addEventListener('click', (event) => {
        if (Date.now() >= suppressClickUntil) return;
        event.preventDefault();
        event.stopPropagation();
      }, true);
    });

    window.addEventListener('hashchange', () => {
      const index = indexFromHash();
      if (index >= 0) select(index, { alignFrame: true });
    });
    carousel.dataset.carouselReady = 'true';
    const initial = indexFromHash();
    select(initial >= 0 ? initial : 0, { announce: false, alignFrame: initial >= 0 });
    if (initial >= 0) {
      window.addEventListener('load', () => {
        if (indexFromHash() >= 0) requestAnimationFrame(alignCompactFrame);
      }, { once: true });
    }
  };

  const initImageViewer = () => {
    // Links still open their original image in browsers without native dialogs.
    if (typeof HTMLDialogElement === 'undefined') return;
    let dialog;
    let image;
    let caption;
    let returnFocus;

    const createDialog = () => {
      dialog = document.createElement('dialog');
      dialog.className = 'image-dialog';
      dialog.setAttribute('aria-label', 'Enlarged portfolio image');

      const inner = document.createElement('div');
      inner.className = 'image-dialog-inner';
      const close = document.createElement('button');
      close.className = 'image-dialog-close';
      close.type = 'button';
      close.textContent = 'Close ×';
      close.setAttribute('aria-label', 'Close image viewer');
      close.autofocus = true;
      close.addEventListener('click', () => dialog.close());

      const figure = document.createElement('figure');
      image = document.createElement('img');
      caption = document.createElement('figcaption');
      figure.append(image, caption);
      inner.append(close, figure);
      dialog.append(inner);
      document.body.append(dialog);

      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      });
      dialog.addEventListener('close', () => {
        document.body.classList.remove('lightbox-open');
        if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
        image.removeAttribute('src');
      });
    };

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-image-open]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      // Honor ordinary navigation for an asset that isn't a browser image.
      const url = new URL(link.href, window.location.href);
      if (!/\.(?:avif|gif|jpe?g|png|svg|webp)$/i.test(url.pathname)) return;
      event.preventDefault();
      if (!dialog) createDialog();
      returnFocus = link;
      const sourceImage = link.querySelector('img');
      const sourceCaption = link.closest('figure')?.querySelector('figcaption');
      image.src = link.href;
      image.alt = sourceImage?.alt || '';
      caption.textContent = sourceCaption?.textContent.trim() || link.dataset.imageCaption || sourceImage?.alt || '';
      caption.hidden = !caption.textContent;
      dialog.showModal();
      document.body.classList.add('lightbox-open');
    });
  };

  const init = () => {
    initNavigation();
    document.querySelectorAll('[data-project-carousel]').forEach(initCarousel);
    initImageViewer();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
