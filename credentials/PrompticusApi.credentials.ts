import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PrompticusApi implements ICredentialType {
  displayName = 'Prompticus API';
  documentationUrl = 'https://docs.promptic.us/';
  name = 'prompticusApi';

  properties: INodeProperties[] = [
    {
      default: '',
      description: 'Prompticus API Access Token',
      displayName: 'Token',
      name: 'token',
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
        Authorization: '=Bearer {{$credentials.token}}',
      },
    },
    type: 'generic' as const,
  };
}
