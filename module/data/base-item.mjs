import ProjectMoonDataModel from "./base-model.mjs";

export default class ProjectMoonItemBase extends ProjectMoonDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });

    return schema;
  }

}