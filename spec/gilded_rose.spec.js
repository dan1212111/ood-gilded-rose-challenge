const  {Shop, Item} = require('../src/gilded_rose.js');

describe("Gilded Rose", function() {
  let shop;

  beforeEach(() => {
    shop = new Shop();
  });

  it("Create an item", () => {
    // set up
    const expected = new Item("golden dagger", 5, 10)

    // execute
    const result = shop.createItem("golden dagger", 5, 10)
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Item quality too high - error", () => {
    // set up
    const expected = "Item Quality Set Too High"

    // execute
    const result = shop.createItem("golden dagger", 5, 51)
    
    // verify
    expect(result).toEqual(expected);
  });


  // REGULAR ITEMS //

  it("Check if system lowers both sell-by date and quality", () => {
    // set up
    const expected = [new Item("golden dagger", 4, 9)]

    // execute
    shop.createItem("golden dagger", 5, 10)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check if quality degrades -2 if item is passed it's sell-by date", () => {
    // set up
    const expected = [new Item("golden dagger", -5, 8)]

    // execute
    shop.createItem("golden dagger", -4, 10)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check if quality doesn't turn into negative", () => {
    // set up
    const expected = [new Item("golden dagger", -5, 0)]

    // execute
    shop.createItem("golden dagger", -4, 0)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });


  // AGED BRIE // 

  it("Check that the quality doesn't exceed 50", () => {
    // set up
    const expected = [new Item('Aged Brie', 19, 50)]

    // execute
    shop.createItem('Aged Brie', 20, 50)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check quality +1 when sellBy date decreases", () => {
    // set up
    const expected = [new Item('Aged Brie', 19, 16)]

    // execute
    shop.createItem('Aged Brie', 20, 15)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check quality increases +2 if passed the sellBy date", () => {
    // set up
    const expected = [new Item('Aged Brie', -2, 12)]

    // execute
    shop.createItem('Aged Brie', -1, 10)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });
  

  // SULFURAS //

  it("Check doesn't increase quality or have a sellBy Date", () => {
    // set up
    const expected = [new Item("Sulfuras, Hand of Ragnaros", 0, 80)]

    // execute
    shop.createItem("Sulfuras, Hand of Ragnaros", 0, 80)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });


  // BACKSTAGE passes TO A TAFKAL80ETC CONCERT //

  it("Check that the quality doesn't exceed 50", () => {
    // set up
    const expected = [new Item('Backstage passes to a TAFKAL80ETC concert', 19, 50)]

    // execute
    shop.createItem('Backstage passes to a TAFKAL80ETC concert', 20, 50)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check quality +1 when sellBy date decreases", () => {
    // set up
    const expected = [new Item('Backstage passes to a TAFKAL80ETC concert', 19, 16)]

    // execute
    shop.createItem('Backstage passes to a TAFKAL80ETC concert', 20, 15)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check quality +2 when sellBy date is 10 days or less", () => {
    // set up
    const expected = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 17)]

    // execute
    shop.createItem('Backstage passes to a TAFKAL80ETC concert', 10, 15)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check quality +3 when sellBy date is 5 days or less", () => {
    // set up
    const expected = [new Item('Backstage passes to a TAFKAL80ETC concert', 4, 18)]

    // execute
    shop.createItem('Backstage passes to a TAFKAL80ETC concert', 5, 15)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  it("Check quality drops to 0 when concert is finished", () => {
    // set up
    const expected = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0)]

    // execute
    shop.createItem('Backstage passes to a TAFKAL80ETC concert', 0, 15)
    const result = shop.updateQuality();
    
    // verify
    expect(result).toEqual(expected);
  });

  // CONJURED ITEMS //

  // - QUALITY -2 INSTEAD OF -1

});
