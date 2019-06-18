import {createConnection} from "typeorm";
import {EntitySchema} from "typeorm";

export const PersonEntity = new EntitySchema({
    name: "person",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        name: {
            type: String
        }
    }
});

const options = {
    type: 'sqljs',
    entities: [PersonEntity],
    database: new Uint8Array([]),
    logging: ['query', 'schema'],
    synchronize: true,
};

createConnection(options).then(async connection => {


    const personRepository = connection.getRepository(PersonEntity);
    const person = personRepository.create({
        name: 'Franz',
    });

    personRepository
        .save(person)
        .then(person => console.log("Person has been saved: ", person))
        .catch(error => console.log("Cannot save. Error: ", error));

}, error => console.log("Cannot connect: ", error));
