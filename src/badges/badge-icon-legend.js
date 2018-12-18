// DECADE
import year10s from './decade/year-10s.png';
import year20s from './decade/year-20s.png';
import year30s from './decade/year-30s.png';
import year40s from './decade/year-40s.png';
import year50s from './decade/year-50s.png';
import year60s from './decade/year-60s.png';
import year70s from './decade/year-70s.png';
import year80s from './decade/year-80s.png';
import year90s from './decade/year-90s.png';
import year2000s from './decade/year-2000s.png';

// LEVELS
import level10 from './levels/level-10.png';
import level100 from './levels/level-100.png';
import level500 from './levels/level-500.png';
import level1000 from './levels/level-1000.png';
import level5000 from './levels/level-5000.png';
import level10000 from './levels/level-10000.png';

// TIME
import dinner from './time/time-dinner.png';
import earlybird from './time/time-earlybird.png';
import earthday from './time/time-earthday.png';
import lunch from './time/time-lunch.png';
import nightowl from './time/time-nightowl.png';

// WORKFLOW
// -- AQUATICS
import wet1 from './workflow/aquatics/wet1.png';
import wet2 from './workflow/aquatics/wet2.png';
import wet3 from './workflow/aquatics/wet3.png';
// -- BUTTERFLY
import butterflies from './workflow/butterfly/butterflies.png';
import butterfly from './workflow/butterfly/butterfly.png';
// -- FOSSILS
import paleon1 from './workflow/fossils/paleon1.png';
import paleon2 from './workflow/fossils/paleon2.png';
import paleon3 from './workflow/fossils/paleon3.png';
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
// -- MACROFUNGI
import mushroom from './workflow/macrofungi/mushroom.png';
import mycelium from './workflow/macrofungi/mycelium.png';
import spore from './workflow/macrofungi/spore.png';
// -- MAGNIFIED
import parasitoid1 from './workflow/magnified/Parasitoid-01.png';
import parasitoid2 from './workflow/magnified/Parasitoid-02.png';
import parasitoid3 from './workflow/magnified/Parasitoid-03.png';
// -- PINNED_SPECIMEN
import caterpillar from './workflow/pinned_specimen/caterpillar.png';
import egg from './workflow/pinned_specimen/egg.png';

export const decade = [
  year10s,
  year20s,
  year30s,
  year40s,
  year50s,
  year60s,
  year70s,
  year80s,
  year90s,
  year2000s
];

export const levels = [
  level10,
  level100,
  level500,
  level1000,
  level5000,
  level10000
];

export const time = [dinner, earlybird, earthday, lunch, nightowl];

export const workflow = [
  wet1,
  wet2,
  wet3,
  butterflies,
  butterfly,
  paleon1,
  paleon2,
  paleon3,
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
  mushroom,
  mycelium,
  spore,
  parasitoid1,
  parasitoid2,
  parasitoid3,
  caterpillar,
  egg
];

const badgeIconLegend = {
  decade: {
    '10s': {
      1: year10s
    },
    '20s': {
      1: year20s
    },
    '30s': {
      1: year30s
    },
    '40s': {
      1: year40s
    },
    '50s': {
      1: year50s
    },
    '60s': {
      1: year60s
    },
    '70s': {
      1: year70s
    },
    '80s': {
      1: year80s
    },
    '90s': {
      1: year90s
    },
    '00s': {
      1: year2000s
    }
  },
  levels: {
    10: level10,
    100: level100,
    500: level500,
    1000: level1000,
    5000: level5000,
    10000: level10000
  },
  time: {
    dinnertime: {
      1: dinner
    },
    earlybird: {
      1: earlybird
    },
    lunchbreak: {
      1: lunch
    },
    nightowl: {
      1: nightowl
    }
  },
  earth_day: {
    1: earthday
  },
  workflow_type: {
    aquatics: {
      1: wet1,
      100: wet2,
      500: wet3
    },
    butterfly: {
      1: butterfly,
      100: butterflies
    },
    fossils: {
      1: paleon1,
      100: paleon2,
      500: paleon3
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
    labs: {
      1: blossom,
      100: blossoms,
      500: fruit
    },
    macrofungi: {
      1: spore,
      100: mycelium,
      500: mushroom
    },
    magnified: {
      1: parasitoid1,
      100: parasitoid2,
      500: parasitoid3
    },
    pinned_specimen: {
      1: egg,
      100: caterpillar
    }
  }
};

export default badgeIconLegend;
