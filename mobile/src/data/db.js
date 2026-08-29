import * as SQLite from 'expo-sqlite';

let dbInstance = null;

async function initialiserBase(db) {
  await db.execAsync('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

  const version = await db.getFirstAsync('PRAGMA user_version;');
  if ((version?.user_version ?? 0) < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS progression (
        module_id TEXT PRIMARY KEY NOT NULL,
        module_termine INTEGER NOT NULL DEFAULT 0,
        quiz_score INTEGER,
        quiz_total INTEGER,
        derniere_maj TEXT NOT NULL
      );
      PRAGMA user_version = 1;
    `);
  }
}

async function getDb() {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('racines.db');
    await initialiserBase(dbInstance);
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
