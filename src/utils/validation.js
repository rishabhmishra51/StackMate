const validator =require("validator")
const validateSignUpData = (req)=>{
     const{firstName,lastName,emailId,password}=req.body

     if(!firstName || !lastName){
          throw new Error("Name is Not Valid")
     }
     else if(!validator.isEmail(emailId)){
          throw new Error("Email is not valid")
     }
     else if(!validator.isStrongPassword(password)){
          throw new Error("Enter a strong password!")
     }
};
const validateEditProfileData = (req) => {
  const allowedEditField = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "about",
    "skills"
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedEditField.includes(field);
  });

  return isEditAllowed;
};
module.exports={validateSignUpData,validateEditProfileData};