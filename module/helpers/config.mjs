export const PROJECT_MOON = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
PROJECT_MOON.stats = {
  for: 'PROJECT_MOON.Stats.For.long',
  pru: 'PROJECT_MOON.Stats.Pru.long',
  jus: 'PROJECT_MOON.Stats.Jus.long',
  chm: 'PROJECT_MOON.Stats.Chm.long',
  ins: 'PROJECT_MOON.Stats.Ins.long',
  tmp: 'PROJECT_MOON.Stats.Tmp.long',
};

PROJECT_MOON.statAbbreviations = {
  for: 'PROJECT_MOON.Stats.For.abbr',
  pru: 'PROJECT_MOON.Stats.Pru.abbr',
  jus: 'PROJECT_MOON.Stats.Jus.abbr',
  chm: 'PROJECT_MOON.Stats.Chm.abbr',
  ins: 'PROJECT_MOON.Stats.Ins.abbr',
  tmp: 'PROJECT_MOON.Stats.Tmp.abbr',
};

// TODO: Derived stat formulas - actually implement these
PROJECT_MOON.formulas = {
  level: 'EXP % 8',
  rank: 'level % 3',
  maxHP: '72+(fortitude*8)+(rank*8)',
  maxST: '20+(charm*4)+(rank*4)',
  maxSP: '15+(prudence*3)',
  maxLight: '3+rank',
  attackMod: 'rank',
  evadeMod: 'insight',
  blockMod: 'temperance',
  equipmentRankLimit: 'rank+1',
  maxToolSlots: '4'
};

// PROJECT_MOON.progression = {
//   xp: 'PROJECT_MOON.Progression.XP',
//   level: 'PROJECT_MOON.Progression.Level',
//   rank: 'PROJECT_MOON.Progression.Rank'
// };

// PROJECT_MOON.derivedAttributes = {
//   healthPoints: 'PROJECT_MOON.DerivedAttributes.HealthPoints',
//   staggerThreshold: 'PROJECT_MOON.DerivedAttributes.StaggerThreshold',
//   sanityPoints: 'PROJECT_MOON.DerivedAttributes.SanityPoints',
//   light: 'PROJECT_MOON.DerivedAttributes.Light',
//   attackModifier: 'PROJECT_MOON.DerivedAttributes.AttackModifier',
//   evadeModifier: 'PROJECT_MOON.DerivedAttributes.EvadeModifier',
//   blockModifier: 'PROJECT_MOON.DerivedAttributes.BlockModifier',
//   equipmentRankLimit: 'PROJECT_MOON.DerivedAttributes.EquipmentRankLimit',
//   toolSlots: 'PROJECT_MOON.DerivedAttributes.ToolSlots'
// };