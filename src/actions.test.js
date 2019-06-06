import * as actions from './actions';

describe('ACTIONS', () => {
  it('fetch experiments', () => {
     const expectedAction = {
        type: 'EXPERIMENT_DATA_RECEIVED'
      }
     expect(actions.fetchExperiments()).toEqual(expectedAction)
  })
})