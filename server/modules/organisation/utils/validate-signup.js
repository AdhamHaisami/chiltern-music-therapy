import Boom from '@hapi/boom';
import {
  fields,
  createSchema,
  validate as _validate,
} from '../../../services/validation';
import { userRoles } from '../../../constants';
import { errorMsgs } from '../../../services/error-handler';

const { email, password, fullName } = fields;

const clientSignUp = createSchema({
  email,
  password,
});

const therapistSignUp = createSchema({
  email,
  password,
  fullName,
});

const validate = (data) => {
  if (data.role === userRoles.CLIENT) return _validate(clientSignUp, data);

  if (data.role === userRoles.THERAPIST)
    return _validate(therapistSignUp, data);
  throw Boom.badData(errorMsgs.INVALID_USER_ROLE);
};

export default validate;