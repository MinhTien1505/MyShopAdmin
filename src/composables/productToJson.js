export class ProductToJson {
  constructor(item, mapping) {

    const product = {}

    for (const key in mapping) {
      if (!mapping[key])
        continue

      let value = item[key]

      if (value || value === false) {
        if (typeof value === 'boolean')
          value = +value
      }

      product[mapping[key]] = (value !== 0 && !value && value !== false) ? '' : value
    }

    return product
  }
}
