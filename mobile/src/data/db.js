import * as SQLite from 'expo-sqlite';

let dbInstance = null;

async function getDb() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('racines.db');
    await dbInstance.execAsync(`
      CREATE TABLE IF NOT EXISTS progression (
        module_id TEXT PRIMARY KEY NOT NULL,
        module_termine INTEGER NOT NULL DEFAULT 0,
        quiz_score INTEGER,
        quiz_total INTEGER,
        bilan_score INTEGER,
        bilan_total INTEGER,
        bilan_termine INTEGER NOT NULL DEFAULT 0,
        derniere_maj TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS sous_module_progression (
        module_id TEXT NOT NULL,
        sous_module_index INTEGER NOT NULL,
        score INTEGER NOT NULL,
        total INTEGER NOT NULL,
        termine INTEGER NOT NULL DEFAULT 1,
        derniere_maj TEXT NOT NULL,
        PRIMARY KEY (module_id, sous_module_index)
      );
    `);
    // Migration douce pour les bases créées avant l'ajout du bilan.
    try {
      await dbInstance.execAsync('ALTER TABLE progression ADD COLUMN bilan_score INTEGER;');
    } catch (e) {}
    try {
      await dbInstance.execAsync('ALTER TABLE progression ADD COLUMN bilan_total INTEGER;');
    } catch (e) {}
    try {
      await dbInstance.execAsync('ALTER TABLE progression ADD COLUMN bilan_termine INTEGER NOT NULL DEFAULT 0;');
    } catch (e) {}
  }
  return dbInstance;
}

export async function marquerModuleTermine(moduleId) {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO progression (module_id, module_termine, derniere_maj)
     VALUES (?, 1, ?)
     ON CONFLICT(module_id) DO UPDATE SET module_termine = 1, derniere_maj = excluded.derniere_maj;`,
    [moduleId, new Date().toISOString()]
  );
}

export async function enregistrerScoreQuiz(moduleId, score, total) {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO progression (module_id, module_termine, quiz_score, quiz_total, derniere_maj)
     VALUES (?, 1, ?, ?, ?)
     ON CONFLICT(module_id) DO UPDATE SET
       quiz_score = excluded.quiz_score,
       quiz_total = excluded.quiz_total,
       derniere_maj = excluded.derniere_maj;`,
    [moduleId, score, total, new Date().toISOString()]
  );
}

// --- Sous-modules (4 par module, 5 questions chacun) ----------------------

export async function marquerSousModuleTermine(moduleId, sousModuleIndex, score, total) {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO sous_module_progression (module_id, sous_module_index, score, total, termine, derniere_maj)
     VALUES (?, ?, ?, ?, 1, ?)
     ON CONFLICT(module_id, sous_module_index) DO UPDATE SET
       score = excluded.score,
       total = excluded.total,
       termine = 1,
       derniere_maj = excluded.derniere_maj;`,
    [moduleId, sousModuleIndex, score, total, new Date().toISOString()]
  );
}

export async function getProgressionSousModules(moduleId) {
  const db = await getDb();
  const rows = await db.getAllAsync(
    'SELECT * FROM sous_module_progression WHERE module_id = ? ORDER BY sous_module_index ASC;',
    [moduleId]
  );
  const map = {};
  for (const row of rows) {
    map[row.sous_module_index] = row;
  }
  return map;
}

// --- Bilan de module (20 questions, une fois les 4 sous-modules terminés) -

export async function enregistrerScoreBilan(moduleId, score, total) {
  const db = await getDb();
  await db.runAsync(
    `INSERT INTO progression (module_id, module_termine, bilan_score, bilan_total, bilan_termine, derniere_maj)
     VALUES (?, 1, ?, ?, 1, ?)
     ON CONFLICT(module_id) DO UPDATE SET
       module_termine = 1,
       bilan_score = excluded.bilan_score,
       bilan_total = excluded.bilan_total,
       bilan_termine = 1,
       derniere_maj = excluded.derniere_maj;`,
    [moduleId, score, total, new Date().toISOString()]
  );
}

export async function getToutesLesProgressions() {
  const db = await getDb();
  const rows = await db.getAllAsync('SELECT * FROM progression;');
  const map = {};
  for (const row of rows) {
    map[row.module_id] = row;
  }
  return map;
}

export async function getProgressionModule(moduleId) {
  const db = await getDb();
  return db.getFirstAsync('SELECT * FROM progression WHERE module_id = ?;', [moduleId]);
}
