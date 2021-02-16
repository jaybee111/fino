// eslint-disable-next-line import/no-extraneous-dependencies
import { Server, Model } from 'miragejs';

export default function makeServer(environment) {
  return new Server({
    environment,
    models: {
      movie: Model,
    },

    routes() {
      this.namespace = 'api';

      this.get('/folders', () => ([
        {
          path: '/folder1',
          name: 'Folder1',
          children: [
            {
              path: '/folder1/subfolder1',
              name: 'SubFolder1',
              children: [
                {
                  path: '/folder1/subfolder1/subsubfolder1',
                  name: 'SubSubFolder1',
                },
                {
                  path: '/folder1/subfolder1/subsubfolder2',
                  name: 'SubSubFolder2',
                },
              ],
            },
            {
              path: '/folder1/subfolder2',
              name: 'SubFolder2',
            },
            {
              path: '/folder1/subfolder3',
              name: 'SubFolder3',
            },
          ],
        },
        { path: '/folder2', name: 'Folder2', children: [] },
        { path: '/folder3', name: 'Folder3', children: [] },
      ]));
    },
  });
}
