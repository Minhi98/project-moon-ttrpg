import ProjectMoonDataModel from "./base-model.mjs";

export default class ProjectMoonActorBase extends ProjectMoonDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.healthPoints = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 72, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 250 })
    });

    schema.staggerThreshold = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 20, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 100 })
    });

    schema.sanityPoints = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 15, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 60 })
    });

    schema.light = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 })
    });

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      })
    });
    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}