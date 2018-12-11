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

// WORKFLOW
// -- HERBARIUM
import seed from './workflow/herbarium/seed.png';
import seedling from './workflow/herbarium/seedling.png';
import sapling from './workflow/herbarium/sapling.png';
import tree from './workflow/herbarium/tree.png';
import oak from './workflow/herbarium/oak.png';
import matureTree from './workflow/herbarium/mature-tree.png';
import matureGrove from './workflow/herbarium/mature-grove.png';

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
  workflow_type: {
    herbarium: {
      1: seed,
      10: seedling,
      25: sapling,
      75: tree,
      250: oak,
      1000: matureTree,
      5000: matureGrove
    }
  }
};

export default badgeIconLegend;
