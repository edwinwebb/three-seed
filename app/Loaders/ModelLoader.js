import { ObjectLoader } from 'three';

export function LoadModel(url, loadingCallback = ()=>{}, index = 1) {
  const loader = new ObjectLoader();

  return new Promise( (resolve, reject) => {
    loader.load(url, (scene) => {
      scene.url = url;
      resolve(scene);
    },(xhr) => {
      const { total, loaded } = xhr;
      let deci = loaded/total;
      if(deci === Infinity) {
          deci = 1;
      }
      if(loadingCallback) {
          loadingCallback(deci, index);
      }
    }, () => {
      reject(new Error('404 on Model: ' + url));
    });
  });
}

export const LoadModelSet = (array, loadingCallback = ()=>{}) => {
  const length = array.length;
  const totals = new Array(length);
  const aggregateCallback = (deci, index) => {
    totals[index] = deci;
    const total = totals.reduce((m,i)=>(m+i), 0);
    const totalAsDecimal = total / length;
    const totalAsPercent = Math.floor(totalAsDecimal * 100);

    loadingCallback(totalAsPercent);
  };
  const promises = array.map((url, index) => {
    return LoadModel(url, aggregateCallback, index);
  });

  // load one, report to action
  return Promise.all(promises);
}

export const GetModel = (array = [], url) => (array.find( (i)=>(i.url === url) ));
