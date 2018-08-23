const installer = require('electron-devtools-installer');

//require('electron-debug')({ showDevTools: true });


export const installExtensions = async () => {
        const extensions = [
          'REACT_DEVELOPER_TOOLS',
          'REACT_PERF',
          'REDUX_DEVTOOLS',
          'MOBX_DEVTOOLS'
          ];
        for (const extension of extensions)
          {
            try {installer.default(installer[extension])} 
            
            catch (error) {console.log(error)}
          }

    }

  