export const removeFormatting = (str: string) => {
  return str.replaceAll('_', '').replaceAll('-', '').replaceAll('.', '');
}

export const firstAndSecondCharOnlyMask = (value: string, mask: string = '*') => {
  if (mask.length > 2) {
    throw new Error(
      '[firstAndSecondCharOnlyMask] Mask string must contain only two character'
    );
  }

  const [firstChar, secondChar, ...restChars] = value.split('');
  const maskedValue = restChars.reduce(
    currentValue => currentValue + mask,
    firstChar + secondChar
  );
  return maskedValue;
}

export const formatEmail = (email: string) => {
  // eslint-disable-next-line
  const emailExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!emailExp.test(email)) {
    throw new Error('[emailMask] String provided is not an email');
  }

  const [userName, domain] = email.split('@');
  const [domainName, ...extensions] = domain.split('.');

  const maskedUserName = firstAndSecondCharOnlyMask(userName);
  const maskedDomainName = firstAndSecondCharOnlyMask(domainName);
  const formatedExtension = extensions.reduce(
    (value, extension) => `${value}.${extension}`,
    ''
  );

  const maskedEmail = `${maskedUserName}@${maskedDomainName}${formatedExtension}`;
  return maskedEmail;
}

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return formatter.format(value);
}
