import zlib from 'react-zlib-js';
import axios from 'axios';
import {Buffer} from 'buffer';

export default async function api(doc, json) {
  const cmpr = zlib.deflateSync(JSON.stringify(json)).toString('base64');

  let returndata = null;

  const data = {crpt: cmpr};
  let queue = 'dev_emerson';

  if (__DEV__) {
    queue = 'dev_clovis';
  }

  await axios
    .post('https://ws-1.polishop.com/msgbroker/wk/' + queue + '/' + doc, data, {
      timeout: 30000,
    })
    .then(response => {
      if (!response.data.crpt) {
        returndata = response.data;
      } else {
        const buf = Buffer.from(response.data.crpt, 'base64');
        returndata = JSON.parse(zlib.inflateSync(buf).toString());
      }
    })
    .catch(err => {
      console.log(err.message);
      return null;
      //this.state.connectionerror = true;
      //this.setState(this.state);
    });

  return returndata;
}
