import { PROJECT_MOON } from "../helpers/config.mjs";
import ProjectMoonDataModel from "./base-model.mjs";

export default class ProjectMoonActorBase extends ProjectMoonDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    return schema;
  }

  prepareDerivedData() {
    
  }

}