export const useValidator = () => {

  const email = (email) => {
    const regexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i;

    return email && regexp.test(email);
  };

  const password = (password) => {
    return password && (password.length > 5 && password.length < 256);
  };

  const accountName = (account) => {
    return account && (account.length > 2 && account.length < 65);
  };

  return {email, password, accountName, useValidator};
};
