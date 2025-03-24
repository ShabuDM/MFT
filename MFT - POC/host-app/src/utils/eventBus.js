class EventBus {
  static instance;
  events = {};
  constructor() {
    if (EventBus.instance) {
      return EventBus.instance;
    }
    this.events = {};
    EventBus.instance = this;
  }
  static getInstance() {
    if (!window.__EVENT_BUS_INSTANCE__) {
      window.__EVENT_BUS_INSTANCE__ = new EventBus();
    }
    return window.__EVENT_BUS_INSTANCE__;
  }

  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }

  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event handler for ${eventName}:`, error);
        }
      });
    }
  }
}

const eventBus = EventBus.getInstance();
export default eventBus;  