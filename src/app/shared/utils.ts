export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

export const getUniqueId = () => crypto.randomUUID();
