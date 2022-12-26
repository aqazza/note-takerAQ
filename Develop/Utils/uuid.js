// Generate truly cryptographically strong and secure random numeric keys 
module.exports =() => 
Math.floor((1+Math.random())*0x10000)
    .toString(16)
    .substring(1);