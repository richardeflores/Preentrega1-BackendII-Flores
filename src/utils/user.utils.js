import { faker } from "@faker-js/faker";
faker.locale = "es";

export const generateUser = () => {
    return {
        first_name: faker.person.firstName(),  
        last_name: faker.person.lastName(),    
        email: faker.internet.email(),         
        age: faker.number.int({ min: 18, max: 80 }), 
        password: faker.internet.password(8),  
        role: faker.helpers.arrayElement(["admin", "user"]), 
        image: faker.image.avatar(),
    };
};