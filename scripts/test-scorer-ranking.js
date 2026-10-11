const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const source = fs.readFileSync(path.join(__dirname, '../src/data/standings.js'), 'utf8');
const context = { Array };
vm.runInNewContext(`${source.replace(/^export\s+/gm, '')}\nthis.__mod={SCORERS,rankScorers};`, context);

const ranked = context.__mod.rankScorers([
  {name:'One assist',g:0,a:1},
  {name:'One goal',g:1,a:0},
  {name:'Two goals',g:2,a:0},
  {name:'One and one',g:1,a:1},
  {name:'Two and one',g:2,a:1},
  {name:'Stable first',g:1,a:0},
]);
assert.deepEqual(ranked.map(player=>player.name), [
  'Two and one', 'Two goals', 'One and one', 'One goal', 'Stable first', 'One assist',
]);

const live = context.__mod.rankScorers();
assert.equal(live[0].name, 'Dominic Solanke');
assert.equal(live[0].g, 2);
console.log('scorer-ranking tests passed');
