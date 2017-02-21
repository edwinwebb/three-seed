import { TextureLoader } from 'three';

export function LoadTexture(url, loadingCallback = ()=>{}, index = 1) {
  const loader = new TextureLoader();

  return new Promise( (resolve, reject) => {
    loader.load(url, (texture) => {
      resolve(texture);
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

export const LoadTextureSet = (array, loadingCallback = ()=>{}) => {
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
    return LoadTexture(url, aggregateCallback, index);
  });

  return Promise.all(promises);
}
