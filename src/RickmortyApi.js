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
      });
    });
    console.log(this.characters);
    this.dispatchEvent(new CustomEvent('comunicar',{detail: this.characters}));
  }

  render() {
    return html``;
  }
}