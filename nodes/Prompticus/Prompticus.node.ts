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
    displayName: 'Resource',
    default: 'prompt',
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
    displayName: 'Operation',
    default: 'getMany',
    displayOptions: {
      show: {
        resource: ['prompt'],
      },
    },
    name: 'operation',
    noDataExpression: true,
    options: [
      {
        action: 'Create a prompt',
        description: 'Create a prompt',
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
        action: 'Delete a prompt',
        description: 'Delete a prompt',
        name: 'Delete',
        routing: {
          request: {
            method: 'DELETE',
            url: '=/prompts/{{$parameter.guid}}',
          },
        },
        value: 'delete',
      },
      {
        action: 'Get many prompts',
        description: 'Get many prompts',
        name: 'Get Many',
        routing: {
          request: {
            method: 'GET',
            url: '/prompts',
          }
        },
        value: 'getMany',
      },
      {
        action: 'Get one prompt',
        description: 'Get one prompt',
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
        action: 'Update a prompt',
        description: 'Update a prompt',
        name: 'Update',
        routing: {
          request: {
            method: 'PUT',
            url: '=/prompts/{{$parameter.guid}}',
          },
        },
        value: 'update',
      },
    ],
    type: 'options',
  }
];

const getManyProperties: INodeProperties[] = [
  {
    displayName: 'Filter',
    name: 'filter',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: {
      show: {
        operation: ['getMany'],
        resource: ['prompt'],
      }
    },
    default: {},
    options: [
      {
        displayName: 'Keyword',
        name: 'q',
        default: '',
        description: 'Search by keyword',
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
    displayName: 'GUID',
    default: '',
    description: 'Prompt GUID',
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
    displayName: 'Dynamic Variables',
    default: {},
    description: 'Replace dynamic variables in your prompt',
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
            displayName: 'Name',
            default: '',
            description: 'Variable Name',
            name: 'key',
            required: true,
            type: 'string',
          },
          {
            displayName: 'Value',
            default: '',
            description: 'Variable Value',
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
    displayName: 'Body',
    default: '',
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
    displayName: 'GUID',
    default: '',
    description: 'Prompt GUID',
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
    displayName: 'Body',
    default: '',
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
    displayName: 'GUID',
    default: '',
    description: 'Prompt GUID',
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
    description: 'Prompticus API Access Token',
    displayName: 'Prompticus',
    group: ['transform'],
    inputs: [NodeConnectionType.Main],
    name: 'prompticus',
    outputs: [NodeConnectionType.Main],
    properties: [
      ...resourceProperties,
      ...operationProperties,
      ...createProperties,
      ...deleteProperties,
      ...getManyProperties,
      ...getOneProperties,
      ...updateProperties,
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
