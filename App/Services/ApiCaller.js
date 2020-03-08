import {getBatteries} from './Api';

export const fetchBatteriesHandler = () =>
  new Promise(function(resolve, reject) {
    getBatteries()
      .then(response => {
        const {data = []} = response || {};
        resolve(data || []);
      })
      .catch(() => {
        reject();
      });
  });
