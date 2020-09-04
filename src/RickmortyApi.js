import { html, css, LitElement } from 'lit-element';
import '@polymer/paper-card/paper-card.js';

export class RickmortyApi extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--rickmorty-api-text-color, #000);
      }
    `;
  }

static get properties() {
    return {
      url: { type: String },
      data: { type: Array },
      limit: { type: String }
    };
  }

  constructor() {
    super();
    this.url = "https://rickandmortyapi.com/api/character/";
    this.data = [];
  }

  async firstUpdated() {
    await fetch(`${this.url}`)
      .then(r => r.json())
      .then(data => {
        this.mapInfo(data.results);
      });
    this.dispatchEvent(new CustomEvent('info-loaded', { detail: this.data }));
  }

  mapInfo(data) {
    data.forEach((item, index) => {
      let itm = {
        name: item.name,
        id: item.id,
        image: item.image
      }
      this.data = [...this.data, itm]
    });
  }

}
