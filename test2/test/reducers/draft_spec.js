import chai from 'chai';
const assert = chai.assert;

import draft from '../../src/js/reducers/draft.js';

describe('reducers/draft', () => {

  it('returns a default state', () => {
        assert.deepEqual(draft(undefined, {}), {})
    });

  it('returns updated state on DRAFT/ON_CHANGE for a single field only', () => {
        assert.deepEqual(draft({
        }, {
          type: 'DRAFT/ON_CHANGE',
          componentId: "PersonComponent_4",
          table: "User",
          sysId: 457,
          field: "first_name",
          value: "Chris"
        }), { 
       "PersonComponent_4": {
          "User": {
            "457": {
              "first_name": "Chris"
            }
          }
        }
        })
    });
  
    it('tests', () => {
        assert.isTrue(false, 'needs tests');
    });



});
