import LiteCard from './LiteCard';

const { lang } = require('../config.json');
const sets = {
  '01': {
    'en_us': require('../data-sets/set1-en_us.json'),
  }
}

class FullCard {
  public associatedCards : string[];
  public associatedCardRefs : string[];
  public assets : any[];
  public region : string;
  public regionRef : string;
  public attack : number;
  public cost : number;
  public health : number;
  public description : string;
  public descriptionRaw : string;
  public flavorText : string;
  public artistName : string;
  public name : string;
  public cardCode : string;
  public keywords : string[];
  public keywordsRef : string[];
  public spellSpeed: string;
  public spellSpeedRef : string;
  public rarity : string;
  public rarityRef : string;
  public subtype : string;
  public supertype : string;
  public type : string;
  public collectable : boolean;

  constructor(obj : any) {
    Object.keys(obj).forEach((k) => {
      this[k] = obj[k];
    });
  }

  static From(liteCard : LiteCard) : FullCard {
    const set = sets[liteCard.setCode][lang];

    const flatCard = set.find((c) => c.cardCode === liteCard.cardCode);
    if (!flatCard) throw new Error('Invalid Card!');
    else return new FullCard(flatCard);
  }
}

export default FullCard;
