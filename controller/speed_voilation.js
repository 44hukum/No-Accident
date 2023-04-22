require('dotenv').config();

let speed_voilation_protocol = function(speed){
    if(speed > process.env.SPEED_LIMIT){
        return true
    }else{
        return false
    }
}


module.exports = {
    speed_voilation_protocol
}