import validator from "validator";

export const isValidObjField = (obj: any) => {
  return Object.values(obj).every((value: any) => {
    return value.trim();
  });
};

export const updateError = (
  error: any,
  stateUpdater: React.Dispatch<React.SetStateAction<string>>,
) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater('');
  }, 2500);
};

export const isValidEmail = (email: string) => {
  return validator.isEmail(email);
};
