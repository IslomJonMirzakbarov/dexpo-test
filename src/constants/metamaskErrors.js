export const metamaskError = {
  4001: 'User denied transaction signature.',
  '-32603': 'Not enough CYCON Amount',
  default: 'Metamask error'
};

export function getRPCErrorMessage(err) {
  var open = err.stack.indexOf('{');
  var close = err.stack.lastIndexOf('}');
  var j_s = err.stack.substring(open, close + 1);
  var j = JSON.parse(j_s);

  return j.message.toUpperCase();
}
