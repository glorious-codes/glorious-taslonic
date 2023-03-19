import shortId from 'shortid';

const service = {};

service.generate = () => {
  return shortId.generate();
};

export default service;
