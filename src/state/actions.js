import * as store from './store';
import * as selectors from './selectors';

function diceRoll(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function d20() {
    return diceRoll(1, 20);
}

export function resolveCheck(outcome, state) {
    const checkedAbility = outcome.ability; // move to selector
    const modifier = selectors.getAbilityModifier(state, checkedAbility);
    const rawRoll = d20();
    const roll = rawRoll + modifier;
    const values = outcome.values; // move to selector
    const keys = Object.keys(values);
    let result;
    for (let i=0; i < keys.length; i++) {
        // if less than the next, take the current
        const current = values[keys[i]];
        const next = keys[i+1] ? parseInt(keys[i+1]) : null;
        if (next && roll < next) {
            result = current;
            break;
        }
        // if no next, take current
        if (!next) {
            result = current;
            break;
        }
    }
    return result;
}

export function selectChoice(choiceID) {
    // HACK: this is a temporary module that modifies state directly
    //       this is an anti-pattern as it does not enforce a single
    //       entry point or notification system - replace with proper
    //       state management and reducers
    const _state = store.getStore().getState();

    // validate
    const blockChoices = selectors.getCurrentBlockChoices(_state);
    if (!blockChoices.includes(choiceID)) {
        throw new Error('INVALID_CHOICE_FOR_BLOCK');
    }
    // get choice
    const scene = selectors.getCurrentScene(_state);
    const choices = selectors.getSceneChoices(scene);
    const choice = choices.find((next) => next.uuid === choiceID);
    if (!choice) {
        throw new Error('CHOICE_NOT_FOUND');
    }
    // resolve outcome
    const outcome = selectors.getChoiceOutcome(choice);
    const outcomeType = selectors.getOutcomeType(outcome);
    let next;
    if (outcomeType) {
        switch (outcome.type) {
        case 'single':
            next = outcome.value; // move to selector
            break;
        case 'check':
            next = resolveCheck(outcome, _state);
            break;
        default:
            throw new Error('UNEXPECTED_OUTCOME_TYPE');
        }
    }
    // update
    _state.current.blockID = next;
    // handle effects
    const nextBlock = selectors.getCurrentSceneBlockByID(_state, next);
    const effects = nextBlock.effects; // move to selector
    if (effects) {
        effects.forEach((nextEffect) => {
            const effectsType = nextEffect.type; // move to selector
            switch (effectsType) {
            case 'ADD_ITEM':
                _state.inventory.push(nextEffect.value);
                break;
            default:
                throw new Error('UNEXPECTED_EFFECTS_TYPE');
            }
        });
    }
}
