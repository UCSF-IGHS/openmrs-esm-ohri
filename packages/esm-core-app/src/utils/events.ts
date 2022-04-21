const Events = {
  subscribe: (event: string, callback) => document.addEventListener(event, callback),
  dispatch: (event: string) => document.dispatchEvent(new CustomEvent(event)),
};

export default Events;
