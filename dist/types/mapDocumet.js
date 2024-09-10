"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserDocumentToUser = void 0;
const mapUserDocumentToUser = (userDoc) => {
    const userObj = userDoc.toObject();
    return {
        // id: userObj._id.toString(),
        name: userObj.name,
        email: userObj.email,
        password: userObj.password,
        role: userObj.role,
        avatar: {
            public_id: userObj.avatar.public_id,
            url: userObj.avatar.url,
        },
        position: userObj.position,
        rating: userObj.rating,
    };
};
exports.mapUserDocumentToUser = mapUserDocumentToUser;
