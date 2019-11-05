import LiteCard from './LiteCard';
import Region from './Region';

class Deck {
  static cardsMax : number = 40;

  public cards : LiteCard[];
  public cardsCounter : Record<string, number>;
  public regions : Region[];
  public length : number;
  public deckCode : string;

  private _orderedCardsCode : string[];

  constructor() {
    this.length = 0;
  }

  public isFull = () : boolean => this.length === Deck.cardsMax;

  private checkRegion(card : LiteCard) : boolean {
    if (this.regions.length < 2) {
      this.regions.push(card.region);
      return true;
    } else if (this.regions.find((r) => r.id().asInt === card.region.id().asInt)) {
      return true;
    }

    throw new Error(`The card ${card.cardCode} isn't from ${this.regions[0]} or ${this.regions[1]}`);
  }

  renewDeckCode() {

  }

  private checkNum(card : LiteCard) : boolean {
    const { cardCode } = card;
    if (this.cardsCounter[cardCode]) {
      if (this.cardsCounter[cardCode] === 3) throw new Error("You can't add more of this card");
      else this.cardsCounter[cardCode] += 1;
    } else this.cardsCounter[cardCode] = 1;


    return true;
  }

  public orderedCodes() : Record<number, Record<number, Set<string>>> {
    const regionCodes = this.regions.map((r) => r.id().asInt);
    regionCodes.sort((a, b) => a - b);
    let ordered : Record<number, Record<number, Set<string>>>;

    const byRegionCards = regionCodes.map((regionCode) => this.cards.filter((card) => card.region.id().asInt === regionCode));


    ordered[3] = {};
    ordered[2] = {};
    ordered[1] = {};

    byRegionCards.forEach((cards, i) => {
      const region = regionCodes[i];
      cards.forEach((card) => {
        const cardQnt = this.cardsCounter[card.cardCode];
        ordered[cardQnt][region] = ordered[cardQnt][region] ? ordered[cardQnt][region].add(card.cardCode) : new Set<string>().add(card.cardCode);
      });
    });

    return ordered;
  }

  addCard(card : LiteCard) {
    if (this.isFull()) throw new Error(`This deck already have ${Deck.cardsMax} cards`);
    else {
      try {
        this.checkRegion(card);
        this.checkNum(card);
        this.cards.push(card);
        this.length = this.cards.length;
        this.renewDeckCode();
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }
}
