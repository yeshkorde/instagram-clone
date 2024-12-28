import Joi from "joi";


const userValidation = async(data)=>{
try {

    const userSchema = Joi.object({
username: Joi.string()
.min(3)
 .max(30)
 .regex(/^[a-zA-Z0-9]+$/, 'alphanumeric')
 .required()
 .messages({
 'string.min': 'Username must be at least 3 characters long',
 'string.max': 'Username must be at most 30 characters long',
 'string.pattern.name': 'Username can only contain alphanumeric characters',
 'string.empty': 'Username is required',
 }),
 
 email: Joi.string()
 .email({ tlds: { allow: false } }) 
 .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'valid email')
 .required()
 .messages({
 'string.email': 'Please provide a valid email address',
 'string.pattern.name': 'Email must follow the format: name@domain.com and contain only alphanumeric characters, dots, dashes, and valid TLDs',
 'string.empty': 'Email is required',
 }),
 password: Joi.string()
 .min(8)
 .max(30)
 .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])'), 'strong password')
 .required()
 .messages({
 'string.min': 'Password must be at least 8 characters long',
 'string.max': 'Password cannot exceed 30 characters',
 'string.pattern.name': 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
 'string.empty': 'Password is required',
 }),
 })
 const result = userSchema.validate(data).error;
 return result;
 } catch (error) {
 console.log('some thing want wrong to validating user...');
 }
}
export default userValidation ;


