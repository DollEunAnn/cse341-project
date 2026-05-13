const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb
    .getDatabase()
    .db('project')
    .collection('contacts')
    .find();

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const getById = async (req, res) => {

    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
    .getDatabase()
    .db('project')
    .collection('contacts')
    .find(contactId);

    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

const createUser = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb
    .getDatabase()
    .db('project')
    .collection('contacts')
    .insertOne(contact); 

    if(response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the contact.');
    }
}

const updateUser = async (req, res) => {

    const contactId = new ObjectId(req.params.id);

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    
    const response = await mongodb
    .getDatabase()
    .db('project')
    .collection('contacts')
    .replaceOne({ _id: contactId }, contact);

    if(response.modificationCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }

    // if (response.modifiedCount > 0) {
    //     res.status(204).send();
    // } else {
    //     res.status(404).json('No contact was updated.');
    // }
}

const deleteUser = async (req, res) => {

    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
    .getDatabase().db('project')
    .collection('contacts')
    .deleteOne({ _id:contactId });

    if(response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(404).json(response.error || 'Some error occurred while deleting the contact.');
    }
}


module.exports = { getAll, getById, createUser, updateUser, deleteUser };