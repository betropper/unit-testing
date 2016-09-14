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
  
  it('returns updated state on DRAFT/ON_CHANGE for a single field only', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        }, {
          type: 'DRAFT/ON_CHANGE',
          componentId: "PersonComponent_4",
          table: "User",
          sysId: 457,
          field: "first_name",
          value: 1234
        }), {
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "PersonComponent_4": {
          "User": {
            "457": {
              "first_name": 1234
            }
          }
        }
        })
    });

  it('returns a changed field on DRAFT/ON_CHANGE for a single field only with null values', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        }, {
          type: 'DRAFT/ON_CHANGE',
          componentId: "PersonComponent_3",
          table: "User",
          sysId: 457,
          field: "first_name",
          value: null
        }), {
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": null
            }
          }
        }
        })
    });


  it('deals with a null value on DRAFT/ON_CHANGE for a higher level value', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "458": {
              "first_name": "Bob"
            }
          }
        }
        }, {
          type: 'DRAFT/ON_CHANGE',
          componentId: "PersonComponent_4",
          table: "User",
          sysId: 457,
          field: null,
          value: 1234
        }), {
       "PersonComponent_3": {
          "User": {
            "458": {
              "first_name": "Bob"
            }
          }
        },
       "PersonComponent_4": {
          "User": {
            "457": {
              null: 1234
            }
          }
        }
        })
    });

  it('returns updated state on DRAFT/ON_CHANGE for odd values', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        }, {
          type: 'DRAFT/ON_CHANGE',
          componentId: "PersonComponent_412323123123123123123123123123123123123123123123123123",
          table: "User",
          sysId: 457,
          field: ["first_name","second_name"],
          value: ["Bob","Bobinator1234"]
        }), {
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "PersonComponent_412323123123123123123123123123123123123123123123123123": {
          "User": {
            "457": {
              "first_name,second_name": ["Bob","Bobinator1234"]
            }
          }
        }
        })
    });

  it('returns updated state on DRAFT/ON_CHANGE_BULK for an object', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        }, {
          type: 'DRAFT/ON_CHANGE_BULK',
          componentId: "PersonComponent_412323123123123123123123123123123123123123123123123123",
          value: {
            "User": {
              "457": {
                "middle_initial": "R"
              }
          }
        }
        }), {
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "PersonComponent_412323123123123123123123123123123123123123123123123123": {
          "User": {
            "457": {
              "middle_initial": "R"
            }
          }
        }
        })
    });

  it('returns updated state on DRAFT/ON_CHANGE_BULK for a value', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        }, {
          type: 'DRAFT/ON_CHANGE_BULK',
          componentId: "PersonComponent_412323123123123123123123123123123123123123123123123123",
          value: "someValue"
        }), {
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "PersonComponent_412323123123123123123123123123123123123123123123123123": "someValue"
        })
    });

  it('returns updated state on DRAFT/ON_CHANGE_BULK for a null, and writes over previous same-named states', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        }, {
          type: 'DRAFT/ON_CHANGE_BULK',
          componentId: "PersonComponent_3",
          value: null
        }), {
       "PersonComponent_3": null
        })
    });

  it('returns updated state on DRAFT/ON_CHANGE_BULK for an odd value without dealing with closely-named states', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }

        }, {
          type: 'DRAFT/ON_CHANGE_BULK',
          componentId: "PersonComponent_3",
          value: false
        }), {
       "PersonComponent_3": false,
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        })
    });

  it('returns updated state on MAPPING/DELETED for a number without dealing with other parts of the state', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }

        }, {
          type: 'MAPPING/DELETED',
          entryId: 444,
          blockId: "text",
          sysID: "stuff"
        }), { 
       "444": {
         "blocks": {
            "text": {
              "records": []
            }
         }
       },
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        })
    });

  it('returns updated state on MAPPING/DELETED without overwriting old values within other structures', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }

        }, {
          type: 'MAPPING/DELETED',
          entryId: "PersonComponent_3",
          blockId: "text",
          sysId: "stuff"
        }), { 
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          },
         "blocks": {
            "text": {
              "records": []
            }
         }
       },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        }
        })
    });

  it('removes old sysId on case MAPPING/DELETED. It also overwrites old blocks and deals with redundant structures', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
        }
       },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          },
         "blocks": {
            "text": {
              "records": ["stuff","things"]
            }
         }
       }
        }, {
          type: 'MAPPING/DELETED',
          entryId: "Personcomponent_3",
          blockId: "text",
          sysId: "stuff",
        }), { 
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          },
       },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          },
         "blocks": {
            "text": {
              "records": []
            }
         }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          },

         "blocks": {
            "text": {
              "records": ["things"]
            }
         }
        }
        })
    });

  it('removes the table element on MAPPING/SAVE_SUCCEEDED for only the element', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
       }
        }, {
          type: 'MAPPING/SAVE_SUCCEEDED',
          entryId: "PersonComponent_3",
          blockId: "text",
          sysId: "stuff",
          entryID: 455,
          table: "User"
        }), { 
       "PersonComponent_3": {},
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
         }
        })
    });

  it('removes the table element on MAPPING/SAVE_SUCCEEDED for only the element', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          },
          "Group": {
            "455": {
              "group_name": "coders"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
       }
        }, {
          type: 'MAPPING/SAVE_SUCCEEDED',
          entryId: "PersonComponent_3",
          blockId: "text",
          sysId: "stuff",
          entryID: 455,
          table: "User"
        }), { 
       "PersonComponent_3": {
          "Group": {
            "455": {
              "group_name": "coders"
            }
          }
       },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
         }
        })
    });

  it('removes the table element on MAPPING/SAVE_SUCCEEDED for only the element if the entryId or table is an int', () => {
        assert.deepEqual(draft({
       "PersonComponent_3": {
          "455": {
            "457": {
              "first_name": "Bob"
            }
          },
          "Group": {
            "455": {
              "group_name": "coders"
            }
          }
        },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
       }
        }, {
          type: 'MAPPING/SAVE_SUCCEEDED',
          entryId: "PersonComponent_3",
          blockId: "text",
          sysId: 333,
          entryID: 455,
          table: 455
        }), { 
       "PersonComponent_3": {
          "Group": {
            "455": {
              "group_name": "coders"
            }
          }
       },
       "Personcomponent_3": {
          "User": {
            "457": {
              "first_name": "Bob"
            }
          }
         }
        })
    });
});
