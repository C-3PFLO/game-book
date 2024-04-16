const sampleState = {
    abilities: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        wisdom: 10,
        intelligence: 10,
        charisma: 10,
    },
    equiped: {},
    inventory: [],
    current: {
        sceneID: 'starting-stairs',
        blockID: 'initial',
    },
    scenes: {
        'starting-stairs': {
            choices: [
                {
                    uuid: 'walk-through',
                    text: 'Walk through the doorway.',
                    outcome: {
                        type: 'single',
                        value: 'step-into-hallway'
                    }
                },
                {
                    uuid: 'look-first',
                    text: 'Look around.',
                    outcome: {
                        type: 'check',
                        ability: 'wisdom',
                        values: {
                            1: 'see-nothing',
                            15: 'see-pouch'
                        }
                    }
                },
                {
                    uuid: 'open-pouch',
                    text: 'Open the pouch.',
                    outcome: {
                        type: 'single',
                        value: 'reveal-pouch'
                    }
                },
            ],
            blocks: {
                'initial': {
                    text: 'You and your party circle down the stairs.  As you reach the bottom, the floor is covered in mildew and there is a mild smell of something awful, maybe rotting.  It is very dark, but as best you can tell the room appears to be empty except for an open door straight ahead.',
                    choices: [
                        'walk-through',
                        'look-first'
                    ]
                },
                'see-nothing': {
                    text: 'You take a few paces around the room, looking for anything out of place.  You strain your eyes as they are still adjusting to the darkness.  There doesn\'t appear to be anything here.',
                    choices: [
                        'walk-through'
                    ]
                },
                'see-pouch': {
                    text: 'You take a few paces around the room, looking for anything out of place.  You strain your eyes as they are still adjusting to the darkness.  In the far corner you see the outline of what appears to be a small pouch.',
                    choices: [
                        'walk-through',
                        'open-pouch'
                    ]
                },
                'reveal-pouch': {
                    text: 'You walk over and pick up a small leather pouch.  You brush off a thick layer of dust and undo a clasp to open the pouch.  Inside you find a small healing potion, which you happily add to your pack.',
                    effects: [
                        {
                            type: 'ADD_ITEM',
                            value: 'SMALL_HEALING_POTION'
                        },
                        {
                            type: 'ADD_ITEM',
                            value: 'EMPTY_POUCH'
                        }
                    ],
                    choices: [
                        'walk-through',
                    ]
                }
            }
        },
    },
};

// singleton
let state;

/**
 * Temporary store implementation
 * @return {Object}
 */
export function getStore() {
    return {
        getState: function() {
            return state;
        },
        initState: function() {
            state = structuredClone(sampleState);
        }
    };
}
