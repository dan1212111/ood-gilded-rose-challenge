const Item = require('./item.js')
const SULFURAS = 'Sulfuras, Hand of Ragnaros'
const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert'
const AGED_BRIE = 'Aged Brie'
const CONJURED = 'Conjured'

class Shop {
  constructor () {
    this.items = []
  }

  createItem (name, sellIn, quality) {
    if (name !== SULFURAS && quality > 50) {
      return 'Item Quality Set Too High'
    }
    const item = new Item(name, sellIn, quality)
    this.items.push(item)
    return item
  }

  updateQuality () {
    // regular Items lower quality (-1) at end of each day - but not Sulfuras, Aged Brie or Backstage passes
    for (let i = 0; i < this.items.length; i++) {
      const itemsName = this.items[i].name
      const itemsQuality = this.items[i].quality
      if (
        itemsName !== AGED_BRIE &&
        itemsName !== BACKSTAGE &&
        itemsName !== SULFURAS &&
        itemsQuality > 0
      ) {
        this.items[i].quality -= 1
        if (itemsName === CONJURED) {
          this.items[i].quality -= 1
        }
        // increase Aged Brie increases quality (+1) at the end of each day
        // increases backstage pass (quality) +1 when (sellIn) 10 days or less and +1 when (sellIn) 5 days or less
      } else {
        if (itemsQuality < 50) {
          this.items[i].quality += 1
          if (itemsName === BACKSTAGE && this.items[i].sellIn < 11) {
            this.items[i].quality += 1
            if (this.items[i].sellIn < 6) {
              this.items[i].quality += 1
            }
          }
        }
      }
      // items lower quality (-1) at end of each day - not Sulfuras
      if (itemsName !== SULFURAS) {
        this.items[i].sellIn -= 1
      }
      // if regular item sellIn is less 0 and quality (>0), decrease quality (-1) - not Sulfuras, Aged Brie or Backstage passes
      if (this.items[i].sellIn < 0) {
        if (itemsName !== AGED_BRIE) {
          if (
            itemsName !== BACKSTAGE &&
            itemsQuality > 0 &&
            itemsName !== SULFURAS
          ) {
            this.items[i].quality -= 1
            if (itemsName === CONJURED) {
              this.items[i].quality -= 1
            }

            // if sellIn is less then 0 - Backstage passes quality drops to 0
          } else {
            this.items[i].quality -= this.items[i].quality
          }
          // If quality less then 50
          // Age Brie increases quality (+1)
        } else {
          if (itemsQuality < 50) {
            this.items[i].quality += 1
          }
        }
      }
    }
    return this.items
  }
}
module.exports = {
  Item,
  Shop
}
