import { html, css, LitElement } from 'lit-element';
import '@polymer/paper-button/paper-button.js';

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
      title: { type: String },
      counter: { type: Number },
      data: { type: Array },
      characters: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Hey there';
    this.data = [];
    this.characters = [];

  }


  firstUpdated(){
    fetch('https://rickandmortyapi.com/api/character/')
    .then(r => r.json())
    .then(r => {
      this.data = r.results;
      this.receiveCharacter();
    });
  }


  receiveCharacter() {
    this.data.forEach((character, index) => {
      this.characters.push({
        name: character.name,
        id: character.id,
        image: character.image,
        loc: character.location.name,
        gender: character.gender
      });
    });
    console.log(this.characters);
  }

  render() {
    return html`
        ${this.characters.map(character => html`
          <paper-card>
            <img src="${character.image}">
            <h2>${character.name}</h2>
            <div class="card-content">
              <p>Id: ${character.id}</p>
              <p>Gender: ${character.gender}</p>
              <p>Location: ${character.loc}</p>
            </div>
          </paper-card>
        `)}
    `;
  }
}