export const password =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@;.:_\-/])[A-Za-z\d@;.:_\-/]{6,16}$/;

export const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

export const matchKey = (key: string) => {
  return new RegExp(`{${key}}`, 'g');
};

export const HOUR12FORMAT = /^(0[1-9]|1[0-2]):[0-5][0-9](AM|PM)$/;

export const HOUR24FORMAT = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

export const numbers = (length: number, lengthEnd?: number) => {
  return new RegExp(`^[0-9]{${length},${lengthEnd ?? length}}$`);
};

export const string = (lengthStart: number, lengthEnd: number) => {
  return new RegExp(`^[a-zA-Z ]{${lengthStart},${lengthEnd}}$`);
};
