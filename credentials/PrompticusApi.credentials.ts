import type {
  IAuthenticateGeneric,
  ICredentialType,
  ICredentialTestRequest,
  INodeProperties,
} from 'n8n-workflow';

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

  authenticate: IAuthenticateGeneric = {
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.token}}',
      },
    },
    type: 'generic',
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: 'https://api.promptic.us',
      url: 'authentication/test',
    },
  };
}
