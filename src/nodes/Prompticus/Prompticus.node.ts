import {
  NodeConnectionType,
} from 'n8n-workflow';
import type {
  INodeProperties,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

const resourceProperties: INodeProperties[] = [
  {
    default: 'prompt',
    displayName: 'Resource',
    name: 'resource',
    noDataExpression: true,
    options: [
      {
        name: 'Prompt',
        value: 'prompt',
      },
    ],
    type: 'options',
  }
];

const operationProperties: INodeProperties[] = [
  {
    default: 'getList',
    displayName: 'Operation',
    displayOptions: {
      show: {
        resource: ['prompt'],
      },
    },
    name: 'operation',
    noDataExpression: true,
    options: [
      {
        action: 'Get List of Prompts',
        description: 'Get List of Prompts',
        name: 'Get List',
        routing: {
          request: {
            method: 'GET',
            url: '/prompts',
          }
        },
        value: 'getList',
      },
      {
        action: 'Get a Prompt',
        description: 'Get a Prompt',
        name: 'Get One',
        routing: {
          request: {
            method: 'GET',
            url: '=/prompts/{{$parameter.guid}}',
          },
        },
        value: 'getOne',
      },
      {
        action: 'Create a Prompt',
        description: 'Create a Prompt',
        name: 'Create',
        routing: {
          request: {
            method: 'POST',
            url: '/prompts',
          },
        },
        value: 'create',
      },
      {
        action: 'Update a Prompt',
        description: 'Update a Prompt',
        name: 'Update',
        routing: {
          request: {
            method: 'PUT',
            url: '=/prompts/{{$parameter.guid}}',
          },
        },
        value: 'update',
      },
      {
        action: 'Delete a Prompt',
        description: 'Delete a Prompt',
        name: 'Delete',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/prompts/{{$parameter.guid}}',
          },
        },
        value: 'delete',
      },
    ],
    type: 'options',
  }
];

const getListProperties: INodeProperties[] = [
  {
    displayName: 'Filter',
    name: 'filter',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: {
      show: {
        operation: ['getList'],
        resource: ['prompt'],
      }
    },
    default: {},
    options: [
      {
        name: 'q',
        default: '',
        description: 'Search by Keyword',
        displayName: 'Keyword',
        type: 'string',
        routing: {
          send: {
            type: 'query',
            property: 'q',
          }
        }
      },
    ],
  }
];

const getOneProperties: INodeProperties[] = [
  {
    default: '',
    description: 'Prompt GUID (ID) to retrieve',
    displayName: 'GUID',
    displayOptions: {
      show: {
        operation: ['getOne'],
        resource: ['prompt'],
      }
    },
    name: 'guid',
    required: true,
    type: 'string',
  },
  {
    default: {},
    description: 'Replace dynamic variables in your prompt',
    displayName: 'Dynamic Variables',
    displayOptions: {
      show: {
        operation: ['getOne'],
        resource: ['prompt'],
      }
    },
    name: 'dynamicVariables',
    options: [
      {
        displayName: 'Pairs',
        name: 'pairs',
        values: [
          {
            default: '',
            description: 'Variable Name',
            displayName: 'Name',
            name: 'key',
            required: true,
            type: 'string',
          },
          {
            default: '',
            description: 'Variable Value',
            displayName: 'Value',
            name: 'value',
            required: true,
            type: 'string',
          },
        ],
      },
    ],
    routing: {
      send: {
        property: 'variables',
        type: 'query',
        value: '={{ Object.fromEntries(Object.values($parameter.dynamicVariables.pairs).map(item => [item.key, item.value])) }}'
      }
    },
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
  }
];

const createProperties: INodeProperties[] = [
  {
    default: '',
    description: 'Body',
    displayName: 'Body',
    displayOptions: {
      show: {
        operation: ['create'],
        resource: ['prompt'],
      }
    },
    name: 'body',
    required: true,
    routing: {
      send: {
        type: 'body',
        property: 'body',
      }
    },
    type: 'string',
  }
];

const updateProperties: INodeProperties[] = [
  {
    default: '',
    description: 'Prompt GUID to update',
    displayName: 'GUID',
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['prompt'],
      }
    },
    name: 'guid',
    required: true,
    type: 'string',
  },
  {
    default: '',
    description: 'Body',
    displayName: 'Body',
    displayOptions: {
      show: {
        operation: ['update'],
        resource: ['prompt'],
      }
    },
    name: 'body',
    routing: {
      send: {
        type: 'body',
        property: 'body',
      }
    },
    type: 'string',
  }
];

const deleteProperties: INodeProperties[] = [
  {
    default: '',
    description: 'Prompt GUID to delete',
    displayName: 'GUID',
    displayOptions: {
      show: {
        operation: ['delete'],
        resource: ['prompt'],
      }
    },
    name: 'guid',
    required: true,
    type: 'string',
  }
];

export class Prompticus implements INodeType {
  description: INodeTypeDescription = {
    credentials: [
      {
        name: 'prompticusApi',
        required: true,
      },
    ],
    defaults: {
      name: 'Prompticus',
    },
    description: 'Prompticus API',
    displayName: 'Prompticus',
    group: ['transform'],
    inputs: [NodeConnectionType.Main],
    name: 'prompticus',
    outputs: [NodeConnectionType.Main],
    properties: [
      ...resourceProperties,
      ...operationProperties,
      ...getListProperties,
      ...getOneProperties,
      ...createProperties,
      ...updateProperties,
      ...deleteProperties,
    ],
    requestDefaults: {
      baseURL: 'https://api.promptic.us/v1',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    version: 1,
  };
}
