import idService from '@base/services/id/id';

const _public = {};

const subscribers = [];

_public.subscribe = (keyCode, callback) => {
  const subscriber = buildSubscriber(keyCode, callback);
  subscribers.push(subscriber);
  return subscriber.id;
};

_public.unsubscribe = subscriberId => {
  const subscriberIndex = findSubscriberIndexById(subscriberId);
  const { listener } = subscribers[subscriberIndex];
  handleDocumentListener('remove', listener);
  removeSubscriber(subscriberIndex);
};

function buildSubscriber(keyCode, callback) {
  const id = idService.generate();
  const listener = buildSubscriberListener(keyCode, callback);
  return { id, listener };
}

function buildSubscriberListener(keyCode, callback) {
  const listener = buildListener(keyCode, callback);
  handleDocumentListener('add', listener);
  return listener;
}

function buildListener(keyCode, callback) {
  return function listener(evt) {
    if (evt.keyCode === keyCode) callback();
  };
}

function handleDocumentListener(action, listener) {
  const eventName = 'keydown';
  if (action == 'add') document.addEventListener(eventName, listener);
  else document.removeEventListener(eventName, listener);
}

function findSubscriberIndexById(subscriberId) {
  return subscribers.findIndex(subscriber => subscriber.id === subscriberId);
}

function removeSubscriber(subscriberIndex) {
  subscribers.splice(subscriberIndex, 1);
}

export default _public;
