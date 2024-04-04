import pgPromise, { IDatabase, IMain, IInitOptions } from 'pg-promise';
import dbConfig from './db-config.js';
import QuestionsRepository from "../repos/questions.js"
import UnitsRepository from "../repos/units.js"
import TopicsRepository from "../repos/topics.js"
import UsersRepository from '../repos/users.js';
import UserRelationshipsRepository from '../repos/user_relationships.js';
import GroupsRepository from '../repos/groups.js';
import RankingsRepository from '../repos/rankings.js';

interface IExtendedProtocol extends IDatabase<any, any> {
    users: UsersRepository;
    units: UnitsRepository;
    topics: TopicsRepository;
    questions: QuestionsRepository;
    user_relationships: UserRelationshipsRepository;
    groups: GroupsRepository;
    rankings: RankingsRepository;
}

const initOptions: IInitOptions<IExtendedProtocol> = {
    query(e) {
        console.log('QUERY:', e.query);
    },
    extend(obj: IExtendedProtocol, dc: any) {
        obj.users = new UsersRepository(obj, pgp);
        obj.units = new UnitsRepository(obj, pgp);
        obj.topics = new TopicsRepository(obj, pgp);
        obj.questions = new QuestionsRepository(obj, pgp);
        obj.user_relationships = new UserRelationshipsRepository(obj, pgp);
        obj.groups = new GroupsRepository(obj, pgp);
        obj.rankings = new RankingsRepository(obj, pgp);
    }
};

const pgp: IMain = pgPromise(initOptions);

const db: IExtendedProtocol = pgp(dbConfig);  // db - singleton instance of the database connection

export {pgp, db};
