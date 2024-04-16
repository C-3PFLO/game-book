export function getCurrent(state) {
    return state.current || null;
}

export function getCurrentBlockID(state) {
    const current = getCurrent(state);
    return current && current.blockID ? current.blockID : null;
}

export function getCurrentSceneID(state) {
    const current = getCurrent(state);
    return current && current.sceneID ? current.sceneID : null;
}

export function getScenes(state) {
    return state.scenes || null;
}

export function getCurrentScene(state) {
    const currentSceneID = getCurrentSceneID(state);
    const scenes = getScenes(state);
    return scenes && currentSceneID && scenes[currentSceneID] ?
        scenes[currentSceneID] : null;
}

export function getSceneBlocks(scene) {
    return scene ? scene.blocks : null;
}

export function getCurrentSceneBlockByID(state, blockID) {
    const curentScene = getCurrentScene(state);
    const sceneBlocks = getSceneBlocks(curentScene);
    return sceneBlocks && blockID && sceneBlocks[blockID] ?
        sceneBlocks[blockID] : null;
}

export function getCurrentBlock(state) {
    const currentBlockID = getCurrentBlockID(state);
    return currentBlockID ?
        getCurrentSceneBlockByID(state, currentBlockID) : null;
}

export function getCurrentBlockText(state) {
    const block = getCurrentBlock(state);
    return block ? block.text : null;
}

export function getCurrentBlockChoices(state) {
    const block = getCurrentBlock(state);
    return block ? block.choices : [];
}

export function getSceneChoices(scene) {
    return scene ? scene.choices : [];
}

export function getChoiceOutcome(choice) {
    return choice ? choice.outcome : null;
}

export function getOutcomeType(outcome) {
    return outcome ? outcome.type : null;
}

export function getAbilities(state) {
    return state.abilities || null;
}

export function getAbilityScore(state, ability) {
    const abilities = getAbilities(state);
    const abilityScore = abilities ? abilities[ability] : null;
    return abilityScore || null;
}

export function getAbilityModifier(state, ability) {
    const abilityScore = getAbilityScore(state, ability);
    return Math.floor((abilityScore - 8) / 2);
}

export function getInventory(state) {
    return state.inventory || [];
}
