export default class GlobalDataController {
  #data;
  #dataEventsSubscribers;
  constructor() {
    this.#data = new Map();
    this.#dataEventsSubscribers = new Map();
  }

  getData(key) {
    if (!this.#data.has(key)) return { success: false, data: null };
    return { success: true, data: this.#data.get(key) };
  }
  setData(key, value) {
    if (typeof key !== 'string' || this.#data.has(key))
      return { success: false };
    this.#data.set(key, value);
    this.#notifyAll(key, true, value);
    return { success: true };
  }
  updateData(key, value) {
    if (!this.#data.has(key)) return { success: false };
    this.#data.set(key, value);
    this.#notifyAll(key, false, value);
    return { success: true };
  }
  subscribeToDataUpdate(key, notifyIfSet, invokeFunction) {
    if (this.#dataEventsSubscribers.has(key)) {
      this.#addSubscriberToExistingKey(key, notifyIfSet, invokeFunction);
      return;
    }
    this.#addSubscriberAndCreteKey(key, notifyIfSet, invokeFunction);
  }
  unsubscribeFromDataUpdate(key, invokeFunction) {
    if (!this.#dataEventsSubscribers.has(key)) return { success: false };

    const subscribers = this.#dataEventsSubscribers.get(key).subscribers;
    const index = subscribers.findIndex((sub) => sub.invoke === invokeFunction);
    if (index !== -1) {
      subscribers.splice(index, 1);
      if (subscribers.length === 0) this.#dataEventsSubscribers.delete(key);
      return { success: true };
    }
    return { success: false };
  }
  #addSubscriberToExistingKey(key, notifyIfSet, invokeFunction) {
    this.#dataEventsSubscribers.get(key).subscribers.push({
      invoke: invokeFunction,
      notify: notifyIfSet,
    });
  }
  #addSubscriberAndCreteKey(key, notifyIfSet, invokeFunction) {
    this.#dataEventsSubscribers.set(key, {
      subscribers: [
        {
          invoke: invokeFunction,
          notify: notifyIfSet,
        },
      ],
    });
  }
  #notifyAll(key, isSet, value) {
    if (!this.#dataEventsSubscribers.has(key)) return;
    let subs = this.#dataEventsSubscribers.get(key).subscribers;
    subs.forEach((elem) => {
      if (!isSet || elem.notify) elem.invoke(value);
    });
  }
}
