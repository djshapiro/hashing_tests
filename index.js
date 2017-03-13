const sha = require('sha.js')('sha256');
const md5 = require('./node_modules/blueimp-md5/js/md5.js');
const timeit = require('timeit');

const iterations = 5000;
//const value = "aoeuasonetbusanotehaoeisraoceib";
//const value = {'a': 1, 'b': 3, 'c': 5, 'd': {'e': 5, 'f': [1,2,3,4]}};
const query = "query ProductQuery($productId: String!){product(id: $productId) {crossRelDetailMessage,crossRelProductURL,fabricCare,gender,      internationalShippingAvailable,      listPrice,      name,      productDescription,      productId,      productImage,      productURL,      promoMessage,      salePrice,      breadCrumbCategory {        categoryName,        h1CategoryName,        links {          rel,          href        }        breadCrumbCategory {          categoryName,          h1CategoryName,          links {            rel,            href          }        },      },      colorSlices {        color,        defaultSlice,        ipColorCode,        swatchURL,        imageMap {          LARGE        },        skus {          displayMSRP,          displayPrice,          skuId,          sizeName,          inventoryMessage,          onlineInventoryCount,          inStoreInventoryCount,          sizeExtension1,          sizeExtension2        }      },      relatedProducts {        listPrice,        name,        productId,        productImage,        productURL,        salePrice      },    }    reviewStats (id: $productId) {      totalReviewCount,      averageOverallRating,    }  }";

const variables = JSON.stringify({
    'color': undefined,
    'opName': 'MyQuery',
    'productId': '9163393',
    'size': undefined,
    'splat': ''
});

const value = query + variables;

useMD5 = (done) => {
  md5(value);
  done();
};

useSHA = (done) => {
  sha.update(value, 'utf8').digest('hex');
  done();
};

useNothing = (done) => {
    done();
};

timeit.howlong(iterations, [useMD5, useSHA, useNothing], (err, results) => {
  console.log('Baseline', results[0].average_step_runtime);
  console.log('MD5', results[1].average_step_runtime);
  console.log('SHA', results[2].average_step_runtime);
  console.log('Nothing', results[3].average_step_runtime);
});
