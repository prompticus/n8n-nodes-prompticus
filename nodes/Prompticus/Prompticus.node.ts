import { NodeConnectionType } from 'n8n-workflow';
import type { INodeProperties, INodeType, INodeTypeDescription } from 'n8n-workflow';
import prompts from './PromptDescription';

const API_URL: string = 'https://api.promptic.us/v1';
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
  },
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
      ...prompts.properties.operations,
      ...prompts.properties.create,
      ...prompts.properties.update,
      ...prompts.properties.delete,
      ...prompts.properties.form,
      ...prompts.properties.getMany,
      ...prompts.properties.getOne,
    ],
    requestDefaults: {
      baseURL: API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    version: 1,
  };
}
