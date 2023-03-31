interface Data {
    [key: string]: any;
  }

export const extractedData = (data: any, properties: string[]) => {
  return properties.reduce((obj, property) => {
      const propertyLevels = property.split(".");
      let value = data;
      for (const level of propertyLevels) {
      if (value === null || value === undefined) break;
      value = value[level];
      }
      return {
      ...obj,
      [propertyLevels[propertyLevels.length - 1]]: value
      };
  }, {});
};