import ProjectMoonActorBase from "./base-actor.mjs";

export default class ProjectMoonCharacter extends ProjectMoonActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // Iterate over ability names and create a new SchemaField for each.
    schema.stats = new fields.SchemaField(Object.keys(CONFIG.PROJECT_MOON.stats).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    for (const key in this.stats) {
      // Handle ability label localization.
      this.stats[key].label = game.i18n.localize(CONFIG.PROJECT_MOON.stats[key]) ?? key;
    }
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

    data.lvl = this.attributes.level.value;

    return data
  }
}