import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/users/entities/user.entity';
import { DateTime } from 'luxon';

export const generateJwt = (data: User) => {
  const expireAt = DateTime.now().toMillis() + 1000 * 60 * 60 * 8;
  const subToken = jwt.sign(
    {
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
      },
      expireAt,
    },
    data.createdAt.toISOString(),
  );

  const mainToken = jwt.sign(
    {
      email: data.email,
      subToken,
      expireAt,
    },
    process.env.JWT_SECRET,
  );

  return mainToken;
};

export const decodeJwt = (token: string, key: string) => {
  try {
    const subData = jwt.verify(token, key);
    return subData;
  } catch (err) {
    return null;
  }
};
