import type {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class PrompticusApi implements ICredentialType {
  displayName = 'Prompticus API';
  documentationUrl = 'https://promptic.us';
  name = 'prompticusApi';

  properties: INodeProperties[] = [
    {
      default: '',
      description: 'Prompticus API Token',
      displayName: 'API Token',
      name: 'apiToken',
      required: true,
      type: 'string',
      typeOptions: {
        password: true,
      },
    },
  ];

  authenticate = {
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiToken}}',
      },
    },
    type: 'generic' as const,
  };
}
