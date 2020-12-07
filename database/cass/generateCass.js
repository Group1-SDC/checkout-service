// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const faker = require('faker');

const sizes = [
  "['s', 'm', 'l']",
  "['xs', 's', 'm']",
  "['l', 'xl', 'xxl']",
  "['10', '11', '12', '14', '16']",
  "['6', '7', '8', '9', '10', '11', '12']",
];
const colors = ['orchid', 'silver', 'fuchsia', 'teal', 'sky blue', 'ivory', 'turquoise', 'pink', 'orange', 'olive', 'yellow', 'tan', 'green', 'violet', 'magenta',
  'plum', 'gold', 'lavender', 'cyan', 'indigo', 'grey', 'salmon', 'blue', 'mint green', 'lime', 'azure', 'red', 'black', 'maroon', 'white', 'purple'];
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

const generateItemsColorsSizes = () => {
  const itemsWriter = fs.createWriteStream('database/csv/items_colors_sizes.csv');
  itemsWriter.write('ID|BASE_PRICE|CATEGORY|CURRENT_PRICE|HEART|NAME|PRIMARY_COLOR|SECONDARY_COLOR|SIZES|TERTIARY_COLOR\n');
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i--;
      const category = departments[faker.random.number(departments.length - 1)];
      const name = productNames[faker.random.number(productNames.length - 1)];

      const basePrice = prices[faker.random.number(prices.length - 1)];
      const currentPrice = faker.random.number({ min: 1, max: parseInt(basePrice, 10) }).toFixed(2);

      const primaryColor = colors[faker.random.number(colors.length - 1)];
      const secondaryColor = colors[faker.random.number(colors.length - 1)];
      const tertiaryColor = colors[faker.random.number(colors.length - 1)];

      const heart = faker.random.boolean();
      const randomSizes = sizes[faker.random.number(4)];

      // Write each item in CSV format to the writeStream
      const item = [i, basePrice, category, currentPrice, heart, name,
        primaryColor, secondaryColor, randomSizes, tertiaryColor];

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

generateItemsColorsSizes();
