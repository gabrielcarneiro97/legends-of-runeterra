import Region from './Region';
import FullCard from './FullCard';

class LiteCard {
  setCode : string;
  region : Region;
  cardNumber : string;
  cardCode : string;
  cardCodeNoT : string;
  t : string;
  private _fullCard : FullCard;

  constructor(setCode : string, region : Region | string, cardNumber : string, t : string) {
    this.setCode = parseInt(setCode, 10).toString().padStart(2, '0');
    this.cardNumber = parseInt(cardNumber, 10).toString().padStart(3, '0');
    this.region = region instanceof Region ? region : Region.fromStrId(region);
    this.t = t;
    this.cardCodeNoT = `${this.setCode}${this.region.id().asStr}${this.cardNumber}`;
    this.cardCode = `${this.cardCodeNoT}${this.t || ''}`;
  }

  static From(cardCode : string) : LiteCard {
    const setCode = cardCode.slice(0, 2);
    const region = Region.fromStrId(cardCode.slice(2, 4));
    const cardNumber = cardCode.slice(4, 7);
    const t = cardCode.slice(7);

    return new LiteCard(setCode, region, cardNumber, t);
  }

  fullCard() {
    if (this._fullCard) return this._fullCard;

    this._fullCard = FullCard.From(this);

    return this._fullCard;
  }
}

export default LiteCard;
