import { ObjectLoader, JSONLoader, TextureLoader } from 'three';

export function LoadAsset(loaderClass, url, loadingCallback = ()=>{}, index = 1) {
  const loader = new loaderClass();

  return new Promise( (resolve, reject) => {
    loader.load(url, (item) => {
      item.url = url;
      resolve(item);
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

export const LoadAssetArray = (loader, array, loadingCallback = ()=>{}) => {
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

export const GetAsset = (array = [], url) => (array.find( (i)=>(i.url === url) ));

export const loadTexture = (url, loadingCallback, index) => {
  const loader = TextureLoader;
  return LoadAsset(loader, url, loadingCallback, index);
}

export const loadTextureSet = (array, loadingCallback) => {
  const loader = TextureLoader;
  return LoadAssetArray(loader, array, loadingCallback);
}

export const loadModel = (url, loadingCallback, index) => {
  const loader = JSONLoader;
  return LoadAsset(loader, url, loadingCallback, index);
}

export const loadModelSet = (array, loadingCallback) => {
  const loader = JSONLoader;
  return LoadAssetArray(loader, array, loadingCallback);
}

export const loadScene = (url, loadingCallback, index) => {
  const loader = ObjectLoader;
  return LoadAsset(loader, url, loadingCallback, index);
}

export const loadSceneSet = (array, loadingCallback) => {
  const loader = ObjectLoader;
  return LoadAssetArray(loader, array, loadingCallback);
}
