const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
  <section class="h-100">
    <div class="card h-100">
      <div class="card-header d-flex justify-content-between align-items-center">
        <strong>Results</strong>
        <span class="badge text-bg-secondary">0</span>
      </div>

      <div class="list-group list-group-flush">
        </div>
    </div>
  </section>`;

class ResourceResults extends HTMLElement {
  #results = [];
  #filteredResults = [];
  
  constructor() {
    super();
    this._handleResultClick = this._handleResultClick.bind(this);
    this.attachShadow({ mode: 'open' });
  }
  
  set results(data) {
    this.#results = data;
    this.#filteredResults = [...data]; 
    this.render();
  }

  set filters(filters) {
    this.#filteredResults = this.#results.filter((resource) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !resource.title.toLowerCase().includes(q)
          && !resource.summary.toLowerCase().includes(q)
          && !resource.category.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (filters.category !== 'all'
        && resource.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
      if (filters.openNow && !resource.openNow) {
        return false;
      }
      if (filters.virtual && !resource.virtual) {
        return false;
      }
      return true;
    });
    this.render();
  }
 
  _handleResultClick(event) {
    const button = event.target.closest('button[data-id]');
    if (button) {
      const selectedId = button.getAttribute('data-id');
      this.shadowRoot.querySelector('button.active')?.classList.remove('active');
      button.classList.add('active');

      const resource = this.#results.find(r => r.id === selectedId);
      const selectedEvent = new CustomEvent('resource-selected', {
        detail: { resource },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(selectedEvent);
    }
  }

  connectedCallback() {
    this.shadowRoot.addEventListener('click', this._handleResultClick);
    this.render();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this._handleResultClick);
  }

  render() {
    const content = template.content.cloneNode(true);
    const badge = content.querySelector('.badge');
    
    if (badge) {
      badge.textContent = this.#filteredResults.length;
    }

    if (this.#filteredResults.length) {
      const resultsHtml = this.#filteredResults.map(result => `
        <button type="button" class="list-group-item list-group-item-action" data-id="${result.id}">
          <div class="d-flex w-100 justify-content-between">
            <h2 class="h6 mb-1">${result.title}</h2>
            <small>${result.category}</small>
          </div>
          <p class="mb-1 small text-body-secondary">${result.summary}</p>
          <small class="text-body-secondary">${result.location}</small>
        </button>`);
      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = resultsHtml.join('');
    } else {
      const listGroup = content.querySelector('.list-group');
      listGroup.innerHTML = `
        <div class="list-group-item">
          <p class="mb-0">No results found.</p>
        </div>`;
    }

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(content);
  }
}

customElements.define('resource-results', ResourceResults);