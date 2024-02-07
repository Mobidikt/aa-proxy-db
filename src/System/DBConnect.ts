import  knex, { Knex } from 'knex';
import { common, aCfDb, cfDbMaster, cfDbProxy } from "../Config/MainConfig";

export function mReplicationEnable(){
    let bEnable = false;
    if(common.client == 'mysql' || common.client == undefined){
        bEnable = true;
    }
    return bEnable
}

export const dbProxy = knex(cfDbProxy);

export const dbMaster = knex(cfDbMaster);

export const adb:Knex[] = [];
export const adbError:Knex[] = [];
export const adbWait:Knex[] = [];
export const ixDbWaitTime:Record<string, number> = {};


export const gixDb:Record<string, Knex> = {};
export const gixaDbByIp:Record<string, Knex[]> = {};


for (const [kCfDb, vCfDb] of Object.entries(aCfDb)) {
    
    // const vCfDb = aCfDb[keyDb];
    const vDb = knex(vCfDb);
    adb.push(vDb);

    const sKeyDb = [vCfDb.connection.host, vCfDb.connection.port, vCfDb.connection.database].join(':')
    gixDb[sKeyDb] = vDb;

    if(!gixaDbByIp[vCfDb.connection.host]){
        gixaDbByIp[vCfDb.connection.host] = [];
    }
    gixaDbByIp[vCfDb.connection.host].push(vDb)
    
}