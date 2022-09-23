import App from "../models/users.js";

// This method searches in USER colection

export const search = (params = {}) => {
    const promise = App.User.find(params).exec();
    return promise;
};

// This method I have used to search in visit collection

export const searchVisit = (params = {}) => {
    const promise = App.Visit.find(params).exec();
    return promise;
};

//This is used to create new USER JSON object

export const create = (user) => {
    const newUser = new App.User(user);
    return newUser.save();
}

// This is used to create new visit json object

export const createVisit = (visit) => {
    const newVisit = new App.Visit(visit);
    return newVisit.save();
}


// This method is used to fetch users based on their email ID.

export const getByEmail = (user) => {
    const email = user.email;
    const promise = App.User.findOne({ email: email }).exec();
    return promise;
}

// This is used to get a paricular User using ID

export const get = (id) => {
    const promise = App.User.findById(id).exec();
    return promise;
}

// This is used to get a paricular Visit using ID

export const getVisit = (id) => {
    const promise = App.Visit.findById(id).exec();
    return promise;
}

// This is used to update an existing User

export const update = (user) => {
    console.log("SERVICE");
    user._id = user.id;
    user.lastModifiedDate = Date.now();

    const promise = App.User.findByIdAndUpdate(user.id, user, { new: true }).exec();
    return promise;
}

// This is used to update an existing Visit

export const updateVisit = (visit) => {
    visit._id = visit.id;
    visit.lastModifiedDate = Date.now();

    const promise = App.Visit.findByIdAndUpdate(visit.id, visit, { new: true }).exec();
    return promise;
}

// This is to delete a User by ID

export const remove = (id) => {
    const promise = App.User.findByIdAndRemove(id).exec();
}


// This method check if user is authorise or not.

export const authUser = (user) => {

    const email = user.email
    const password = user.password;

    const promise = App.User.findOne({ email: email }).exec();

    return promise;

}
