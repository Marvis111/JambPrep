const ValidateForm = body =>{
    const formState = {error:[],errNo:0,success:false};
    for(let FieldName in body){
        if(FieldName === 'Fullnames'){
            formState.error.push({
               FieldName,
                err: body[FieldName] ===''?"Full names are required." :""
            })
        }
        if(FieldName === 'Email'){
          formState.error.push({
              FieldName,
              err: body[FieldName] ===''?"Email is required." :""
          })
      };
      if(FieldName === 'Password'){
          formState.error.push({
              FieldName,
              err: body[FieldName] ===''? "Password is required." :""
         })
      }
    }
  //
  if(body['CPassword'] !== undefined){
    if(body['Password'] !== body['CPassword']){
        formState.error.push({
            FieldName:'Password',
            err:"Password Mismatched."
       })
    }
  }

    formState.error.forEach(input =>{
        if(input.err !== ""){
              formState.errNo += 1;
        }
    })
    return formState;
  
  }

  module.exports = ValidateForm;