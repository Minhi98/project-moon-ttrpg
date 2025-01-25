import ProjectMoonActorBase from "./base-actor.mjs";

export default class ProjectMoonCharacter extends ProjectMoonActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.healthPoints = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 250 })
    });

    schema.staggerThreshold = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 100 })
    });

    schema.sanityPoints = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 60 })
    });

    schema.light = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 })
    });

    schema.progress = new fields.SchemaField({
      level: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      xp: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      rank: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      rankRoman: new fields.StringField({ required: false, blank: true })
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.stats = new fields.SchemaField(Object.keys(CONFIG.PROJECT_MOON.stats).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      });
      return obj;
    }, {}));
    
    schema.mods = new fields.SchemaField({
      attack: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      evade: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      block: new fields.NumberField({ ...requiredInteger, initial: 0 })
    });
    
    schema.equipmentLimits = new fields.SchemaField({
      equipmentRankLimit: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      maxToolSlots: new fields.NumberField({ ...requiredInteger, initial: 0 })
    });

    schema.inventory = new fields.SchemaField({
      ahn: new fields.NumberField({ ...requiredInteger, initial: 100000, min: 0 })
    });

    schema.profile = new fields.SchemaField({
      //text fields
      fullName: new fields.StringField({ required: false, blank: true }),
      aliases: new fields.StringField({ required: false, blank: true }),
      occupation: new fields.StringField({ required: false, blank: true }),
      age: new fields.StringField({ required: false, blank: true }),
      height: new fields.StringField({ required: false, blank: true }),
      birthplace: new fields.StringField({ required: false, blank: true }),
      residence: new fields.StringField({ required: false, blank: true }),
      //enriched fields
      description: new fields.StringField({ required: false, blank: true }),
      background: new fields.StringField({ required: false, blank: true }),
      personality: new fields.StringField({ required: false, blank: true }),
      notes: new fields.StringField({ required: false, blank: true }),
      relationships: new fields.StringField({ required: false, blank: true }),
      notableHistory: new fields.StringField({ required: false, blank: true })
    });

    return schema;
  }

  prepareDerivedData() {
    super.prepareDerivedData();

    this._prepareRank();
    this._prepareStats();
    this._prepareDerivedStats();
  }

  _prepareRank() {
    this.progress.level = Math.floor(this.progress.xp / 8);
    this.progress.rank = Math.floor(this.progress.level / 3) + 1;
    this.progress.rankRoman = CONFIG.PROJECT_MOON.systemRankRomanized(this.progress.rank);
  }

  _prepareStats() {
    for (const key in this.stats) {
      // Handle stat label localization.
      this.stats[key].label = game.i18n.localize(CONFIG.PROJECT_MOON.stats[key]) ?? key;

      // Stat trading restrictions
      this.stats[key].value = Math.clamp(this.stats[key].value, -1, this.progress.rank + 2);
    }
  }

  _prepareDerivedStats() {
    //HEALTH POINTS
    this.healthPoints.max = Math.floor(72 + (this.stats.for.value * 8) + (this.progress.rank * 8));
    this.healthPoints.value = Math.clamp(this.healthPoints.value, 0, this.healthPoints.max);

    //STAGGER THRESHOLD
    this.staggerThreshold.max = Math.floor(20 + (this.stats.chm.value * 4) + (this.progress.rank * 4));
    this.staggerThreshold.value = Math.clamp(this.staggerThreshold.value, 0, this.staggerThreshold.max);

    //SANITY POINTS
    this.sanityPoints.max = Math.floor(15 + (this.stats.pru.value * 3));
    this.sanityPoints.value = Math.clamp(this.sanityPoints.value, 0, this.sanityPoints.max);

    //LIGHT
    this.light.max = Math.floor(3 + this.progress.rank);
    this.light.value = Math.clamp(this.light.value, 0, this.light.max);

    // MODS
    this.mods.attack = this.progress.rank;
    this.mods.evade = this.stats.ins.value;
    this.mods.block = this.stats.tmp.value;

    // EQUIPMENT LIMITS
    this.equipmentLimits.equipmentRankLimit = this.progress.rank + 1;
    this.equipmentLimits.maxToolSlots = 4;
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.stats) {
      for (let [k,v] of Object.entries(this.stats)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.progress.level;

    return data
  }
}