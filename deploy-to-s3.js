require('dotenv').config({ path: __dirname + '/.env.private' });
const { uploadDirectory } = require('s3-lambo');

const run = async () => {
  await uploadDirectory({
    path: './build',
    params: {
      Bucket: 'pktgmz.com',
    },
  });
};

run();
