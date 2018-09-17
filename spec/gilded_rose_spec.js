describe("Gilded Rose", function () {
  let sellIn;
  let quality;
  beforeEach(function () {
    quality = 0;
    sellIn = 0;
  });
  describe("Regular items", function () {
      it("should decrease sellIn and quality values by 1", function () {
        quality = 5;
        sellIn = 5;
        const gildedRose = new Shop([ new Item("mart", sellIn , quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(4);
        expect(items[0].sellIn).toEqual(4);
      });
      it("should decrease quality value by 2 when the sell by date has passed", function () {
        quality = 5;
        const gildedRose = new Shop([ new Item("mart", sellIn , quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(3);
      });
      it("should not allow the quality value to be negative", function () {
        const gildedRose = new Shop([ new Item("mart", sellIn , quality) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).toEqual(0);
      });
  });
  describe("Aged Brie", function () {
    it("should increase the quality of Aged Brie as it gets older", function () {
      sellIn = 1;
      const gildedRose = new Shop([ new Item("Aged Brie", sellIn , quality) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(1);
      expect(items[0].sellIn).toEqual(0);
    });
    it("should not allow an item to have a quality value greater than 50", function () {
      quality = 50;
      sellIn = 2;
      const gildedRose = new Shop([ new Item("Aged Brie", sellIn , quality) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(50);
    });
    it("should decrease the sellIn value by 1", function() {
      quality = 50;
      sellIn = 2;
      const gildedRose = new Shop([ new Item("Aged Brie", sellIn , quality) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1);
    });
    it("should decrease the sellIn value by 1 once sell by date has passed", function() {
      quality = 50;
      const gildedRose = new Shop([ new Item("Aged Brie", sellIn , quality) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
    });
  });
  describe("Sulfuras", function () {
    it("should never change the quality or sellIn value", function () {
      quality = 80;
      sellIn = 2;
      const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", sellIn, quality) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
      expect(items[0].sellIn).toEqual(2);
    });
  });
  describe("Backstage passes", function () {
    it("should increase the quality as sellIn value decreases", function () {
      sellIn = 11;
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(1);
    });
    it("should increase the quality by 2 when sellIn value is 10 days or less", function () {
       const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, quality) ]);
       gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 9, quality));
       const items = gildedRose.updateQuality();
       expect(items[0].quality).toEqual(quality + 2);
       expect(items[1].quality).toEqual(quality + 2);
    });
    it("should increase the quality by 3 when sellIn value is 5 days or less", function () {
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 5, quality) ]);
      gildedRose.items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 4, quality));
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(quality + 3);
      expect(items[1].quality).toEqual(quality + 3);
    });
    it("should drop the quality to 0 after the concert", function () {
      quality = 5;
      const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, quality) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
      expect(items[0].sellIn).toEqual(-1);
    });
  });
});