// DECADE
import year10s from './decade/year-10s.png';
import year10s2x from './decade/year-10s@2x.png';
import year20s from './decade/year-20s.png';
import year20s2x from './decade/year-20s@2x.png';
import year30s from './decade/year-30s.png';
import year30s2x from './decade/year-30s@2x.png';
import year40s from './decade/year-40s.png';
import year40s2x from './decade/year-40s@2x.png';
import year50s from './decade/year-50s.png';
import year50s2x from './decade/year-50s@2x.png';
import year60s from './decade/year-60s.png';
import year60s2x from './decade/year-60s@2x.png';
import year70s from './decade/year-70s.png';
import year70s2x from './decade/year-70s@2x.png';
import year80s from './decade/year-80s.png';
import year80s2x from './decade/year-80s@2x.png';
import year90s from './decade/year-90s.png';
import year90s2x from './decade/year-90s@2x.png';
import year2000s from './decade/year-2000s.png';
import year2000s2x from './decade/year-2000s@2x.png';

// TIME
import dinner from './time/time-dinner.png';
import dinner2x from './time/time-dinner@2x.png';
import earlybird from './time/time-earlybird.png';
import earlybird2x from './time/time-earlybird@2x.png';
import earthday from './time/time-earthday.png';
import earthday2x from './time/time-earthday@2x.png';
import lunch from './time/time-lunch.png';
import lunch2x from './time/time-lunch@2x.png';
import nightowl from './time/time-nightowl.png';
import nightowl2x from './time/time-nightowl@2x.png';

// WORKFLOW
// -- BUTTERFLY
import butterflies from './workflow/butterfly/butterflies.png';
import butterfly from './workflow/butterfly/butterfly.png';
// -- HERBARIUM
import matureGrove from './workflow/herbarium/mature-grove.png';
import matureTree from './workflow/herbarium/mature-tree.png';
import oak from './workflow/herbarium/oak.png';
import sapling from './workflow/herbarium/sapling.png';
import seed from './workflow/herbarium/seed.png';
import seedling from './workflow/herbarium/seedling.png';
import tree from './workflow/herbarium/tree.png';
// -- LABS
import blossom from './workflow/labs/blossom.png';
import blossoms from './workflow/labs/blossoms.png';
import fruit from './workflow/labs/fruit.png';
// -- PINNED_SPECIMEN
import caterpillar from './workflow/pinned_specimen/caterpillar.png';
import egg from './workflow/pinned_specimen/egg.png';

export const decade = [
  year10s,
  year10s2x,
  year20s,
  year20s2x,
  year30s,
  year30s2x,
  year40s,
  year40s2x,
  year50s,
  year50s2x,
  year60s,
  year60s2x,
  year70s,
  year70s2x,
  year80s,
  year80s2x,
  year90s,
  year90s2x,
  year2000s,
  year2000s2x
];

export const time = [
  dinner,
  dinner2x,
  earlybird,
  earlybird2x,
  earthday,
  earthday2x,
  lunch,
  lunch2x,
  nightowl,
  nightowl2x
];

export const workflow = [
  butterflies,
  butterfly,
  matureGrove,
  matureTree,
  oak,
  sapling,
  seed,
  seedling,
  tree,
  blossom,
  blossoms,
  fruit,
  caterpillar,
  egg
];

const badgeIconLegend = {
  decade: {
    '10s': {
      1: year10s,
      10: year10s2x
    },
    '20s': {
      1: year20s,
      10: year20s2x
    },
    '30s': {
      1: year30s,
      10: year30s2x
    },
    '40s': {
      1: year40s,
      10: year40s2x
    },
    '50s': {
      1: year50s,
      10: year50s2x
    },
    '60s': {
      1: year60s,
      10: year60s2x
    },
    '70s': {
      1: year70s,
      10: year70s2x
    },
    '80s': {
      1: year80s,
      10: year80s2x
    },
    '90s': {
      1: year90s,
      10: year90s2x
    },
    '00s': {
      1: year2000s,
      10: year2000s2x
    }
  },
  time: {
    dinnertime: {
      1: dinner,
      10: dinner2x
    },
    earlybird: {
      1: earlybird,
      10: earlybird2x
    },
    lunchbreak: {
      1: lunch,
      10: lunch2x
    },
    nightowl: {
      1: nightowl,
      10: nightowl2x
    }
  },
  earth_day: {
    1: earthday,
    10: earthday2x
  },
  workflow_type: {
    butterfly: {
      1: butterfly,
      100: butterflies
    },
    labs: {
      1: blossom,
      100: blossoms,
      500: fruit
    },
    herbarium: {
      1: seed,
      10: seedling,
      25: sapling,
      75: tree,
      250: oak,
      1000: matureTree,
      5000: matureGrove
    },
    pinned_specimen: {
      1: egg,
      100: caterpillar
    }
  }
};

export default badgeIconLegend;
