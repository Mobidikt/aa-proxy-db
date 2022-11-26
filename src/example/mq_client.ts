
// import { db } from "../System/DBConnect";
import { v4 as uuid4 } from 'uuid';
import { mRandomInteger } from "../Helper/NumberH";



import { mWait } from "../Helper/WaitH";
import { DbClientSys } from "../System/DbClientSys";

// CORE API
const mqClientSys = new DbClientSys({
    baseURL: 'ws://127.0.0.1:8080',
    nameApp: 'test_client'
})

async function run(){

    // mqClientSys.connect('test', null);

    const aMsg = []
    for (let i = 0; i < 3; i++) {
        const sMsg = '['+i+'] СообщениЕ ['+i+']';

        aMsg.push({text:sMsg});
        if(i % 1000 == 0){
            process.stdout.write('.');
        }
        
    }

    await mWait(2000);

    const row = await mqClientSys.fillID('test', aMsg);

    console.log('[run]:',row);

    const aMsg1 = []
    for (let i = 0; i < 2; i++) {
        const sMsg = '['+i+'] Е ['+i+']';

        aMsg1.push({text:sMsg});
        if(i % 1000 == 0){
            process.stdout.write('.');
        }
        
    }

    const row1 = await mqClientSys.fillID('test', aMsg1);

    console.log('[run1]:',row1);

    await mWait(5000);





    console.log('=========================');
    console.log('END');
    console.log('=========================');
    process.exit(0)
}
// for (let i = 0; i < 20; i++) {
run().catch((error) => {
    console.log('>>>ERROR>>>',error);
    process.exit(1)
});

// }

