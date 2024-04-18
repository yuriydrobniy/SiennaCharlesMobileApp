import React, {useContext} from 'react';
import axios from 'axios';
import {GlobalContext} from '../../context/global-context';

export function withAPIRequest(Component) {
  const WithAPIRequest = props => {
    const globalContext = useContext(GlobalContext);
    const commonAPIRequest = ({api, method, params, data}, callback) => {
      let token = globalContext?.user ? globalContext.user.token : null;

      let headers = {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*',
      };
      let config = {
        method: method,
        url: api,
        headers: headers,
        params,
        data,
      };

      params && (config.data = params);
      console.log('CONFIG', config);
      axios(config)
        .then(response => {
          callback(response.data);
        })
        .catch(error => {
          //   globalContext.setNotifications({
          //     type: 'error',
          //     text: error.toString(),
          //   });
          console.log('ERROR_WITHAPI', error);
          callback(error);
          // callback(null);
        });
    };

    return <Component {...props} commonAPIRequest={commonAPIRequest} />;
  };

  return WithAPIRequest;
}
