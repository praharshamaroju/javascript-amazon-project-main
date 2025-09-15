export const deliveryoptions = [{
  id: '1',
  deliverydays: 7,
  priceCents: 0
}, {
  id: '2',
  deliverydays: 4,
  priceCents: 499
}, {
  id: '3',
  deliverydays: 1,
  priceCents: 999
}];

// --- This function is now corrected and safer ---
export function getdeliveryoption(deliveryOptionId) {
  let matchingOption;

  deliveryoptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      matchingOption = option;
    }
  });

  // If we didn't find a match, default to the first option
  // to prevent the page from crashing.
  if (!matchingOption) {
    return deliveryoptions[0];
  }

  return matchingOption;
};