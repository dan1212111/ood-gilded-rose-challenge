// Item and Shop are two different classes - needing two seperate files.

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(){
    this.items = []
  }

  createItem (name, sellIn, quality) {
    if(name != "Sulfuras, Hand of Ragnaros" && quality > 50) {
      return "Item Quality Set Too High"
    }
    const item = new Item (name, sellIn, quality);
    this.items.push(item)
    return item
  }


  updateQuality() {
    // regular Items lower quality (-1) at end of each day - but not Sulfuras, Aged Brie or Backstage passes
    // all items can't be below 0 (quality) - check 
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        // all items can't be above 50 (quality) - check (apart from Sulfuras)
        // increase Aged Brie increases quality (+1) at the end of each day
        // increases backstage pass (quality) +1 when (sellIn) 10 days or less
         // increases backstage pass (quality) +1 when (sellIn) 5 days or less
        if (this.items[i].quality < 50) { // - item not sulfuras
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      // PART 2

      // (repeat) - regular Items lower quality (-1) at end of each day - but not Sulfuras, Aged Brie or Backstage passes
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // if regular item sellIn is less 0 and quality (>0), decrease quality (-1) - but not Sulfuras, Aged Brie or Backstage passes
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
            // if sellIn is less then 0 - Backstage passes quality drops to 0
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
          // If quality less then 50
          // Age Brie increases quality (+1)
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
