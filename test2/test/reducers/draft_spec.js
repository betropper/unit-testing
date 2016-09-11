import chai from 'chai';
const assert = chai.assert;

import draft from '../../src/js/reducers/draft.js';

describe('reducers/draft', () => {

  it('returns a default state', () => {
        assert.deepEqual(draft(undefined, {}), {})
    });

  it('returns updated state on ATTACHMENT/DELETE with null values for deletedSysID and deletedFileName if there is no file attribute', () => {
        assert.deepEqual(draft({
            handbookAttachment: [{
              file_name: 'file name'
            }],
            loading: false,
            stuff: true,
            message: null,
        }, {
          type: 'ATTACHMENT/DELETE',
        }), {
            handbookAttachment: [{
              file_name: 'file name'
            }],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null,
            stuff: true
        })
    });
  
    it('tests', () => {
        assert.isTrue(false, 'needs tests');
    });



});
