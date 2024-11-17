const freemind = require('./freemind');
const mindmanager = require('./mindmanager');
const xmind = require('./xmind');

module.exports = function (kityminder) {
  if (kityminder && kityminder.data && typeof kityminder.data.registerProtocol === 'function') {
    [freemind, mindmanager, xmind].forEach(({ name, deal }) => kityminder.data.registerProtocol(name, deal));
  }
};
