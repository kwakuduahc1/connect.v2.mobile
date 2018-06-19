import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ITasks } from '../../model/ITasks';
import { ISteps } from '../../model/ISteps';
/*
Generated class for the SqlProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class SqlProvider {
  connect(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'connect.db',
      location: 'default',
    })
  }
  constructor(private sqlite: SQLite) {
    this.connect().then((db: SQLiteObject) => {
      db.executeSql(`
      CREATE TABLE IF NOT EXISTS [Programs] (
                [ProgramsID] INTEGER  NOT NULL
                , [ProgramName] nvarchar(50)  NOT NULL
                , [ProgramCode] nvarchar(15)  NOT NULL
                , [Concurrency] rowversion NOT NULL
                , CONSTRAINT [PK_dbo.Programs] PRIMARY KEY ([ProgramsID])
            )`, []);
      db.executeSql(`CREATE TABLE IF NOT EXISTS [Tasks] (
  [TasksID] INTEGER  NOT NULL
, [Task] nvarchar(250)  NOT NULL
, [ProgramsID] int  NOT NULL
, [DateAdded] datetime NOT NULL
, [HasRequirements] bit NOT NULL
, [Concurrency] rowversion NOT NULL
, CONSTRAINT [PK_dbo.Tasks] PRIMARY KEY ([TasksID])
, FOREIGN KEY ([ProgramsID]) REFERENCES [Programs] ([ProgramsID]) ON DELETE CASCADE ON UPDATE CASCADE
)`,
        []);
      db.executeSql(`
      CREATE TABLE IF NOT EXISTS [Steps] (
  [StepsID] INTEGER  NOT NULL
, [Step] nvarchar(250)  NOT NULL
, [TasksID] int  NOT NULL
, [DateAdded] datetime NOT NULL
, [Concurrency] rowversion NOT NULL
, CONSTRAINT [PK_dbo.Steps] PRIMARY KEY ([StepsID])
, FOREIGN KEY ([TasksID]) REFERENCES [Tasks] ([TasksID]) ON DELETE CASCADE ON UPDATE CASCADE
)`, []);
      db.executeSql(`CREATE UNIQUE INDEX IF NOT EXISTS [IX_ProgramCode] ON [Programs] ([ProgramCode] ASC);
                    CREATE UNIQUE INDEX IF NOT EXISTS [IX_ProgramName] ON [Programs] ([ProgramName] ASC);
                    CREATE INDEX IF NOT EXISTS [IX_ProgramsID] ON [Tasks] ([ProgramsID] ASC);
                    CREATE INDEX IF NOT EXISTS [IX_TasksID] ON [Steps] ([TasksID] ASC);`, []);
    }, (err => alert('Tables creation failed')))
  }


  getTasks(): ITasks[] {
    let tasks: ITasks[] = [];
    this.connect().then(db => {
      db.executeSql('SELECT t.tasksID,t.tasks,t.hasRequirements,p.programCode FROM Tasks t inner join Programs p on p.programsID = t.programsID ORDER BY P.ProgramsID', [])
        .then(res => {
          for (var i = 0; i < res.rows.length; i++) {
            let data = res.rows.item(i) as ITasks;
            tasks.push(data);
          }
        }, err => {
          console.log(  err);
        });
    });
    return tasks;
  }

  task(id: number): ITasks {
    let task: ITasks;
    this.connect().then(db => {
      db.executeSql('SELECT tasksid, tasks FROM Tasks WHERE tasksID=?', [id])
        .then(res => {
          task = res.rows.item(0) as ITasks;
        });
    });
    return task;
  }

  getSteps(id: number): ISteps[] {
    let steps: ISteps[] = [];
    this.connect().then(db => {
      db.executeSql('SELECT stepsID,step FROM Steps WHERE tasksID=?', [id])
        .then(res => {
          for (var i = 0; i < res.rows.length; i++) {
            let data = res.rows.item(i) as ISteps;
            steps.push(data);
          }
        });
    });
    return steps;
  }
}
