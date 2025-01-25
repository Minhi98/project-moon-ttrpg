/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/project-moon-ttrpg/templates/actor/parts/actor-stats.hbs',
    'systems/project-moon-ttrpg/templates/actor/parts/actor-features.hbs',
    'systems/project-moon-ttrpg/templates/actor/parts/actor-items.hbs',
    'systems/project-moon-ttrpg/templates/actor/parts/actor-effects.hbs',
    'systems/project-moon-ttrpg/templates/actor/parts/actor-profile.hbs',
    // Item partials
    'systems/project-moon-ttrpg/templates/item/parts/item-effects.hbs',
  ]);
};
