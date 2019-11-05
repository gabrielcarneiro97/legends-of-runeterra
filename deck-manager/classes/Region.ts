const regions = ['DE', 'FR', 'IO', 'NX', 'PZ', 'SI'];
const regionsName = ['Demacia', 'Freljord', 'Ionia', 'Noxus', 'Piltover & Zaun', 'Shadow Isles'];

class Region {
  private intId : number;
  private strId : string;
  private fullName : string;

  constructor(intId : number) {
    this.strId = regions[intId];
    if (!this.strId) throw new Error('Region not found!');
    else {
      this.intId = intId;
      this.fullName = regionsName[intId];
    }
  }

  public static fromStrId(strId : string) : Region {
    const intId : number = regions.findIndex((fac) => strId === fac);

    if(intId === -1) throw new Error('Region not found!');
    else return new Region(intId);
  }

  public name() : string {
    return this.fullName;
  }

  public id() : { asInt : number, asStr : string } {
    return {
      asInt: this.intId,
      asStr: this.strId,
    };
  }
}

export default Region;
