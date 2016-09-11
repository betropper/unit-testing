import chai from 'chai';
const assert = chai.assert;

import attachments from '../../src/js/reducers/attachments.js';

describe('reducers/attachments', () => {

  it('returns initial state', () => {
        assert.deepEqual(attachments(undefined, {}), {
          handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });


  it('updates handbookAttachment on SERVER/FETCHED', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'SERVER/FETCHED',
          data: {
            handbookAttachment: ['test1', 'test2', 'test3']
          }
        
        }), {
            handbookAttachment: ['test1', 'test2', 'test3'],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates handbookAttachment on SERVER/FETCHED to a null', () => {
        assert.deepEqual(attachments({
            handbookAttachment: ['test1', 'test2', 'test3'],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'SERVER/FETCHED',
          data: {
            handbookAttachment: null
          }
        
        }), {
            handbookAttachment: null,
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });


  it('updates handbookAttachment on SERVER/FETCHED if the state is empty', () => {
        assert.deepEqual(attachments({}, {
          type: 'SERVER/FETCHED',  
          data: {
            handbookAttachment: ['test1', 'test2', 'test3']
          }
        
        }), {
            handbookAttachment: ['test1', 'test2', 'test3']
        })
    });


  it('updates handbookAttachment on SERVER/FETCHED if the state is empty and the action is empty', () => {
        assert.deepEqual(attachments({}, {
            type: 'SERVER/FETCHED',
        }), {
            handbookAttachment: [undefined],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });


  it('updates handbookAttachment on SERVER/FETCHED if the state is default to an irregular value', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'SERVER/FETCHED',
          data: {
            handbookAttachment: 'testing'
          }
        }), {
            handbookAttachment: 'testing',
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates handbookAttachment on SERVER/FETCHED if the state is null and there is no handbookAttachment', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'SERVER/FETCHED',
          data: {
            test: 'something'
          }
        
        }), {
            handbookAttachment: [undefined],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates message on GROUP/TOGGLE_EDIT to an empty string and also ignores changes in the handbookAttachment', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'GROUP/TOGGLE_EDIT',
          data: {
            handbookAttachment: 'testing'
          }
        }), {
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });


  it('updates message for GROUP/TOGGLE_EDIT if message is not a string', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            message: null,
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'GROUP/TOGGLE_EDIT',
        }), {
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates message for GROUP/TOGGLE_EDIT if message is not a string', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            message: 1,
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'GROUP/TOGGLE_EDIT',
        }), {
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates message for GROUP/TOGGLE_EDIT if message is not a string', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            message: [undefined],
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'GROUP/TOGGLE_EDIT',
        }), {
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates message for GROUP/TOGGLE_EDIT if state is empty', () => {
        assert.deepEqual(attachments({}, {
          type: 'GROUP/TOGGLE_EDIT',
        }), {
            message: '',
        })
    });

  it('updates message for GROUP/TOGGLE_EDIT if state is undefined', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'GROUP/TOGGLE_EDIT',
        }), {
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates message for GROUP/TOGGLE_EDIT if state is strange', () => {
        assert.deepEqual(attachments({
          oddValue: 'stuff',
          differentValue: null
        }, {
          type: 'GROUP/TOGGLE_EDIT',
        }), {
            oddValue: 'stuff',
            differentValue: null,
            message: '',
        })
    });

  it('updates loading for ATTACHMENT/ADDING', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        }, {
          type: 'ATTACHMENT/ADDING',
        }), {
            handbookAttachment: [],
            loading: true,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates loading for ATTACHMENT/ADDING if it is not a boolean. Also does not change extra values, and changes deleted values to null.', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [1,2,3],
            loading: 'false',
            message: 'message',
            deletedSysId: 'id',
            deletedFileName: 'name'
        }, {
          type: 'ATTACHMENT/ADDING',
        }), {
            handbookAttachment: [1,2,3],
            loading: true,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates ATTACHMENT/ADDING values if the state is undefined', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/ADDING',
        }), {
            handbookAttachment: [],
            loading: true,
            message: '',
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates ATTACHMENT/ADDED values with a default/undefined state', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/ADDED',
          file: 'file name'
        }), {
            handbookAttachment: ['file name'],
            loading: false,
            message: "The progression map has been saved.",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates ATTACHMENT/ADDED values with a default/undefined state and a null action.file', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/ADDED',
        }), {
            handbookAttachment: [undefined],
            loading: false,
            message: "The progression map has been saved.",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates ATTACHMENT/ADDED values with a default/undefined state and a null action.file', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/ADDED',
          file: {
            file_name: null
          }
        }), {
            handbookAttachment: [{
              file_name: null
            }],
            loading: false,
            message: "The progression map has been saved.",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates ATTACHMENT/ADDED values with an incomplete state and an unusual state', () => {
        assert.deepEqual(attachments({
          something: true,
          message: 'this is text'
        }, {
          type: 'ATTACHMENT/ADDED',
          file: 'file name'
        }), {
            something: true,
            handbookAttachment: ['file name'],
            loading: false,
            message: "The progression map has been saved.",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('returns a failed state on ATTACHMENT/ADD_FAILED based on a default state', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/ADD_FAILED'
        }), {
            handbookAttachment: [],
            loading: false,
            message: "The progression map failed to save.",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('returns a failed state on ATTACHMENT/UNDO_DELETE_FAIL based on a default state', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/UNDO_DELETE_FAIL'
        }), {
            handbookAttachment: [],
            loading: false,
            message: "The progression map failed to save.",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('returns a failed state on ATTACHMENT/UNDO_DELETE_FAIL based on an incomplete/odd state', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [],
            loading: false,
            stuff: true,
            message: "The progression map failed to save.",
        }, {
          type: 'ATTACHMENT/UNDO_DELETE_FAIL'
        }), {
            handbookAttachment: [],
            loading: false,
            message: "The progression map failed to save.",
            deletedSysId: null,
            deletedFileName: null,
            stuff: true
        })
    });

  it('returns a failed state on ATTACHMENT/UNDO_DELETE_FAIL based on an incomplete/odd state', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [1,2,3],
        }, {
          type: 'ATTACHMENT/UNDO_DELETE_FAIL'
        }), {
            handbookAttachment: [],
            loading: false,
            message: "The progression map failed to save.",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates ATTACHMENT/UNDO_DELETE values that already exist', () => {
        assert.deepEqual(attachments({
          loading: true,
          message: 'this is text',
          deletedSysId: true,
          deletedFileName: 'text',
          something: true
        }, {
          type: 'ATTACHMENT/UNDO_DELETE',
          file: 'file name'
        }), {
            something: true,
            handbookAttachment: ['file name'],
            loading: false,
            message: "Undo deleted successful",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('updates ATTACHMENT/UNDO_DELETE values with an incomplete state and an unusual state', () => {
        assert.deepEqual(attachments({
          something: true,
          message: 'this is text'
        }, {
          type: 'ATTACHMENT/UNDO_DELETE',
          file: 'file name'
        }), {
            something: true,
            handbookAttachment: ['file name'],
            loading: false,
            message: "Undo deleted successful",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('returns based on a default state in case ATTACHMENT/UNDO_DELETE', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/UNDO_DELETE'
        }), {
            handbookAttachment: [undefined],
            loading: false,
            message: "Undo deleted successful",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('returns based on a default state in case ATTACHMENT/UNDO_DELETE', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/UNDO_DELETE',
          file: {
            file_name:'file name'
          }
        }), {
            handbookAttachment: [{
              file_name: 'file name'
            }],
            loading: false,
            message: "Undo deleted successful",
            deletedSysId: null,
            deletedFileName: null
        })
    });
  
  it('returns based on a default state in case ATTACHMENT/UNDO_DELETE', () => {
        assert.deepEqual(attachments(undefined, {
          type: 'ATTACHMENT/UNDO_DELETE',
          file: {
            file_name: null
          }
        }), {
            handbookAttachment: [{
              file_name: null
            }],
            loading: false,
            message: "Undo deleted successful",
            deletedSysId: null,
            deletedFileName: null
        })
    });

  it('returns updated state on ATTACHMENT/DELETE based on filled or null values', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [{
              file_name: 'file name'
            }],
            loading: false,
            stuff: true,
            message: "The progression map failed to save",
        }, {
          type: 'ATTACHMENT/DELETE',
          file: {
            file_name: null,
            sys_id: null
          }
        }), {
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: null,
            deletedFileName: null,
            stuff: true
        })
    });


  it('returns updated state on ATTACHMENT/DELETE based on undefined values', () => {
        assert.deepEqual(attachments({
            handbookAttachment: [{
              file_name: 'file name'
            }],
            loading: false,
            stuff: true,
            message: null,
        }, {
          type: 'ATTACHMENT/DELETE',
          file: {}
        }), {
            handbookAttachment: [],
            loading: false,
            message: '',
            deletedSysId: undefined,
            deletedFileName: undefined,
            stuff: true
        })
    });


  it('returns updated state on ATTACHMENT/DELETE with null values for deletedSysID and deletedFileName if there is no file attribute', () => {
        assert.deepEqual(attachments({
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

});
