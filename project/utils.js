export function generateRandomNumber(upperLimit, lowerLimit=0) {
    return Math.floor(Math.random() * (upperLimit - lowerLimit + 1) + lowerLimit);
}

export function hexToRgbA(hex) {
    let ret;
    //either we receive a html/css color or a RGB vector
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        ret=[
            parseInt(hex.substring(1,3),16).toPrecision()/255.0,
            parseInt(hex.substring(3,5),16).toPrecision()/255.0,
            parseInt(hex.substring(5,7),16).toPrecision()/255.0,
            1.0
        ];
    }
    else
        ret=[
            hex[0].toPrecision()/255.0,
            hex[1].toPrecision()/255.0,
            hex[2].toPrecision()/255.0,
            1.0
        ];
    return ret;
}