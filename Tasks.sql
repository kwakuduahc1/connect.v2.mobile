-- Script Date: 20-Apr-2018 03:25  - ErikEJ.SqlCeScripting version 3.5.2.75
SELECT 1;
PRAGMA foreign_keys=ON;
BEGIN TRANSACTION;
CREATE TABLE [Programs] (
  [ProgramsID] INTEGER  NOT NULL
, [ProgramName] nvarchar(50)  NOT NULL
, [ProgramCode] nvarchar(15)  NOT NULL
, [Concurrency] rowversion NOT NULL
, CONSTRAINT [PK_dbo.Programs] PRIMARY KEY ([ProgramsID])
);
CREATE TABLE [Tasks] (
  [TasksID] INTEGER  NOT NULL
, [Task] nvarchar(250)  NOT NULL
, [ProgramsID] int  NOT NULL
, [DateAdded] datetime NOT NULL
, [HasRequirements] bit NOT NULL
, [Concurrency] rowversion NOT NULL
, CONSTRAINT [PK_dbo.Tasks] PRIMARY KEY ([TasksID])
, FOREIGN KEY ([ProgramsID]) REFERENCES [Programs] ([ProgramsID]) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE [Steps] (
  [StepsID] INTEGER  NOT NULL
, [Step] nvarchar(250)  NOT NULL
, [TasksID] int  NOT NULL
, [DateAdded] datetime NOT NULL
, [Concurrency] rowversion NOT NULL
, CONSTRAINT [PK_dbo.Steps] PRIMARY KEY ([StepsID])
, FOREIGN KEY ([TasksID]) REFERENCES [Tasks] ([TasksID]) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX [IX_ProgramCode] ON [Programs] ([ProgramCode] ASC);
CREATE UNIQUE INDEX [IX_ProgramName] ON [Programs] ([ProgramName] ASC);
CREATE INDEX [IX_ProgramsID] ON [Tasks] ([ProgramsID] ASC);
CREATE INDEX [IX_TasksID] ON [Steps] ([TasksID] ASC);
COMMIT;

