/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcryptjs');

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  const result = new Promise(async (resolve) => {
    await bcrypt.compare(password, hash, (err, res) => {
      if (res) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }).then((value) => {
    return value;
  });

  return await result;
};
