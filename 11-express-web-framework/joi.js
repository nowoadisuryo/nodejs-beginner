import Joi from "joi";

const arrayString = ['hello', 'world'];
const arrayObjects = [{ example: 'example1', example2: 'example2' }]

const userInput = {
    personalInfo: {
        streetAdress: '123456789',
        city: 'Jakarta',
        state: 'DI'
    },
    preferences: arrayObjects
}

const personalInfoSchema = Joi.object({
    streetAdress: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    state: Joi.string().trim().length(2).required(),
})

const preferencesSchema = Joi.array().items(Joi.object({
    example: Joi.string().required(),
    example2: Joi.string().required()
}));

const schema = Joi.object({
    personalInfo: personalInfoSchema,
    preferences: preferencesSchema
})

const { error, value } = schema.validate(userInput);

if (error) {
    console.log(error);
} else {
    console.log(value);
}