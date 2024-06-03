import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //only one value we can take

//we made this because we have add deliveryOptionId in cart.js so we can take the rest of the necessary data. This is called normalizing the data
export const deliveryOptions = [{
    id:'1',
    deliveryDays:7,
    priceCents: 0
},{
    id:'2',
    deliveryDays: 3,
    priceCents: 499
},{
    id:'3',
    deliveryDays:1,
    priceCents:999
}]

export function getDeliveryOptionId(deliveryDates){
    let deliveryOption;
  
      deliveryOptions.forEach((option) => {
        if (deliveryDates === option.id) {
          deliveryOption = option;
        }
      });
    return deliveryOption || deliveryOption[0];
  }
  
export function getdeliveryDates(deliveryOption){
  const today = dayjs();
  const delivery = today.add(deliveryOption.deliveryDays, "days");
  const dateString = delivery.format("dddd, MMMM, D");

  return dateString;
}