/**
 * Created by zhou on 17/10/19.
 */



const checkIf = function (b,formData,value,data) {
    let is = true;
    if(b === false){
        is = false;
    }else if(typeof b === 'string'){
        const fn = new Function('$formData','$value','$data', 'return '+b);
        try{
            is = fn(formData,value);
        }catch (e){}
    }
    return is
};

export {checkIf}



