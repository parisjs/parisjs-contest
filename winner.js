var fs = require('fs');
var _ = require('underscore');

var content = fs.readFileSync('participants.csv', 'utf8');

console.log('And the winner is:');
console.log('TADATADATADATADATADATADATADATADA');

var winner = _(content.split("\n")).chain().rest().shuffle().first().value();

_.delay(function() {
  console.log(winner);
}, 1000);
