/**
 * Initialisation Hook
 */
Hooks.once("init", function() {
    
    // Utility classes in the global game object 
    game.projectmoonttrpg = {
        rollItemMacro
    };

    CONFIG.PROJECT_MOON = PROJECT_MOON;
    _configDataModels();
    _configStatusEffects();
    _configMisc();
    _configRegisterSheets();

    //TODO: Load Handlebar Templates Function
    // return loadHBSTemplates();
    return null;
});

/**
 * Pre-Localisation Hook
 */
// TODO: Pre-Localisation Hook
// Hooks.once("i18nInit", () => {
    
// });

/**
 * Ready Hook
 */
Hooks.once("ready", async function () {
    // Wait to register hotbar drop hook on ready so that modules could register earlier if they want to
    Hooks.on('hotbarDrop', (bar, data, slot) => createItemMacro(data, slot));
});

/**
 * Other Hooks
 * e.g. Hooks.on("renderChatMessage", ... some async function called renderChatMessage ...)
 */

// Helpers
Handlebars.registerHelper('toLowerCase', function (str) {
    return str.toLowerCase();
});



// ==== Hook-Related functions ============================================================================================

/**
 * Define system document classes and data models
 */
function _configDataModels() {
    // TODO: documentClass
    // CONFIG.Actor.documentClass = ProjectMoonActor;
    
    // TODO: DataModels
    // CONFIG.Actor.dataModels = {
    //     character: models.ProjectMoonCharacter
    // }

    // CONFIG.Item.documentClass = ProjectMoonItem;

    // CONFIG.Item.dataModels = {
    //     weapon: models.ProjectMoonWeapon,
    //     outfit: models.ProjectMoonOutfit,
    //     augment: models.ProjectMoonAugment,
    //     skill: models.ProjectMoonSkill,
    //     tool: models.ProjectMoonTool,
    //     effect: models.ProjectMoonEffect,
    // }
}

/**
 * Remove defaults and initialise system-specific status effects
 */
function _configStatusEffects() {
    // Active Effects are never copied to the Actor,
    // but will still apply to the Actor from within the Item
    // if the transfer property on the Active Effect is true.
    CONFIG.ActiveEffect.legacyTransferral = false;

    // Remove Default Foundry Status Effects
    const toRemove = ["bleeding", "dead", "sleep", "fly", "target", "eye", "blind", "deaf", "burning", "invisible", "frozen", "bless", "burrow", "corrode", "curse", "degen", "disease", "upgrade", "fireShield", "fear", "holyShield", "hover", "coldShield", "magicShield", "paralysis", "poison", "prone", "regen", "restrain", "shock", "silence", "stun", "unconscious", "downgrade"];
    CONFIG.statusEffects = CONFIG.statusEffects.filter(effect => !toRemove.includes(effect.id));
}

/**
 * Remove defaults and register system-specific sheets
 */
function _configRegisterSheets() {
    // Unregister default core sheets
    Actors.unregisterSheet('core', ActorSheet);
    Items.unregisterSheet('core', ItemSheet);

    // Register Actors

    // TODO: Character Sheet
    // Actors.registerSheet('project-moon-ttrpg', ProjectMoonActorSheet, {
    //     types: ["character"],
    //     makeDefault: true,
    //     label: 'PROJECT_MOON.SheetLabels.Actor',
    // });

    // Register Items

    //TODO: Weapon Sheet
    // Items.registerSheet('project-moon-ttrpg', ProjectMoonWeaponSheet, {
    //     types: ["weapon"],
    //     makeDefault: true,
    //     label: 'PROJECT_MOON.SheetLabels.Weapon',
    // });

    //TODO: Outfit Sheet
    // Items.registerSheet('project-moon-ttrpg', ProjectMoonOutfitSheet, {
    //     types: ["outfit"],
    //     makeDefault: true,
    //     label: 'PROJECT_MOON.SheetLabels.Outfit',
    // });

    //TODO: Augment Sheet
    // Items.registerSheet('project-moon-ttrpg', ProjectMoonAugmentSheet, {
    //     types: ["augment"],
    //     makeDefault: true,
    //     label: 'PROJECT_MOON.SheetLabels.Augment',
    // });

    //TODO: Skill Sheet
    // Items.registerSheet('project-moon-ttrpg', ProjectMoonSkillSheet, {
    //     types: ["skil"],
    //     makeDefault: true,
    //     label: 'PROJECT_MOON.SheetLabels.Skill',
    // });

    //TODO: Tool Sheet
    // Items.registerSheet('project-moon-ttrpg', ProjectMoonToolSheet, {
    //     types: ["tool"],
    //     makeDefault: true,
    //     label: 'PROJECT_MOON.SheetLabels.Tool',
    // });

    //TODO: Effect Sheet
    // Items.registerSheet('project-moon-ttrpg', ProjectMoonEffectSheet, {
    //     types: ["effect"],
    //     makeDefault: true,
    //     label: 'PROJECT_MOON.SheetLabels.Effect',
    // });
}

/**
 * Misc. config initialisations
 */
function _configMisc() {
    // TODO: Set initiative
    // CONFIG.Combat.initiative = {
    //   formula: '2d6 + @stats.justice.value',
    //   decimals: 2,
    // };
}

/**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {Object} data     The dropped data
 * @param {number} slot     The hotbar slot to use
 * @returns {Promise}
 */
async function createItemMacro(data, slot) {
    // First, determine if this is a valid owned item.
    if (data.type !== 'Item') return;
    if (!data.uuid.includes('Actor.') && !data.uuid.includes('Token.')) {
      return ui.notifications.warn(
        'You can only create macro buttons for owned Items'
      );
    }
    // If it is, retrieve it based on the uuid.
    const item = await Item.fromDropData(data);
  
    // Create the macro command using the uuid.
    const command = `game.projectmoonttrpg.rollItemMacro("${data.uuid}");`;
    let macro = game.macros.find(
      (m) => m.name === item.name && m.command === command
    );
    if (!macro) {
      macro = await Macro.create({
        name: item.name,
        type: 'script',
        img: item.img,
        command: command,
        flags: { 'project-moon-ttrpg.itemMacro': true },
      });
    }
    game.user.assignHotbarMacro(macro, slot);
    return false;
  }

  /**
 * Create a Macro from an Item drop.
 * Get an existing item macro if one exists, otherwise create a new one.
 * @param {string} itemUuid
 */
function rollItemMacro(itemUuid) {
    // Reconstruct the drop data so that we can load the item.
    const dropData = {
      type: 'Item',
      uuid: itemUuid,
    };
    // Load the item from the uuid.
    Item.fromDropData(dropData).then((item) => {
      // Determine if the item loaded and if it's an owned item.
      if (!item || !item.parent) {
        const itemName = item?.name ?? itemUuid;
        return ui.notifications.warn(
          `Could not find item ${itemName}. You may need to delete and recreate this macro.`
        );
      }
  
      // Trigger the item roll
      item.roll();
    });
  }