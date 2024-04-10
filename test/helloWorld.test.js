import * as helloWorld from '../src/helloWorld';

describe('helloWorld', () => {
    test('nominal', () => {
        expect(helloWorld.sayHello('someone') ).toEqual('Hello someone!');
    });
});
