import { html, css, LitElement } from 'lit-element';

export class RickmortyApi extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
      }
    `;
  }

static get properties() {
    return {
      characters: { type: Array },
    };
  }

  constructor() {
    super();
    this.characters = [];
  }

  async firstUpdated() {
    await fetch('https://rickandmortyapi.com/api/character/')
      .then(r => r.json())
      .then(characters => {
        this.mapInfo(characters.results);
      });
    this.dispatchEvent(new CustomEvent('cargar', { detail: this.characters }));
  }

  mapInfo(characters) {
    characters.forEach((character, index) => {
      let rymarray = {
        name: character.name,
        id: character.id,
        image: character.image
      }
      this.characters = [...this.characters, rymarray]
    });
  }

  render(){
    return html``;
  }

}
