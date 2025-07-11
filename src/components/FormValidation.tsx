const nameInitialToUppercase = (name: string) => {
  let str = name;
  const initial = str[0].toUpperCase();
  const restOfName = str.slice(1, str.length);
  return (str = initial + restOfName);
};

export const isValidNameInput = (name: string) => {
  // Invalid characters
  const itemsToNotInclude: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "@",
    "!",
    ",",
    ".",
    '"',
    "'",
  ];

  const nameLetters: string[] = name.split("");
  // Check if all chars are just letters
  if (nameLetters.some((letter) => itemsToNotInclude.includes(letter))) {
    console.log("Some characters are not lettes");
    return false;
  } else nameInitialToUppercase(name);
  // Change initial letter to uppercase
  return true;
};

export const isValidEmailInput = (email: string) => {
  const str = email.split("@");

  //   Check if email === left@right
  if (str.length !== 2 || str[0].length === 0 || str[1].length < 3)
    return false;

  const rightStructure = str[1].split(".");

  // Check if right === @xxx.xxx
  if (
    rightStructure.length < 2 ||
    rightStructure[0].length === 0 ||
    rightStructure[1].length === 0
  )
    return false;

  return true;
};

export const isValidAgeInput = (age: string) => {
  const number = parseInt(age);

  if (number < 18 || number > 100) return false;

  return true;
};

export const isValidDriverId = (driverId: string) => {
  const number = parseInt(driverId);

  if (number > 1000000000 || number < 100000000) return false;

  return true;
};
