// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const faker = require('faker');

const sizes = ['s m l', 'xs s m', 'l xl xxl', '10 11 12 14 16', '6 7 8 9 10 11 12'];
const colors = ['Orchid', 'Silver', 'Fuchsia', 'Teal', 'Sky Blue', 'Ivory', 'Turquoise', 'Pink', 'Orange', 'Olive', 'Yellow', 'Tan', 'Green', 'Violet', 'Magenta',
  'Plum', 'Gold', 'Lavender', 'Cyan', 'Indigo', 'Grey', 'Salmon', 'Blue', 'Mint Green', 'Lime', 'Azure', 'Red', 'Black', 'Maroon', 'White', 'Purple'];
const prices = [];
const departments = [];
const productNames = [];

const createFakerData = () => {
  for (let i = 0; i < 100000; i++) {
    prices.push(faker.commerce.price());
    departments.push(faker.commerce.department());
    productNames.push(faker.commerce.productName());
  }
};
createFakerData();

const generateItemsColors = () => {
  const itemsWriter = fs.createWriteStream('database/csv/items.csv');
  itemsWriter.write('ID|CATEGORY|NAME|BASE_PRICE|CURRENT_PRICE|PRIMARY_COLOR|SECONDARY_COLOR|TERTIARY_COLOR|HEART|SIZES\n');
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i--;
      const category = departments[faker.random.number(departments.length - 1)];
      const name = productNames[faker.random.number(productNames.length - 1)];

      const basePrice = prices[faker.random.number(prices.length - 1)];
      const currentPrice = faker.random.number({ min: 1, max: parseInt(basePrice, 10) }).toFixed(2);

      const primaryColor = faker.random.number({ min: 1, max: colors.length });
      const secondaryColor = faker.random.number({ min: 1, max: colors.length });
      const tertiaryColor = faker.random.number({ min: 1, max: colors.length });

      const heart = faker.random.boolean();
      const randomSizes = faker.random.number({ min: 1, max: 5 });

      // Write each item in CSV format to the writeStream
      const item = [i, category, name, basePrice, currentPrice,
        primaryColor, secondaryColor, tertiaryColor, heart, randomSizes];

      if (i === 0) {
        itemsWriter.write(item.join('|'));
        itemsWriter.write('\n');
        itemsWriter.end();
      } else {
        ok = itemsWriter.write(item.join('|'));
        itemsWriter.write('\n');
      }
    } while (i > 0 && ok);
    if (i > 0) {
      itemsWriter.once('drain', write);
    }
  }
  write();
};

const generateSizes = () => {
  const sizesWriter = fs.createWriteStream('database/csv/sizes.csv');
  sizesWriter.write('ID|SIZES\n');
  sizes.forEach((size, index) => {
    sizesWriter.write(`${index + 1}|${size}\n`);
  });
  sizesWriter.end();
};

const generateColors = () => {
  const colorsWriter = fs.createWriteStream('database/csv/colors.csv');
  colorsWriter.write('ID|COLOR\n');
  colors.forEach((color, index) => {
    colorsWriter.write(`${index + 1}|${color}\n`);
  });
  colorsWriter.end();
};

generateSizes();
generateColors();
generateItemsColors();
