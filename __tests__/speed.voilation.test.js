const voilation  = require('../controller/speed_voilation');


test('check speed limit',()=>{
    let x = voilation.speed_voilation_protocol(200);
    expect(x).toBe(false);
})