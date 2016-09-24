import { Spot } from '../types/spot';
import { StampRally } from '../types/stamp-rally';

type StampRallyData = {
  stampRally: StampRally | null;
};

const view = {
  computed: {
    stampRallyName(this: StampRallyData): string {
      return this.stampRally === null ? '' : this.stampRally.name;
    },
    stampRallyTagline(this: StampRallyData): string {
      return this.stampRally === null ? '' : this.stampRally.tagline;
    },
    stampRallyDescription(this: StampRallyData): string {
      return this.stampRally === null ? '' : this.stampRally.description;
    },
    stampRallyImage(this: StampRallyData): string | null {
      return this.stampRally === null ? null : this.stampRally.image;
    },
    stampRallySpots(this: StampRallyData): Spot[] {
      return this.stampRally === null ? [] : this.stampRally.spots;
    }
  },
  props: ['stamp-rally'],
  template: `
<div class="stamp-rally">
  <div class="name" v-text="stampRallyName"></div>
  <div class="tagline" v-html="stampRallyTagline"></div>
  <div class="description" v-html="stampRallyDescription"></div>
  <div class="image"><img width="64" height="64" v-bind:src="stampRallyImage" /></div>
  <ul>
    <li v-for="spot in stampRallySpots">
      <div class="name" v-text="spot.name"></div>
      <div class="tagline" v-html="spot.tagline"></div>
      <div class="description" v-html="spot.description"></div>
      <div class="image"><img width="64" height="64" v-bind:src="spot.image" /></div>
    </li>
  </ul>
</div>
`
};

export { view };
