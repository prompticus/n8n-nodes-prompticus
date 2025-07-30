import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
  create: {
    show: {
      operation: ['create'],
      resource: ['prompt'],
    },
  },
  delete: {
    show: {
      operation: ['delete'],
      resource: ['prompt'],
    },
  },
  form: {
    show: {
      operation: ['create', 'update'],
      resource: ['prompt'],
    },
  },
  getMany: {
    show: {
      operation: ['getMany'],
      resource: ['prompt'],
    },
  },
  getOne: {
    show: {
      operation: ['getOne'],
      resource: ['prompt'],
    },
  },
  operation: {
    show: {
      resource: ['prompt'],
    },
  },
  update: {
    show: {
      operation: ['update'],
      resource: ['prompt'],
    },
  },
};

export const operationProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    default: 'getMany',
    displayOptions: displayOptions.operation,
    name: 'operation',
    noDataExpression: true,
    options: [
      {
        action: 'Create prompt',
        description: 'Create prompt',
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
        action: 'Delete prompt',
        description: 'Delete prompt',
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
          },
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
        action: 'Update prompt',
        description: 'Update prompt',
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
  },
];

export const getManyProperties: INodeProperties[] = [
  {
    displayName: 'Filter',
    name: 'filter',
    type: 'collection',
    placeholder: 'Add Filter',
    displayOptions: displayOptions.getMany,
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
          },
        },
      },
    ],
  },
];

export const getOneProperties: INodeProperties[] = [
  {
    displayName: 'GUID',
    default: '',
    description: 'Prompt GUID',
    displayOptions: displayOptions.getOne,
    name: 'guid',
    required: true,
    type: 'string',
  },
  {
    displayName: 'Variables',
    default: {},
    description: 'Replace variables in your prompt',
    displayOptions: displayOptions.getOne,
    name: 'dynamicVariables',
    options: [
      {
        displayName: 'KeyValue',
        name: 'keyvalue',
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
        value:
          '={{ Object.fromEntries(Object.values($parameter.dynamicVariables.keyvalue).map(item => [item.key, item.value])) }}',
      },
    },
    type: 'fixedCollection',
    typeOptions: {
      multipleValues: true,
    },
  },
];

export const formProperties: INodeProperties[] = [
  {
    displayName: 'Title',
    default: '',
    displayOptions: displayOptions.form,
    name: 'title',
    required: true,
    routing: {
      send: {
        type: 'body',
        property: 'title',
      },
    },
    type: 'string',
  },
  {
    displayName: 'Description',
    default: '',
    description: 'Brief description of what this prompt does or its intended purpose',
    displayOptions: displayOptions.form,
    name: 'description',
    required: true,
    routing: {
      send: {
        type: 'body',
        property: 'description',
      },
    },
    type: 'string',
    typeOptions: {
      rows: 2,
    },
  },
  {
    displayName: 'Body',
    default: '',
    description:
      'The full prompt text with any variables, instructions, and context. Use mustache syntax for variables (i.e. {{COUNT}}).',
    displayOptions: displayOptions.form,
    name: 'body',
    required: true,
    routing: {
      send: {
        type: 'body',
        property: 'body',
      },
    },
    type: 'string',
    typeOptions: {
      rows: 4,
    },
  },
];

export const createProperties: INodeProperties[] = [];

export const updateProperties: INodeProperties[] = [
  {
    displayName: 'GUID',
    default: '',
    description: 'Prompt GUID',
    displayOptions: displayOptions.update,
    name: 'guid',
    required: true,
    type: 'string',
  },
];

export const deleteProperties: INodeProperties[] = [
  {
    displayName: 'GUID',
    default: '',
    description: 'Prompt GUID',
    displayOptions: displayOptions.delete,
    name: 'guid',
    required: true,
    type: 'string',
  },
];

export default {
  properties: {
    create: createProperties,
    delete: deleteProperties,
    form: formProperties,
    getMany: getManyProperties,
    getOne: getOneProperties,
    operations: operationProperties,
    update: updateProperties,
  },
};
