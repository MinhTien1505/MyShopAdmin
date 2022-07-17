export class ProductFromSheet {
  constructor(row, mapping) {
    const product = {
    };

    for (let key in mapping) {
      if (!mapping[key]) continue;
      let value = row[mapping[key]];

      if (value) {
        const lowerCasedValue = value.toLowerCase();

        if (key == 'quantity_remaining' || key == 'discount') {
          value = Number(value);
        }

        if (key == 'on_sale' && (lowerCasedValue == 'true' || lowerCasedValue == 'yes' || lowerCasedValue == 1)) value = true;
        if (key == 'on_sale' && (lowerCasedValue == 'false' || lowerCasedValue == 'no' || lowerCasedValue == 0)) value = false;

      }

      product[key] = (!value && value != false) ? null : value;
    }

    return product;
  }
}