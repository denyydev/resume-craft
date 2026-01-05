-- Миграция данных: удаление fullName из JSON
-- Поскольку это этап разработки и все старые данные удалены,
-- просто удаляем fullName из JSON, если он случайно остался
-- Новые поля (lastName, firstName, patronymic) уже есть в типах и используются в коде

-- Удаляем fullName из всех записей (на случай если где-то остался)
UPDATE "Resume"
SET data = data - 'fullName'
WHERE data ? 'fullName';
