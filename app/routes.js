// These are the pages you can go to.
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'admin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/App/reducer'),
          import('containers/EditItem/reducer'),
          import('containers/App/sagas'),
          import('containers/AdminPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([adminReducer, edititemReducer, sagas, component]) => {
          injectReducer('admin', adminReducer.default);
          injectReducer('edititem', edititemReducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
