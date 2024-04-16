import * as selectors from '../../src/state/selectors';
import * as actions from '../../src/state/actions';
import * as store from '../../src/state/store';


describe('integration starting-stairs', () => {
    // HACK
    beforeEach(() => {
        store.getStore().initState();
    });

    afterEach(() => {
        // eslint-disable-next-line no-undef
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('initial', () => {
        const state = store.getStore().getState();
        expect(selectors.getCurrentBlockText(state)).toEqual('You and your party circle down the stairs.  As you reach the bottom, the floor is covered in mildew and there is a mild smell of something awful, maybe rotting.  It is very dark, but as best you can tell the room appears to be empty except for an open door straight ahead.');
        expect(selectors.getCurrentBlockChoices(state)).toEqual([
            'walk-through',
            'look-first'
        ]);
    });

    test('see-nothing', () => {
        // eslint-disable-next-line no-undef
        jest.spyOn(global.Math, 'random').mockReturnValue(0.25); // d20 = 6
        const state = store.getStore().getState();
        // select look-first
        actions.selectChoice('look-first');
        // check
        expect(selectors.getCurrentBlockText(state)).toEqual('You take a few paces around the room, looking for anything out of place.  You strain your eyes as they are still adjusting to the darkness.  There doesn\'t appear to be anything here.');
        expect(selectors.getCurrentBlockChoices(state)).toEqual([
            'walk-through',
        ]);
    });

    test('see-pouch', () => {
        // eslint-disable-next-line no-undef
        jest.spyOn(global.Math, 'random').mockReturnValue(0.75); // d20 = 17
        const state = store.getStore().getState();
        // select look-first
        actions.selectChoice('look-first');
        // check
        expect(selectors.getCurrentBlockText(state)).toEqual('You take a few paces around the room, looking for anything out of place.  You strain your eyes as they are still adjusting to the darkness.  In the far corner you see the outline of what appears to be a small pouch.');
        expect(selectors.getCurrentBlockChoices(state)).toEqual([
            'walk-through',
            'open-pouch'
        ]);
        // select open-pouch
        actions.selectChoice('open-pouch');
        // check
        expect(selectors.getCurrentBlockText(state)).toEqual('You walk over and pick up a small leather pouch.  You brush off a thick layer of dust and undo a clasp to open the pouch.  Inside you find a small healing potion, which you happily add to your pack.');
        expect(selectors.getCurrentBlockChoices(state)).toEqual([
            'walk-through',
        ]);
        expect(selectors.getInventory(state)).toEqual([
            'SMALL_HEALING_POTION',
            'EMPTY_POUCH'
        ]);
    });
});
