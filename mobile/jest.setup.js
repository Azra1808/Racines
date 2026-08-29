// Les tests portent sur la logique (canaux, garde-fous, traductions) et non
// sur la base embarquée. `expo-sqlite` charge des modules natifs absents de
// l'environnement Node ; on le remplace par une base en mémoire, ce qui
// permet aussi de vérifier la persistance des préférences sans téléphone.

jest.mock('expo-sqlite', () => {
  const tables = new Map();

  function table(nom) {
    if (!tables.has(nom)) tables.set(nom, new Map());
    return tables.get(nom);
  }

  return {
    openDatabaseAsync: async () => ({
      execAsync: async () => {},
      runAsync: async (sql, params = []) => {
        if (/INSERT INTO preferences/i.test(sql)) {
          table('preferences').set(params[0], params[1]);
        }
        return { changes: 1 };
      },
      getAllAsync: async (sql) => {
        if (/FROM preferences/i.test(sql)) {
          return [...table('preferences')].map(([cle, valeur]) => ({ cle, valeur }));
        }
        return [];
      },
      getFirstAsync: async () => null,
    }),
  };
});
