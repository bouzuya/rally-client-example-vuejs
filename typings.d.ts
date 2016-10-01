declare module 'deep-diff' {
  export interface Patch {}
  var diff: (target: any, source: any) => Patch[];
  var applyChange: (target: any, source: any, patch: Patch) => any;
  export { diff, applyChange };
}

