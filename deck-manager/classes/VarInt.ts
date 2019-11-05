class VarInt {
  static AllButMSB = 0x7f;
  static MSB = 0x80;

  static pop (bytes) : number {
    let result = 0;
    let currentShift = 0;
    let popped = 0;
    for (let i = 0; i < bytes.length; i += 1) {
      popped += 1;
      const current = bytes[i] & VarInt.AllButMSB;
      result |= current << currentShift;

      if ((bytes[i] & VarInt.MSB) !== VarInt.MSB) {
        bytes.splice(0, popped);
        return result;
      }

      currentShift += 7;
    }

    throw new Error('Byte array did not contain valid varints.');
  }

  static get (value) : number[] {
    const buff = new Array(10).fill(0);

    let currentIndex = 0;
    if (value === 0) return [0];

    while (value !== 0) {
      let byteVal = value & VarInt.AllButMSB;
      value >>>= 7;

      if (value !== 0) byteVal |= VarInt.MSB;
      buff[currentIndex++] = byteVal;
    }

    return buff.slice(0, currentIndex);
  }
}

module.exports = VarInt